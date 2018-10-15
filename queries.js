var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/db_authentication';
var db = pgp(connectionString);

var options = {
  promiseLib: require('bluebird')
};

function getAllEmails(req, res, next) {
  db.any('SELECT * from user_profile')
    .then(function (data) {
      res.status(200).json(
        {
          status: 'success',
          data: data,
          message: 'Retrieved ALL emails'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

module.exports = {
  getAllEmails: getAllEmails,
  getPassword: getPassword
};