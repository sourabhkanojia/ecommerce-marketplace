const helper = require("../helper");

async function handleSellerCreateCatalog(req, res) {
    if(req.user.type!=="seller") return res.sendStatus(400)

    const body = req.body
    let isValidBody = validateSellerCreateCatalogRequest(body)
    if(!isValidBody){
        res.status(400).send("Invalid request body")
        return
    }

    let getUserUniqueIdQuery = `SELECT id FROM user WHERE username="${body.username}"`
    try {
        let data = await helper.dbMethods.query(getUserUniqueIdQuery)
        if(!data.length){
            res.status(204).send("User does not exist")
        }
    } catch (err) {
        console.log({msg: "Error while login", err, getUserHashPassQuery})
        res.status(500).send("Error while creating catalog")
    }
    console.log(body)
}

function validateSellerCreateCatalogRequest(body) {
    if(body && body.length){
        for(let product of body){
            if(product.name && product.price) continue;
            else return false
        }
        return true
    }
    return false
}

module.exports = handleSellerCreateCatalog