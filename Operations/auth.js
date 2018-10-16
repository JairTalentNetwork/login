const JWT = require('jsonwebtoken');
const db = require('../Database/postgres');

function get_username(req, res, next)
{
  const { username } = req.body.validated;
  console.log('Username -------> ', username);
  db.any('SELECT * FROM ' +
         'user_profile WHERE username=$1', 
         username)

    .then(function (data) 
    {
      if (data.length > 0){
        res.status(200).end('Welcome to Republic!');
        }
      else{
        throw new Error('Unregistered user')
      }
    })

    .catch(function (err) {
      res.status(400).end('Unregistered user')
      return next(err);
    });
};

module.exports = 
{

//    .......................................

  signUp: async (req, res, next) =>
  {
    try
    {
      const { email, password } = req.validated.body

      const emailExists = await db.any(
        'select * from user_profile where email = $1', 
        email)

      if (emailExists.length !== 0)
      {
        return res.status(400).json({
           message: 'Email already in use' });
      }

      db.none('insert into user_profile(email, password)' +
              'values(${email}, ${password})',
              req.validated.body);

      // Respond with token instead of json
    } 
    catch(error){next(error);}
  },

//    .......................................

  signIn: async (req, res, next) =>
  {
   await get_username(req, res, next);
  },

//    .......................................

  access: async (req, res, next) =>
  {
    console.log('In access handler')
    db.any('SELECT email from user_profile')

      .then(function (data) 
      {
        res.status(200).json(
          {
            status: 'success',
            data: data,
            message: 'Retrieved emails'
          });
      })

      .catch(function (err) {
        return next(err);
      });
  }

//    .......................................
}