# krinchan.com Sourcecode

Source code for my site.  Hosted on Heroku[1].

[1]: http://www.heroku.com

## Configuration

Configuration is done via environment variables.

| Variable Name       | Description                                                                                           |
| ---:                | ---                                                                                                   |
| NODE_ENV            | Environment application is running in. Currently used are `development`, `staging`, and `production`. |
| PORT                | Port to listen on.                                                                                    |
| RECAPTCHA_PUB       | Public key for Google Recaptcha.                                                                      |
| RECAPTHA_PRIV       | Private key for Google Recaptcha.                                                                     |
| GMAIL_USER          | GMail username to use to send emails from the contact form.                                           |
| GMAIL_PASS          | Password for same GMail account.                                                                      |
| GMAIL_NAME          | Name to use when writing email header: `{GMAIL_NAME} <{GMAIL_USER}>`                                  |
| MESSAGE_DESTINATION | Email address to send email messages.                                                                 |
