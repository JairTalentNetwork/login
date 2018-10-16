const db = require('../Database/postgres');

function username_exists(data)
{
  if (data.length > 0)
  {
    // Validate token
    // If token is valid and current -> Route user to members page.
    // Else if token is valid but not current -> Route user to membership purchase. 
    res.status(200).end('Welcome to Republic!');
  }
  else
  {
    // Send user to registrations page.
    throw new Error('Unregistered user')
  }
}


function validate_username(req, res, next)
{
  const { username } = req.body.validated;
  const query_string = 'SELECT * FROM ' +
                       'user_profile WHERE username=$1';
  db.any(query_string, username)
    .then(username_exists(data))
    .catch(function (err) {
      res.status(400).end('Unregistered user')
      return next(err);});
};

module.exports = 
{
  signIn: async (req, res, next) =>
  {
    await validate_username(req, res, next);
  }
}
