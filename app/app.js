const express = require('express');
const app = express();
const session = require('express-session');
const routers = require('./routers');
const AppError = require('../app/utils/handleError')


app.use(
    session({
      secret: 'sTB',
      resave: true,
      saveUninitialized: true,
    })
  );

// 定義路由
app.use('/', routers);

app.use((err, req, res, next) => {
  AppError.handleError(err,res)
});

module.exports = app;
