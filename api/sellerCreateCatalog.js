const helper = require("../helper");

async function handleSellerCreateCatalog(req, res) {
    if(req.user.type!=="seller") return res.sendStatus(403)

    const body = req.body
    let isValidBody = validateSellerCreateCatalogRequest(body)
    if(!isValidBody){
        res.status(400).send("Invalid request body")
        return
    }

    try {
        const getUserUniqueIdQuery = `SELECT id FROM user WHERE username="${req.user.username}"`
        let data = await helper.dbMethods.query(getUserUniqueIdQuery)
        if(!data.length){
            return res.status(400).send("User does not exist")
        }
        const sellerId = data[0].id
        let value = ""
        for(let product of body) {
            value += `("${sellerId}","${product.name}","${product.price}"),`
        }
        const insertProductQuery = `INSERT INTO products(seller_id,name,price) VALUES ${value.substring(0,value.length-1)}`
        await helper.dbMethods.query(insertProductQuery)
        console.log("successfully inserted products info")
        return res.status(200).send("successfully added products")
    } catch (err) {
        console.log({msg: "Error while login", err})
        return res.status(500).send("Error while creating catalog")
    }
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