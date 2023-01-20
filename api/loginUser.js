const helper = require('../helper')
const bcrypt = require('bcrypt')
async function handleLoginUser(req, res) {
    const body = req.body
    let isValidBody = validateLoginUserRequest(body)
    if(!isValidBody){
        res.status(400).send("Invalid request body")
        return
    }

    let getUserHashPassQuery = `SELECT password FROM user WHERE username="${body.username}"`
    try {
        let data = await helper.dbMethods.query(getUserHashPassQuery)
        if(!data.length){
            res.status(204).send("User does not exist")
        }
        const storedHashPass = data[0].password
        const result = await bcrypt.compare(body.password, storedHashPass);
        if(!result) {
            res.status(401).send("invalid credentials")
            return
        }
        res.status(200).send("logged in successfully")
    } catch (err) {
        console.log({msg: "Error while login", err, getUserHashPassQuery})
        res.status(500).send("Error while login")
    }
}

function validateLoginUserRequest(body){
    if(body && body.username && body.password) {
        return true
    } else {
        return false
    }
}

async function comparePassword(plaintextPassword, hash) {
    const result = await bcrypt.compare(plaintextPassword, hash);
    return result;
}

module.exports = handleLoginUser