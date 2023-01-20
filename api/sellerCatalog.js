const helper = require("../helper");

async function handleSellerCatalog(req, res) {
    if(req.user.type!=="buyer") return res.sendStatus(403)

    const sellerId = req.params.sellerId
    const productListQuery = `SELECT * FROM products WHERE seller_id="${sellerId}"`
    try {
        const data = await helper.dbMethods.query(productListQuery)
        let response = { productList: []}
        for(let product of data){
            response.productList.push({productId: product.id, name: product.name, price: product.price})
        }
        return res.status(200).send(response)
    } catch (err) {
        console.log({msg: "Error while getting product list", err})
        return res.status(500).send("Error while getting product list")
    }
}

module.exports = handleSellerCatalog