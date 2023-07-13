var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var cataLogRouter = require('./routes/catalog');
var compression = require('compression');
var helmet = require('helmet');


var app = express();

// 设置 mongoose 连接
const mongoose = require('mongoose')
const mongoDB = 'mongodb://localhost:27017'
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = global.Promise
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB 连接错误：'))
db.on('connected', () => {
  console.log('成功连接到MongoDB');
  // 在这里可以执行连接成功后的操作
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));  
app.set('view engine', 'jade');

// 避免漏洞攻击
app.use(helmet());
// 压缩响应文件
app.use(compression())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 路由设置
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catalog',cataLogRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
