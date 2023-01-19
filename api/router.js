const express = require('express');
const router = express.Router();
const HandleRegisterUser = require('./registerUser')


router.post('/auth/register',(req, res) => {
    HandleRegisterUser(req, res)
})

module.exports = router;