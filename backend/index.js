const express = require("express")
const cors = require('cors');
const app = express();
const connection = require('./database')
const bcrypt = require("bcrypt");
app.use(express.json());
app.use(cors());

const port = 3000;
const saltRounds = 10;

app.listen(port, () => {
    console.log(`Server started on port ${port} at http://localhost:${port}/`);
})

app.get('/', (req, res) => {
    res.send('Hey there')
})

app.get('/authors', (req, res) => {
    connection.connect((err) => {
        if (err) {
            console.error("Connexion error : " + err.stack);
            return;
        }
        console.log("Connected to database");
    })
    const query = "SELECT authorName FROM authors";
    connection.query(query, (err, rows) => {
        if (err) throw err;
        res.json(rows);
    })
    connection.end;
    console.log('Database closed');
})

app.get('/accounts', (req, res) => {
    connection.connect((err) => {
        if (err) {
            console.error("Connexion error : " + err.stack);
            return;
        }
        console.log("Connected to database");
    })
    const query = "SELECT firstname , lastname , password , email ,isAdmin FROM accounts";
    connection.query(query, (err, rows) => {
        if (err) throw err;
        res.json(rows);
    })
    connection.end;
    console.log('Database closed');
})

app.get('/articles', (req, res) => {
    connection.connect((err) => {
        if (err) {
            console.error("Connexion error : " + err.stack);
            return;
        }
        console.log("Connected to database");
    })
    const query = "SELECT authorName, title , subtitle , content , illustrationLink , DATE_FORMAT(publicationDate , '%d/%m/%Y') AS publicationDate FROM articles JOIN authors ON authors.authorId = articles.authorId;"
    connection.query(query, (err, rows) => {
        if (err) throw err;
        res.json(rows);
    })
    console.log('Database closed');
    connection.end;
})

app.post("/createAccount", async (req, res) => {
    const { firstname, lastname, email, password, isAdmin } = req.body;
  
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
  
        const accountQuery =
          "INSERT INTO accounts (authorId, firstname, lastname, email, password, isAdmin) VALUES (?, ?, ?, ?, ?, ?)";
        const accountValues = [authorId, firstname, lastname, email, hashedPassword, isAdmin];
  
        connection.query(accountQuery, accountValues, (accountErr) => {
          if (accountErr) {
            console.error("Error creating account:", accountErr);
            res.status(500).send("Error creating account");
          } else {
            console.log("Account created successfully");
            // Return the created authorId to associate with the account
            res.status(200).json({ authorId });
          }
        });
      }
    });
  });