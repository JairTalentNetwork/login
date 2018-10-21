const express = require("express");
const router = express.Router();
var path = require('path');
var appDir = path.dirname(require.main.filename);


module.exports = 
{
  go_to_register: (req, res, next) =>
  {
    return res.sendFile(
      path.join(appDir + '/public/registro.html')
      );
  }
}
