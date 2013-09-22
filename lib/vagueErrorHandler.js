module.exports = function (err, req, res, next) {
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
};
    
