module.exports = function(app) {
  app.get('/', function(request, response){
    response.render(
      'index',
      { 
          title: 'David Kolb',
          subtitle: 'Software Develper and Operations',
          flash: undefined
      }
    );
  });
}
