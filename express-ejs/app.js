var express       = require('express');
var cookieParser  = require('cookie-parser');

var tml           = require('tml-express');

var routes        = require('./routes/index');
var app           = express();

// view engine setup
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(express.static(__dirname + '/public'));

// Tml initialization
app.use(tml.init("47fc86738d2603c6d80b869433c2d897d9741b8f7aa0c5a6a5e9997f8f7ee803", {
//app.use(tml.init("8b2120953b69430566f4e59fc750751f8bdf06c341b824c5493f350529c91499", {
//  host: "http://localhost:3000",

  // configure the cache adapter
  //cache: {
  //  adapter: 'redis',
  //  host: process.env.REDIS_HOST || "localhost",
  //  port: process.env.REDIS_PORT || 6379,
  //  namespace: "0d945971",
  //  timeout: 3600,
  //  version: 4
  //}

  debug: true,

  cache: {
    adapter: 'memcache',
    hosts: ["localhost:11211"],
    namespace: "0d945971"
  },

  hook: {
    enabled: true,
    path: '/tml/upgrade'
    //auth: function(req) {
    //  return true;
    //}
  }

  //cache: {
  //  adapter: "file",
  //  path: "./cache"
  //}

}));

app.use('/', routes);

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
});

module.exports = app;