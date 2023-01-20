const HandleRegisterUser = require('./registerUser')
const HandleLoginUser = require('./loginUser')
const HandleSellerCreateCatalog = require('./sellerCreateCatalog')

const handlers = {
    HandleRegisterUser,
    HandleLoginUser,
    HandleSellerCreateCatalog,
}

module.exports = handlers