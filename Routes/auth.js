const express = require("express");
const router = express.Router();

const require = require('../Operations/auth');
const { validate, schema } = require('../Validation/auth');

router.route('/signup')
  .post(
    validate(schema.authSchema), 
    operations.signUp);

router.route('/signin')
  .post(
      validate(schema.signIn_Schema),
      require('../Operations/signin').signIn);

router.route('/access')
  .get(operations.access)

module.exports = router;