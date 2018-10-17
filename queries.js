var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/db_authentication';
var db = pgp(connectionString);

var options = {
  promiseLib: require('bluebird')
};


module.exports = {
  getAllEmails: getAllEmails,
  getPassword: getPassword
};