const mysql = require('mysql');

var config = {
    connection: mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: "password",
        database: "library"
    })
}

module.exports = config;


