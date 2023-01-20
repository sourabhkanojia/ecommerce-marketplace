const mysqlPool = require('./drivers/mysql')
const _ = require('lodash');
const jwt = require('jsonwebtoken')
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

function authenticateToken(req, res, next) {
    const token = req.headers['auth-token']
    if(!token)res.status(401).send("invalid credential")
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

module.exports = {
    dbMethods: {
        query
    },
    authenticateToken
}