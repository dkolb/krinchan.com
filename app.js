
var appObjects = require('./configApp.js')();
var app = appObjects.app;

var server = app.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

