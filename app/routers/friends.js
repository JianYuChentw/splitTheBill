const express = require('express');
const router = express.Router();
const roleGuard =require('../middleware/role-guard')
const friendsCtrl = require('../controller/friends')



router.get('/all', roleGuard('uid'), friendsCtrl.getFriends)
router.post('/new', friendsCtrl.nweApprove)
router.put('/approve', friendsCtrl.updateApprove)



module.exports = router