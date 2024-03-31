const express = require('express');
const app = express();
const session = require('express-session');
const routers = require('./routers');

app.use(
    session({
      secret: 'sTB',
      resave: true,
      saveUninitialized: true,
    })
  );

// 定義路由
app.use('/', routers);

module.exports = app;
