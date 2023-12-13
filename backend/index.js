const express = require("express")
const cors = require('cors');
const app = express();
const connection = require('./database');
const generatePasswd = require('generate-password');
const crypto = require('crypto');
const { log } = require("console");
app.use(express.json());
app.use(cors());

const port = 3000;

const generatePassword = (charLen) => {
    return generatePasswd.generate({
        length: charLen,
        numbers: true
    })
}

const hashPassword = (algorithm, base, passwd) => {
    return crypto.createHash(algorithm).update(passwd).digest(base);
}


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
    const query = "SELECT CONCAT(firstname ,' ', lastname) as name , DATE_FORMAT(birthdate, '%d/%m/%Y') AS birthdate FROM authors";
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
    const query = "SELECT CONCAT(firstname ,' ',lastname) AS authorName, title , subtitle , content , illustrationLink , DATE_FORMAT(publicationDate , '%d/%m/%Y') AS publicationDate FROM articles JOIN authors ON authors.authorId = articles.authorId;"
    connection.query(query, (err, rows) => {
        if (err) throw err;
        res.json(rows);
    })
    console.log('Database closed');
    connection.end;
})

app.post('/doesuserexist', (req, res) => {
    const emp = req.body;
    connection.query('SELECT * FROM accounts WHERE email = ? AND password = ?;', [emp.email, hashPassword('sha256', 'base64', emp.password)], (err, result) => {
        if (err) {
            res.json({ err });
            return;
        }
        if (result.length > 0) {
            res.json({ exist: true });
            return;
        }
        return res.json({ exist: false });
    });
})

app.post('/signup', (req, res) => {
    const emp = req.body;
    connection.query('SELECT * FROM accounts WHERE email = ?', [emp.email], (err, result) => {
        if (err) {
            res.json({ err });
            return;
        }
        if (result.length > 0) {
            res.json({ exist: true });
            return;
        } else {
            connection.query('INSERT INTO accounts (email , password) VALUES (? , ?);', [emp.email, hashPassword('sha256', 'base64', emp.password)], (err, result) => {
                if (err) {
                    res.json({ err });
                    return;
                }
                res.json({ status: true })
            })
        }
    })
})