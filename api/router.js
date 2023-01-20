const express = require('express');
const router = express.Router();
const handler = require('./')
const helper = require('../helper')

router.post('/auth/register',(req, res) => {
    handler.HandleRegisterUser(req, res)
})

router.post('/auth/login', (req, res) => {
    handler.HandleLoginUser(req, res)
})

router.post('/seller/create-catalog', helper.authenticateToken ,(req, res) => {
    handler.HandleSellerCreateCatalog(req, res)
})

router.get('/buyer/list-of-sellers', helper.authenticateToken, (req, res) => {
    handler.HandleSellersList(req, res)
})

router.get('/buyer/seller-catalog/:sellerId', helper.authenticateToken, (req, res) => {
    handler.HandleSellerCatalog(req, res)
})

router.post('/buyer/create-order/:sellerId', helper.authenticateToken, (req, res) => {
    handler.HandleCreateOrder(req, res)
})

router.get('/seller/orders', helper.authenticateToken, (req, res) => {
    handler.HandleGetSellerOrders(req, res)
})

module.exports = router;