var request = require('supertest');
var config = require('../config/config');
// Wrapper that creates admin user to allow api calls
var ConfigureAuth = require('./ConfigureAuth');
var Employee = require('../models/Employee');


var Email = require('../notification/email');
var TextModel = require('../notification/text');

// SAMPLE : [{phone_number: "XXX-XXX-XXXX", email: "XXXXX@XXXXX.com"}];
var employees = [];

describe("Notification", function() {

    it('It should send an email', function(done){
      this.timeout(9000);
      Email.sendEmail("Tony Montana", employees, done);
      //done();
    });

    it('It should send an text', function(done){
      this.timeout(9000);
      TextModel.sendText("Tony Montana", employees, done);
      //done();
    });
  }
);
