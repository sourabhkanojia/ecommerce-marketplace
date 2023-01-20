const helper = require('../helper')
const {nanoid} = require("nanoid");
async function handleCreateOrder(req, res) {
    if(req.user.type!=="buyer") return res.sendStatus(403)

    const body = req.body
    const userId = req.user.id
    const sellerId = req.params.sellerId
    if(!body.productIdList || !body.productIdList.length){
        return res.status(400).send("Invalid request body")
    }
    let orderId = nanoid(15)
    try{
        let value = ""
        for(let productId of body.productIdList) {
            value += `("${orderId}",${sellerId},${userId},${productId}),`
        }
        let insertOrderQuery = `INSERT INTO orders(order_id,seller_id,user_id,product_id) VALUES ${value.substring(0,value.length-1)}`

        await helper.dbMethods.query(insertOrderQuery)
        console.log("order created successfully")
        return res.status(200).send("order created successfully")
    } catch (err) {
        console.log({msg: "Error creating order", err})
        return res.status(500).send("Error while creating order")
    }
}

module.exports = handleCreateOrder