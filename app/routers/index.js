const express = require('express');
const adminController = require('../controller/admin.js');

const router = express.Router();

router.get('/addAdmin', adminController.addAdmin);

module.exports = router;
