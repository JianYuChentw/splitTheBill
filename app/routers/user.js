const express = require('express');
const router = express.Router();
const roleGuard =require('../middleware/role-guard')
const userCtrl = require('../controller/user');
const AppError = require('../utils/handleError')
const responseStatus = require('../utils/response-status')




  
router.get('/resume', roleGuard('uid'), userCtrl.userDate)
router.post('/login', userCtrl.login)
router.put('/password', roleGuard('uid'), userCtrl.updatePassword)

router.get('/trigger-error', (req, res) => {
throw new Error 
    // throw new AppError(responseStatus.LOGIN_FAIL)
  });



    




   
module.exports = router