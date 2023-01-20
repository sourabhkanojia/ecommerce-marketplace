const express = require('express');
const router = express.Router();
const HandleRegisterUser = require('./registerUser')
const HandleLoginUser = require('./loginUser')

router.post('/auth/register',(req, res) => {
    HandleRegisterUser(req, res)
})

router.post('/auth/login', (req, res) => {
    HandleLoginUser(req, res)
})

module.exports = router;