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

module.exports = router;