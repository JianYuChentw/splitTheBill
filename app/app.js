const express = require('express');
const app = express();
const routers = require('./routers');



// 定義路由
app.use('/',routers);



module.exports = app;
