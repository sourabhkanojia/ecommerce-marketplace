const mysql = require('mysql');
const config = require('../config/config');

const mysqlPool = mysql.createPool({
    connectionLimit : 4,
    host: 'sql12.freemysqlhosting.net',
    user: 'sql12591527',
    password: 'upGNzuMjss',
    database: 'sql12591527'
});

module.exports = mysqlPool;