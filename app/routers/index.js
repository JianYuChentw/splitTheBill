const express = require('express');
const app = express();


  
  app.use(express.json({ limit: '2mb' }));
  app.use(express.urlencoded({ extended: false }));

  app.use('/users',require('../routers/user.js'))
//   require('./friends')(app);

module.exports = app;