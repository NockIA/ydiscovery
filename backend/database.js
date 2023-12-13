const mysql = require("mysql")

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Nockia2004",
    database: "ydiscovery_datas"
})

module.exports = connection;