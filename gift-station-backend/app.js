var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productRouter = require('./routes/product');
var categoryRouter = require('./routes/category')
var subcategoryRouter = require('./routes/subcategory');
var adminRouter = require('./routes/adminlogin')
var productlistRouter = require ('./routes/productlist')
var bannerRouter= require ('./routes/banner')
var userInterfaceRouter= require ('./routes/userInterface')
var orderRouter = require('./routes/order')
var statecityRouter= require('./routes/statecity')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/subcategory', subcategoryRouter);
app.use('/product', productRouter);
app.use('/admin', adminRouter)
app.use('/productlist',productlistRouter)
app.use('/category', categoryRouter);
app.use('/banner',bannerRouter);
app.use('/userInterface',userInterfaceRouter);
app.use('/order',orderRouter);
app.use('/statecity',statecityRouter)

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