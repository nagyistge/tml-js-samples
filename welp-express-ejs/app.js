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

  key: "6ae433fc569de0569c8d94ebd24eb72c6f453f29624c5ad0ff9b60a11a604462",
  token: "8bf44650b398d242d5a8ddbae0239fae498ccdc7032987a1ac8c92d693eba95b",
  host: "http://localhost:3000",
  debug: true,

  //key:    "ced4ac9a2e16bc7993a6f4f5cb8309c62d8cda56f1c801ccb507247f6e3d0b06",
  //host:   "https://staging-api.translationexchange.com",
  //debug:  true

  cache: {
    adapter: 'memcache',
    hosts: ["localhost:11211"],
    namespace: "6ae433fc"
  },

  agent: {
    host: "http://localhost:8282/dist/agent.js"
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