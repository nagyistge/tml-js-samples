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
  token:  "6f8faf23621a79fb534c4be2870cb3ea39a0e3950c15380d856125579cc33457",
  host:   "https://staging-api.translationexchange.com",

  agent: {
    enabled:  true,
    type:     "tools"
  },

  //cache: {
  //  adapter: 'memcache',
  //  hosts: ["localhost:11211"],
  //  namespace: "ced4ac9a2e16bc7993a6f4f5cb8309c62d8cda56f1c801ccb507247f6e3d0b06"
  //},

  //key:    "9f319334e0b9d2a902bf99a7994cfc9a77c071ce5511af600d66917f884e6418",
  //token:  "b14a58c1b89030b712f090f2f8d9644b2767ca25ab01b73abef5711d333b14fa",
  //host:   "http://localhost:3000",
  debug:  true,

  //cache: {
  //  adapter: 'memcache',
  //  hosts: ["localhost:11211"],
  //  namespace: "0d945971"
  //},

  //agent: {
  //  enabled:  true,
  //  type:     "tools",
  //  version:  "0.1.10",
  //  domains:  {
  //    api:        "http://localhost:3000",
  //    tools:      "http://localhost:3002",
  //    analytics:  "https://analyst.translationexchange.com"
  //  }
  //},

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