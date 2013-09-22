
var appObjects = require('./configApp.js')();
var app = appObjects.app;
var pg = appObjects.pg;

var server = app.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

//Set close event
process.on('SIGINT', function() {
  console.log("Closing database connections!");
  pg.end();
});

process.on('SIGTERM', function() {
  pg.end();
});
