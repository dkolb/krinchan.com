var express = require('express')
  , http = require('http')
  , path = require('path')
  , pg = require('pg')
  , fs = require('fs')
  ;

module.exports = function () {
  var app = express();
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon(__dirname + '/public/img/favicon.ico'));
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, '/public')));


  //Dynamic route application
  fs.readdirSync('routes').forEach(function(file) {
    console.log('Applying routes in ' + file);
    if(!/\.swp$/.test(file)) {
      require('./routes/' + file)(app);
    }
  });


  //Error Handling
  if ('development' == app.get('env')) {
    app.use(express.logger());
    app.use(express.errorHandler());
  };

  if ('staging' == app.get('env') || 'production' == app.get('env')) {
    app.use(express.logger());
    app.use(require('./lib/vagueErrorHandler.js'));
  }

  //Not found and no Errors
  app.use(function(req, res, next) {
    res.status(404);
    res.render(
      'error',
      {
        title: 'Page Not Found',
        message: 'Sorry, that URL was not found.  Please go back, or go ' +
          'to the <a href="/">home page</a>.'
      }
    );
  });

  return {
    app: app,
    pg: pg
  };
};
