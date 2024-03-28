const express = require('express');
const app = express();
const routers = require('./routers');



// 定義路由
app.use('/',routers);

// 如果你有其他路由，可以在這裡繼續添加

module.exports = app;
