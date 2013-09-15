var Recaptcha = require('recaptcha').Recaptcha;

exports.index = function(request, response){
  response.render(
    'index',
    { 
        title: 'David Kolb',
        subtitle: 'Software Develper and Operations'
    }
  );
};

exports.contact = function(reqeust, response) {
  var recaptcha = new Recaptcha(process.env.RECAPTCHA_PUB,
                                process.env.RECAPTCHA_PRIV);
  response.render(
    'contactForm',
    {
      title: 'Get in Touch'
      recaptcha_form: recaptcha.toHTML()
    }
  );
};

exports.submitContact = function(request, response) {
  console.log("Got a submitContact request...");
};

exports.errorTest = function(request, response) {
  console.log("Got a hit on errorTest, making a scene!");
  response.render('doesNotExist');
}
