const helper = require('../helper')

// Create new user
async function handleRegisterUser(req, res) {
    const body = req.body
    let isValidBody = validateRegisterUserRequest(body)
    if(!isValidBody){
        res.status(400).send("Invalid request body")
        return
    }
    let insertQuery = `INSERT INTO user(username,password,type) VALUES("${body.username}","${body.password}","${body.type}")`
    try {
        await helper.dbMethods.query(insertQuery)
        console.log("successfully inserted info of new user")
        res.status(200).send("successfully registered")
    } catch (err) {
        if (err.errno===1062){
            res.status(400).send("Username already exist")
        } else {
            res.status(500).send("Error while adding new user")
        }
    }
}

function validateRegisterUserRequest(body){
    if(body && body.username && body.password && body.type && (body.type==="seller" || body.type==="buyer")) {
        return true
    } else {
        return false
    }
}

module.exports = handleRegisterUser