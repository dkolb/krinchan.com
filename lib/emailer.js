var nodemailer = require('nodemailer'),
    jade       = require('jade');

emailParms = {
  user: process.env.GMAIL_USER,
  name: process.env.GMAIL_NAME,
  pass: process.env.GMAIL_PASS,
  sendTo: process.env.MESSAGE_DESTINATION,
};


exports.sendMessage = function (replyAddress, message, callback) {

  var html = jade.renderFile('./views/email.jade', {
    filename: 'email.jade',
    pretty: 'false',
    compileDebug: false,
    debug: false,
    replyTo: replyAddress,
    message: message
  });

  var text = "Message from: " +replyAddress + "\n" +
    "Message: " + message + "\n";

   var smtpTransport = nodemailer.createTransport("SMTP", {
    service: "Gmail",
    auth: {
      user: emailParms.user,
      pass: emailParms.pass,
    }
  });

  var mailOptions = {
    from: emailParms.name + " <" + emailParms.user + ">",
    to: emailParms.sendTo + ',' + replyAddress,
    subject: "Message from krinchan.com contact form.",
    html: html,
    text: text
  };

  smtpTransport.sendMail(mailOptions, function(error, response) {
    if(error) {
      smtpTransport.close();
      callback(error, undefined);
    } else {
      smtpTransport.close();
      callback(undefined, response.message);
    }
  });

  smtpTransport.close();
};
