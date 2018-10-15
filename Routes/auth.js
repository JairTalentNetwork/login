const express = require("express");
const router = express.Router();

const handler = require('../Operations/auth');
const { validate, schema } = require('../Validation/auth');

router.route('/signup')
  .post(
    validate(schema.authSchema), 
    handler.signUp)

router.route('/signin')
  .post(handler.signIn)

router.route('/access')
  .get(handler.access)

module.exports = router;