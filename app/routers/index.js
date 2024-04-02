const express = require('express');
const app = express();


  
  app.use(express.json({ limit: '2mb' }));
  app.use(express.urlencoded({ extended: false }));

  app.use('/users',require('../routers/user.js'))
  app.use('./friends', require('../routers/friends.js'));

module.exports = app;