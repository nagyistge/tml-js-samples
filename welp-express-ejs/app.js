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
app.use(tml.init({

  key:    "ced4ac9a2e16bc7993a6f4f5cb8309c62d8cda56f1c801ccb507247f6e3d0b06",
  host:   "https://staging-api.translationexchange.com",
  debug:  true

  //cache: {
  //  adapter: 'memcache',
  //  hosts: ["localhost:11211"],
  //  namespace: "0d945971"
  //},

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