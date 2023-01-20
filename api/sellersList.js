const helper = require("../helper");
async function handleSellersList(req, res) {
    if(req.user.type!=="buyer") return res.sendStatus(403)

    const getSellerListQuery = `SELECT id FROM user WHERE type="seller"`
    try {
        const data = await helper.dbMethods.query(getSellerListQuery)
        let response = { sellerList: []}
        for(let seller of data){
            response.sellerList.push(seller.id)
        }
        return res.status(200).send(response)
    } catch (err) {
        console.log({msg: "Error while getting sellers list", err})
        return res.status(500).send("Error while getting sellers list")
    }
}

module.exports = handleSellersList