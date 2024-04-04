const express = require('express');
const router = express.Router();
const roleGuard =require('../middleware/role-guard')
const userCtrl = require('../controller/user');






router.post('/login', userCtrl.login)

router.post('/register', userCtrl.register)

  
router.get('/resume', roleGuard('uid'), userCtrl.userDate)

router.put('/password', roleGuard('uid'), userCtrl.updatePassword)

router.delete('/logout', roleGuard('uid'), userCtrl.logOut)




    




   
module.exports = router