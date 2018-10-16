const Joi = require('joi');

const email_schema = Joi.string().email();
const username_schema = Joi.string().min(4).max(30); 
const password_schema = Joi.string().min(6).max(30);

module.exports = 
{
  
  validate: (schema) =>
  {
    return (req, res, next) =>
    {      
      const data_processed = Joi.validate(
        req.body, 
        schema);

      if (data_processed.error)
      {
        return res.status(400)
          .json(data_processed.error); 
      }

      if (!req.correct)
      {
        req.correct = {}
      }

      req.body.validated = req.body;

      next();
    }
  },

 //    .......................................
  
 schema:
  {
    authSchema: Joi.object().keys(
      {
        username: username_schema.required(),
        email: email_schema.required(),
        password: password_schema.required()
      }),
    
    signIn_Schema: Joi.object().keys(
      {
        username: Joi.string().min(4).max(30),
        password: password_schema.required(),
        remember: Joi.string(),
        submit: Joi.string() 
      }
    )
  }

};