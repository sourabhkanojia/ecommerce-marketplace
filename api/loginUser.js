const helper = require('../helper')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
async function handleLoginUser(req, res) {
    const body = req.body
    let isValidBody = validateLoginUserRequest(body)
    if(!isValidBody){
        res.status(400).send("Invalid request body")
        return
    }

    let getUserHashPassQuery = `SELECT password,type FROM user WHERE username="${body.username}"`
    try {
        let data = await helper.dbMethods.query(getUserHashPassQuery)
        if(!data.length || data[0].type!==body.type){
            return res.status(400).send("User does not exist")
        }

        const storedHashPass = data[0].password
        const result = await bcrypt.compare(body.password, storedHashPass);
        if(!result) {
            return res.status(401).send("invalid credentials")
        }

        const user = {username: body.username, type: body.type}
        let authToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
        return res.status(200).send({msg:"logged in successfully", authToken})
    } catch (err) {
        console.log({msg: "Error while login", err, getUserHashPassQuery})
        return res.status(500).send("Error while login")
    }
}

function validateLoginUserRequest(body){
    if(body && body.username && body.password && body.type && (body.type==="seller" || body.type==="buyer")) {
        return true
    } else {
        return false
    }
}

module.exports = handleLoginUser