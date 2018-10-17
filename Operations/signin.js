const db = require('../Database/postgres');

function validate_username(req, res, next)
{
  const { username } = req.body.validated;
  const query_string = 'SELECT * FROM ' +
                       'user_profile WHERE username=$1';
  db.any(query_string, username)
    .then((data)=>
    {
      if (data.length > 0)
      {
        console.log('Inside data.length > 0')
        // Validate token
        // If token is valid and current -> Route user to members page.
        // Else if token is valid but not current -> Route user to membership purchase. 
        res.status(200).end('Welcome to Republic!');
      }
      else
      {
        // Send user to registrations page.
        throw new Error('Unregistered user');
      }
    })
    .catch(function (err) {
      res.status(400).end('Unregistered user')
      return next(err);});
};

module.exports = 
{
  signin: async (req, res, next) =>
  {
    console.log('------> Reaching signin');
    await validate_username(req, res, next);
  },

  values_to_validate: async(req, res, next) =>
  {
    return console.log(req.body)
  }
}
