var Recaptcha = require('recaptcha').Recaptcha,
    emailer   = require('../lib/emailer.js');

exports.index = function(request, response){
  response.render(
    'index',
    { 
        title: 'David Kolb',
        subtitle: 'Software Develper and Operations',
        flash: undefined
    }
  );
};

exports.contact = function(reqeust, response) {
  response.render(
    'contactForm',
    {
      title: 'Get in Touch',
      recaptcha_pub_key: process.env.RECAPTCHA_PUB,
      flash: undefined
    }
  );
};

exports.submitContact = function(request, response) {
  var data = {
    remoteip: request.connection.remoteAddress,
    challenge: request.body.recaptcha_challenge_field,
    response: request.body.recaptcha_response_field
  };

  recaptcha = new Recaptcha(process.env.RECAPTCHA_PUB,
                            process.env.RECAPTCHA_PRIV,
                            data);

  recaptcha.verify(function(success, error_code) {
    if (success) {
      emailer.sendMessage(request.body.returnAddress, request.body.message,
        function(error, successMsg) {
          flash = { type: 'danger', message: 'Unknown Error' };
          if (error) {
            flash.message = "Message could not be sent.";
            console.log("Error sending message: " + error);
          } else {
            flash.type = 'success';
            flash.message = "Message sent!  Thanks!"
            console.log("Message successfully sent: " + successMsg);
          }
          response.render(
            'contactForm',
            {
              title: 'Get in Touch',
              recaptcha_pub_key: process.env.RECAPTCHA_PUB,
              flash: flash 
            }
          );
        });
    } else {
      console.log("Captcha verify unsuccessful: " + error_code);
      response.render(
        'contactForm',
        {
          title: 'Get in Touch',
          recaptcha_pub_key: process.env.RECAPTCHA_PUB,
          flash: {
            type: 'danger',
            message: 'Bad recaptcha response!'
          }
        }
      );
    }
  });
};

exports.errorTest = function(request, response) {
  console.log("Got a hit on errorTest, making a scene!");
  response.render('doesNotExist');
}
