const helper = require('../helper')
async function handleGetSellerOrders(req, res) {
    if(req.user.type!=="seller") return res.sendStatus(403)

    const sellerId = req.user.id
    try {
        const getOrdersListQuery = `SELECT t1.order_id,t1.product_id,t2.name,t2.price FROM orders as t1 inner join products as t2 
                                    on t1.product_id = t2.id
                                    WHERE t1.seller_id=${sellerId}`
        const orderList = await helper.dbMethods.query(getOrdersListQuery)
        orderList.sort((o1, o2) => o1.order_id<o2.order_id)

        const response = []
        for(let i=0;i<orderList.length;i++){
            let productInfo = {
                productId: orderList[i].product_id,
                productName: orderList[i].name,
                productPrice: orderList[i].price
            }
            if(i===0) {
                response.push({orderId: orderList[0].order_id, productList:[productInfo]})
            } else if(orderList[i].order_id === orderList[i-1].order_id) {
                response[response.length-1].productList.push(productInfo)
            } else {
                response.push({orderId: orderList[i].order_id, productList:[productInfo]})
            }
        }
        return res.status(200).send(response)
    } catch(err) {
        console.log("Error while retrieving order")
        return res.status(500).send("Error while retrieving order")
    }
}

module.exports = handleGetSellerOrders