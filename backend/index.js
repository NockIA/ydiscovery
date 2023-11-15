import express from "express";
import mysql from 'mysql';
import cors from "cors";

const app = express();

app.use(cors);
app.use(express.json());

// const db = mysql.createConnection({
//     host : "localhost",
//     user : "root",
//     password: "Nockia2004",
//     database : "database"
// })

const port = 8080;


app.get('/',(req,res) => {
    res.json("hello world");
})

app.listen(port, () => {
    console.log(`Server started on port ${port} at http://localhost:8080/`);

})

