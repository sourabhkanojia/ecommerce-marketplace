const helper = require('../helper')
const bcrypt = require('bcrypt')
const uuid = require('uuid4')

// Create new user
async function handleRegisterUser(req, res) {
    const body = req.body
    let isValidBody = validateRegisterUserRequest(body)
    if(!isValidBody){
        res.status(400).send("Invalid request body")
        return
    }
    const hashPassword = await bcrypt.hash(body.password, 10);
    body.password = hashPassword
    let insertUserQuery = `INSERT INTO user(id,username,password,type) VALUES("${uuid()}","${body.username}","${body.password}","${body.type}")`
    try {
        await helper.dbMethods.query(insertUserQuery)
        console.log("successfully inserted info of new user")
        return res.status(200).send("successfully registered")
    } catch (err) {
        if (err.errno===1062){
            return res.status(400).send("Username already exist")
        } else {
            console.log({msg: "Error while adding new user", err, insertUserQuery})
            return res.status(500).send("Error while adding new user")
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