var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var cors = require('cors');
const getLocalStrategy = require('./system/strategies/LocalStrategyProvider');
const getJWTStrategy = require('./system/strategies/JWTStrategyProvider');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var photoRouter = require('./routes/photos');
var projectRouter = require('./routes/projects');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

passport.use('local', getLocalStrategy());
passport.use('jwt', getJWTStrategy());



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/photos', photoRouter);
app.use('/projects', projectRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500).json(err);
});

module.exports = app;