/***
 * Create node.js application
 */

/***
 * Dependencies
 */
var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var controllerLoader = require('./lib/ControllerLoader');
var app = express();

var db = require('./lib/DB');

var config = require('./config');

var Agenda = require('agenda');

//set public path that can be access from client.
app.use('/public', express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon()); //use favicon

app.use(logger('dev')); //use for log
app.use(bodyParser.text({
  type: 'text/html'
})); //parse infomation in html form.
app.use(bodyParser.json()); //parse json body
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cookieParser()); //use for read cookie.


app.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//load api controllers
app.use('/api', controllerLoader(path.join(__dirname, 'api_controllers'), null));
//load client controller.
app.use('/', controllerLoader(path.join(__dirname, 'controllers'), null));



/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
  //  res.render('error', {});
});
//AGENDA define.
var agenda = new Agenda({
  db:{address:config.get('mongo:url')}
});

agenda.define('select couple',require('./Jobs/SelectCoupleJob'));

agenda.every('1 minutes','select couple');

agenda.start();

module.exports = app;
