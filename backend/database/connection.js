const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Nockia2004",
    database: "ydiscovery_datas"
})

module.exports = connection;