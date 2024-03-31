const express = require('express');
const router = express.Router();
const userCtrl = require('../controller/user');




  

router.post('/login', userCtrl.login)


    




   
module.exports = router