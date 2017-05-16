const request = require('supertest');

const config = require('../config/config');

const AdminUser = require('../models/Company');
const Employee = require('../models/Employee');

// Employee login feature
function setupEmployee(done) {
  setupAdmin(done, true);
}

function setupAdmin(done) {
  setupUser(done, false);
}

function setupUser(done, isEmployee) {
  const path = isEmployee ? '/employees' : '/api/companies';
  const UserModel = isEmployee ? Employee : AdminUser;

  let token;
  let admin;

  // Add random number to email to reduce concurrency issue chances on
  // duplicate unique key errors.
  const email = `test${Math.floor(Math.random() * 100000)}@test.com`;
  const password = 'test_password';
  const credit_card_number = '1231231241251';
  const name = 'test';
  const expiration_date = '6/17';
  const phone_number = '1234567890';

  const url = `localhost:${config.port}`;
  request(url)
      .post(path)
      .send({
        email,
        password,
        credit_card_number,
        name,
        expiration_date,
        phone_number,
      })
      .expect(200)
      .end((err, res) => {
        if (err) { throw (err); }
        res.body.should.have.property('_id');
        login(res.body._id);
      });

  function login(id) {
    request(url)
        .get(`${path}/${id}`)
        .expect(200)
        .end((err, res) => {
          if (err) { throw (err); }
          retrieveAdmin();
        });
  }

  function retrieveAdmin() {
    AdminUser.findOne({ email }, (err, dbAdmin) => {
      if (err) { throw (err); }
      admin = dbAdmin;
      done({
        admin,
        email,
        password,
        token,
      });
    });
  }
}

function cleanupAuth(email, callback) {
  AdminUser.remove({ email }, (err) => {
    if (err) { throw (err); }
    callback();
  });
}

// Employee login feature
function cleanupEmployee(email, callback) {
  Employee.remove({ email }, (err) => {
    if (err) { throw (err); }
    callback();
  });
}

module.exports.setupAdmin = setupAdmin;
module.exports.setupEmployee = setupEmployee;
module.exports.cleanupAuth = cleanupAuth;
module.exports.cleanupEmployee = cleanupEmployee;
