const HandleRegisterUser = require('./registerUser')
const HandleLoginUser = require('./loginUser')
const HandleSellerCreateCatalog = require('./sellerCreateCatalog')
const HandleSellersList = require('./sellersList')
const HandleSellerCatalog = require('./sellerCatalog')
const HandleCreateOrder = require('./createOrder')

const handlers = {
    HandleRegisterUser,
    HandleLoginUser,
    HandleSellerCreateCatalog,
    HandleSellersList,
    HandleSellerCatalog,
    HandleCreateOrder
}

module.exports = handlers