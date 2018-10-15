const Joi = require('joi');

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
      
      req.correct.body = req.body; 

      next();
    }
  },

 //    .......................................
  
 schema:
 {
   
    authSchema: Joi.object().keys(
      {
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(30).required()
      })
  }

};