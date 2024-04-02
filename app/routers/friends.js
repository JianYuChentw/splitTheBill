const express = require('express');
const router = express.Router();
const friendsCtrl = require('../controller/friends')



router.get('/all', friendsCtrl.getFriends)
router.post('/new', friendsCtrl.nweApprove)
router.put('/approve', friendsCtrl.updateApprove)



module.exports = router