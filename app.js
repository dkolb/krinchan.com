
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

// Application URLs
app.get('/', routes.index);
app.get('/contact', routes.contact);

//Used in dev and staging to test error handlers.
if ('development' == app.get('env') || 'staging' == app.get('env')) {
  app.get('/errorTest', routes.errorTest);
}


//Error Handling
if ('development' == app.get('env')) {
  app.use(express.logger());
  app.use(express.errorHandler());
};

if ('staging' == app.get('env') || 'production' == app.get('env')) {
  app.use(express.logger());
  app.use(function (err, req, res, next) {
    if (req.accepts('html')) {
      res.status('500');
      res.render(
        'error',
        {
          title   : 'Server Error',
          message : 'An error occured on the server.' +
            '  The developer has been notified.'
        }      );
    } else if (req.accepts('json')) {
      res.write(500, '{"error": "Server Error"}');
    } else {
      res.write(500, "An error occured in the server.");
    }
  });
}

//Not found
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

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
