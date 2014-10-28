var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var site = require('./site/routes');
var projects = require('./projects/routes');


var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('views', __dirname);
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', site);
app.use('/projects', projects);

// development only
if (app.get('env') === 'development') {
  app.set('DB_URL', 'mongodb://localhost:27017/beans_dev');
}

if (app.get('env') === 'staging') {
  app.set('DB_URL', process.env.MONGOHQ_URL);
}

console.log("Connect URL is " + app.get('DB_URL'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        console.log(err.message);
        res.status(err.status || 500);
        res.render('errors/error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('errors/error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
