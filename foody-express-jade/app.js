var express       = require('express');
var path          = require('path');
var favicon       = require('static-favicon');
var logger        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var tml           = require('tml-express');

var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

//app.use(tml.init("573d1cb5d207b439abdcf1cad8ff76c56b00c275fa032a69f748b34c82613e07", {

  //cache: {
  //  adapter: "memcache",
  //  hosts: ["localhost:11211"],
  //  namespace: "573d1cb5d"
  //}

  //cache: {
  //  adapter: "memcache",
  //  hosts: ["172.31.30.155:11211"],
  //  namespace: "573d1cb5d"
  //}

app.use(tml.init({
  // lets switch to staging - i will make the app open
  host:   "https://staging-api.translationexchange.com",
  key:    "f28dd49115a8d386966f63d369c923e76a06cd2c4c34cc157f00e790ef4e2427",
  token:  "425000119f70bc555b67c6477010a28a0bbb3ecec2f52c75d436d5b68192b6b9",

  agent: {
    enabled:  true,
    type:     "agent",
    version:  "0.1.7",
    domains:  {
      api:   "https://staging-api.translationexchange.com",
      tools: "https://staging-translation-center.translationexchange.com"
    }
  }

  // Michael's Laptop
  //key: "83b4a4e7644f40343cd6749526a6817efe0b0ef9775d793e5bb64bebd2be755e",
  //token: "9df37e96ce1586b56d0db4daf70cff43ae8e00cb5fc0e6bdedf33edd11268e55",
  //host: "http://localhost:3000",

  //agent: {
  //  enabled:  true,
  //  type:     "agent",
  //  version:  "0.1.7",
  //  domains:  {
  //    api:   "http://localhost:3000",
  //    tools: "http://localhost:3002"
  //  }
  //},

  //cache1: {
  //  adapter: "memcache",
  //  hosts: ["localhost:11211"],
  //  namespace: "f66ef4cd81effb479a25c19280fda494b4efc183d8aa463222071d15d40fb909"
  //}

  //current_locale: 'fr',
  //current_locale: function(request) {
  //  return 'fr';
  //},

  //current_source: function() {
  //  window.location......
  //}


  // DYNAMIC SOURCES - BASED on PATH or CLASS NAME


  //current_source: {
  //  "recipe\\/[\\d]+$": 'current'
  //}
  //
  //current_source: function(request) {
  //  if (request.url.indexOf('profile/')) {
  //    return 'profile/view';
  //  }
  //  // return utils.normalizeSource(request.url);
  //},
  //
  //current_source: "BLA",
  //
  //current_source: {
  //  'recipe/:id': 'recipe/view'
  //},

  //current_user: function(request) {
  //  return;
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
