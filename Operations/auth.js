const JWT = require('jsonwebtoken');
const db = require('../Database/postgres');

module.exports = 
{

//    .......................................

  signUp: async (req, res, next) =>
  {
    try
    {
      const { email, password } = req.correct.body

      // Check if there is already that email in the database
      const emailExists = await db.any(
        'select * from user_profile where email = $1', 
        email)

      if (emailExists.length !== 0)
      {
        return res.status(400).json({
           message: 'Email already in use' });
      }

      // Create new user in the database
      const user = {email, password}

      db.none('insert into user_profile(email, password)' +
              'values(${email}, ${password})',
               req.correct.body);

      // Respond with token instead of json
       
    } 
    catch(error){next(error);}
  },

//    .......................................

  signIn: async (req, res, next) =>
  {
    try
    // token => post
    {
      console.log('---- signin  ----')
    } 
    catch(error)
    {
      next(error);
    }
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