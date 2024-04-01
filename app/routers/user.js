const express = require('express');
const router = express.Router();
const roleGuard =require('../middleware/role-guard')
const userCtrl = require('../controller/user');




  
router.get('/resume', roleGuard('uid'), userCtrl.userDate)
router.post('/login', userCtrl.login)
router.put('/password', roleGuard('uid'), userCtrl.updatePassword)



    




   
module.exports = router