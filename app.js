
/**
 * Module dependencies.
 */

var configApp = require('./lib/configApp.js')
  ;

var appObjects = configApp.setUp();
var app = appObjects.app;
var pg = appObjects.pg;

var server = app.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

//Fast shutdown
process.on('SIGTERM', function() {
  server.close(function() {
    console.log("Closing out remaining connections.");
    pg.end();
  });
});

