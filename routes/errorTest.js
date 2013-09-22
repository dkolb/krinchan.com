module.exports = function(app) {
  var env = app.get('env');

  if (env == 'development' || env == 'staging') {
    app.get('/errorTest', function(request, response) {
      console.log("Got a hit on errorTest, making a scene!");
      response.render('doesNotExist');
    });
  }
}
