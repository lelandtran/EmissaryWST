const request = require('supertest');
const config = require('../config/config');
const Company = require('../models/Company');

describe('Company Test', () => {
  const url = `localhost:${config.port}`;
  let token;
  let currCompany;

  const email = 'test@test.edu';
  const name = 'test';
  const expiration_date = '6/17';
  const phone_number = '1234567890';

  const new_email = 'test1@test.edu';
  const new_name = 'test1';
  const new_expiration_date = '3/19';
  const new_phone_number = '1231267890';


  const userID = null;


  before((done) => {
    request(url)
            .post('/api/companies')
            .send({
              email,
              name,
              phone_number,
            })
            .expect(200)
            .end((err, res) => {
              if (err) { throw (err); }
              res.body.should.have.property('_id');
              currCompany = res.body;
              done();
            });
  });


  it('should not create the company', (done) => {
    request(url)
            .post('/api/companies')
            .send(
      {
        email,
        name,
        expiration_date,
        phone_number,
      })
            .expect(400)
            .end((err, res) => {
              res.should.have.property('error');
              done();
            });
  });

  it('should get company', (done) => {
    request(url)
            .get(`/api/companies/${currCompany._id}`)
            .expect(200)
            .end((err, res) => {
              res.body.should.have.property('_id');
              done();
            });
  });

  it('should not get company', (done) => {
    request(url)
            .get(`/api/companies/${0}`)
            .expect(400)
            .end((err, res) => {
              console.log(res.body);
              res.body.should.have.property('error');
              done();
            });
  });


  it('should get all companies', (done) => {
    request(url)
            .get('/api/companies')
            .expect(200)
            .end((err, res) => {
              res.body.should.be.an.instanceof(Array);
              res.body.should.have.length.of.at.least(1);
              done();
            });
  });

  it('should update company', (done) => {
    request(url)
            .put(`/api/companies/${currCompany._id}`)
            .send(
      {
        email: new_email,
        name: new_name,
        phone_number: new_phone_number,
      },
            )
            .expect(200)
            .end((err, res) => {
              if (err) { throw (err); }
              res.body.should.have.property('email');
              res.body.email.should.equal(new_email);
              res.body.should.have.property('name');
              res.body.name.should.equal(new_name);
              res.body.should.have.property('phone_number');
              res.body.phone_number.should.equal(new_phone_number);
              done();
            });
  });

  it('should delete company', (done) => {
    request(url)
            .delete(`/api/companies/${currCompany._id}`)
            .expect(200)
            .end((err, res) => {
              res.body.should.have.property('_id');
              Company.find({ _id: currCompany._id }, (err, _) => {
                should.exist(err);
                done();
              });
            });
  });

  after((done) => {
    done();
  });
});
