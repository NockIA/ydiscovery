const connection = require('../database/connection');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';

exports.articles = async (req, res) => {
  const query =
    "SELECT articleId, authorName, title , subtitle , content , illustrationLink , DATE_FORMAT(publicationDate , '%d/%m/%Y') AS publicationDate FROM articles JOIN authors ON authors.authorId = articles.authorId;";
  connection.query(query, (err, rows) => {
    if (err) throw err;
    res.json(rows);
  });
};

exports.oneArticle = async (req, res) => {
  const articleId = req.params.articleId;
  const token = req.header("Authorization");

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), SECRET_KEY);
    const userEmailFromToken = decoded.email;

    const articleQuery = `
        SELECT 
          articles.*,
          authors.authorName,
          accounts.email as authorEmail
        FROM 
          articles
        INNER JOIN 
          authors ON articles.authorId = authors.authorId
        INNER JOIN 
          accounts ON authors.authorId = accounts.authorId
        WHERE 
          articles.articleId = ?;
      `;

    const [articleResult] = await connection.promise().query(articleQuery, [articleId]);

    if (articleResult.length === 0) {
      return res.status(404).json({ error: "Article non trouvé" });
    }

    const article = articleResult[0];

    article.canEdit = userEmailFromToken === article.authorEmail;

    res.status(200).json({ article });
  } catch (error) {
    console.error("Erreur lors de la vérification du JWT:", error);
    res.status(401).json({ error: "JWT invalide" });
  }
};



exports.createArticle = async (req, res) => {
  const { title, subtitle, illustrationLink, content } = req.body;
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ error: "Token manquant dans l'en-tête d'autorisation" });
  }
  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), SECRET_KEY);
    const email = decoded.email;
    const authorQuery = "SELECT authorId FROM accounts WHERE email = ?";
    const authorValues = [email];

    connection.query(
      authorQuery,
      authorValues,
      async (authorErr, authorResult) => {
        if (authorErr) {
          console.error("Error retrieving author:", authorErr);
          res.status(500).send("Error creating article");
        } else {
          if (authorResult.length === 0) {
            return res.status(404).json({ error: "Utilisateur non trouvé" });
          }

          const authorId = authorResult[0].authorId;
          const formattedPublicationDate = new Date()
            .toISOString()
            .slice(0, 19)
            .replace("T", " ");
          const articleQuery = `
            INSERT INTO articles (authorId, title, subtitle, publicationDate, illustrationLink, content)
            VALUES (?, ?, ?, ?, ?, ?)
          `;
          const articleValues = [
            authorId,
            title,
            subtitle,
            formattedPublicationDate,
            illustrationLink,
            content,
          ];

          connection.query(
            articleQuery,
            articleValues,
            (articleErr, articleResult) => {
              if (articleErr) {
                console.error("Error creating article:", articleErr);
                res.status(500).send("Error creating article");
              } else {
                const articleId = articleResult.insertId;
                console.log("Article created successfully");
                res.status(200).json({ articleId });
              }
            }
          );
        }
      }
    );
  } catch (error) {
    console.error("Erreur lors de la vérification du JWT:", error);
    res.status(401).json({ error: "JWT invalide" });
  }
};

exports.updateArticle = async (req, res) => {
  const articleId = req.params.articleId;
  const { title, subtitle, publicationDate, illustrationLink, content } =
    req.body;
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ error: "Token manquant dans l'en-tête d'autorisation" });
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), SECRET_KEY);
    const userEmailFromToken = decoded.email;
    const authorQuery = "SELECT authorId FROM accounts WHERE email = ?";
    const authorValues = [userEmailFromToken];

    connection.query(
      authorQuery,
      authorValues,
      async (authorErr, authorResult) => {
        if (authorErr) {
          console.error("Error retrieving author:", authorErr);
          res.status(500).send("Error updating article");
        } else {
          if (authorResult.length === 0) {
            return res.status(404).json({ error: "Utilisateur non trouvé" });
          }

          const authorIdFromToken = authorResult[0].authorId;
          const checkOwnershipQuery =
            "SELECT authorId FROM articles WHERE articleId = ?";
          const checkOwnershipValues = [articleId];

          connection.query(
            checkOwnershipQuery,
            checkOwnershipValues,
            (ownershipErr, ownershipResult) => {
              if (ownershipErr) {
                console.error("Error checking ownership:", ownershipErr);
                res.status(500).send("Error updating article");
              } else {
                if (
                  ownershipResult.length === 0 ||
                  ownershipResult[0].authorId !== authorIdFromToken
                ) {
                  return res.status(403).json({ error: "Permission refusée" });
                }
                const updateQuery = `
                UPDATE articles
                SET title = ?, subtitle = ?, publicationDate = ?, illustrationLink = ?, content = ?
                WHERE articleId = ? AND authorId = ?
              `;
                const updateValues = [
                  title,
                  subtitle,
                  publicationDate,
                  illustrationLink,
                  content,
                  articleId,
                  authorIdFromToken,
                ];

                connection.query(
                  updateQuery,
                  updateValues,
                  (updateErr, updateResult) => {
                    if (updateErr) {
                      console.error("Error updating article:", updateErr);
                      res.status(500).send("Error updating article");
                    } else {
                      console.log("Article updated successfully");
                      res
                        .status(200)
                        .json({ message: "Article updated successfully" });
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
  } catch (error) {
    console.error("Erreur lors de la vérification du JWT:", error);
    res.status(401).json({ error: "JWT invalide" });
  }
};

exports.deleteArticle = async (req, res) => {
  const articleId = req.params.articleId;
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ error: "Token manquant dans l'en-tête d'autorisation" });
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), SECRET_KEY);
    const userEmailFromToken = decoded.email;
    const authorQuery = "SELECT authorId FROM accounts WHERE email = ?";
    const authorValues = [userEmailFromToken];

    connection.query(
      authorQuery,
      authorValues,
      async (authorErr, authorResult) => {
        if (authorErr) {
          console.error("Error retrieving author:", authorErr);
          res.status(500).send("Error deleting article");
        } else {
          if (authorResult.length === 0) {
            return res.status(404).json({ error: "Utilisateur non trouvé" });
          }

          const authorIdFromToken = authorResult[0].authorId;
          const checkOwnershipQuery =
            "SELECT authorId FROM articles WHERE articleId = ?";
          const checkOwnershipValues = [articleId];

          connection.query(
            checkOwnershipQuery,
            checkOwnershipValues,
            (ownershipErr, ownershipResult) => {
              if (ownershipErr) {
                console.error("Error checking ownership:", ownershipErr);
                res.status(500).send("Error deleting article");
              } else {
                if (
                  ownershipResult.length === 0 ||
                  ownershipResult[0].authorId !== authorIdFromToken
                ) {
                  return res.status(403).json({ error: "Permission refusée" });
                }

                const deleteQuery = "DELETE FROM articles WHERE articleId = ?";
                const deleteValues = [articleId];

                connection.query(
                  deleteQuery,
                  deleteValues,
                  (deleteErr, deleteResult) => {
                    if (deleteErr) {
                      console.error("Error deleting article:", deleteErr);
                      res.status(500).send("Error deleting article");
                    } else {
                      console.log("Article deleted successfully");
                      res
                        .status(200)
                        .json({ message: "Article deleted successfully" });
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
  } catch (error) {
    console.error("Erreur lors de la vérification du JWT:", error);
    res.status(401).json({ error: "JWT invalide" });
  }
};

