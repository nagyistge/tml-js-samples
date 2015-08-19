var express       = require('express');
var cookieParser  = require('cookie-parser');

var tml           = require('tml-express');

var routes        = require('./routes/index');
var app           = express();

// view engine setup
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(cookieParser());
app.use(express.static(__dirname + '/public'));

// Tr8n initialization
app.use(tml.init({
  key:    "9f319334e0b9d2a902bf99a7994cfc9a77c071ce5511af600d66917f884e6418",
  token:  "b14a58c1b89030b712f090f2f8d9644b2767ca25ab01b73abef5711d333b14fa",
  host:   "http://localhost:3000",
  debug:  true,

  // configure the cache adapter
  cache: {
    adapter: "redis",
    host: "localhost",
    port: 6379,
    namespace: "0d94597cec"
  }

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