const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "P.detoc13112004",
    database: "ydiscovery_datas"
})

module.exports = connection;