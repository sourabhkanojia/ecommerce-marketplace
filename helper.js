const mysqlPool = require('./drivers/mysql')
const _ = require('lodash');
function query(query){
    return new Promise((resolve,reject) => {
        mysqlPool.query(query,(err,result) => {
            if (err) {
                return reject(_.pick(err,Object.getOwnPropertyNames(err)));
            }
            return resolve(result);
        });
    });
}

module.exports = {
    dbMethods: {
        query
    }
}