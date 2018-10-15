const promise = require('bluebird');

const options = {
  promiseLib: promise
};

const pgp = require('pg-promise')(options);

const conection_name = 'postgres://jair:15524Nets@localhost:' +
                       '5432/db_authentication';

const db = pgp(conection_name);

module.exports = db