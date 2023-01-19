const mysql = require('mysql');

const mysqlPool = mysql.createPool({
    connectionLimit : 4,
    host: 'sql12.freemysqlhosting.net',
    user: 'sql12591527',
    password: 'upGNzuMjss',
    database: 'sql12591527'
});

mysqlPool.getConnection(function(err) {
    if (err) {
        console.error('error while connecting to mysqldb');
        throw Error("Unable to connect with mysql")
        // return;
    }
    console.log('mysqldb connected');
})

module.exports = mysqlPool;