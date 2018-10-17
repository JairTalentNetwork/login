const db = require('../Database/postgres');

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
            message: 'You are in members area'
          });
      })

      .catch(function (err) {
        return next(err);
      });
  }

//    .......................................
}