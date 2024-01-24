const connection = require("../database/connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const SECRET_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";

exports.register = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const authorName = `${firstname} ${lastname}`;
  const authorQuery = "INSERT INTO authors (authorName) VALUES (?)";
  const authorValues = [authorName];

  connection.query(authorQuery, authorValues, (authorErr, authorResult) => {
    if (authorErr) {
      console.error("Error creating author:", authorErr);
      res.status(500).send("Error creating account");
    } else {
      const authorId = authorResult.insertId;
      console.log(authorId);
      const accountQuery =
        "INSERT INTO accounts (authorId, firstname, lastname, email, password, isAdmin) VALUES (?, ?, ?, ?, ?, ?)";
      const accountValues = [
        authorId,
        firstname,
        lastname,
        email,
        hashedPassword,
        false,
      ];
      connection.query(accountQuery, accountValues, (accountErr) => {
        if (accountErr) {
          console.error("Error creating account:", accountErr);
          res.status(500).send("Error creating account");
        } else {
          const token = jwt.sign({ email }, SECRET_KEY, {
            expiresIn: "1h",
          });

          console.log("Account created successfully");
          res.status(200).json({ authorId, token });
        }
      });
    }
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const userQuery = "SELECT * FROM accounts WHERE email = ?";
  const userValues = [email];
  
  try {
    const [userResult] = await connection
      .promise()
      .query(userQuery, userValues);

    if (userResult.length === 0) {
      return res.status(401).json({ error: "User doesn't exist" });
    }
    const user = userResult[0];
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "User doesn't exist" });
    }
    const token = jwt.sign({ email: user.email }, SECRET_KEY, {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (error) {
    console.error("Error while trying to connect", error);
    res.status(500).json({ error: "Error while trying to connect" });
  }
};
