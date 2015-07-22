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
app.use(tml.init("0d94597cec4aa324ac764f53f6cb0e33ef5b3954144364f91f27fde8e8fc36fb", {

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