// server.js
// 使用ES模块的导入语法
import express from 'express';
// const app = express();
// const express = require('express');
// const path = require('path');
import path from 'path';
import cors from 'cors';
// const cors = require('cors');
const app = express();

// 应用 CORS 策略，允许所有来源
app.use(cors());

// 设置静态文件夹，这里将图片存储的目录作为静态资源目录
app.use('/images', express.static('C:\\Users\\xukai\\Desktop\\PaperDev\\imageStorage'));

// 服务器启动在3000端口
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
