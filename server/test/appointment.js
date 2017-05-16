/**
 * Created by kevingu on 2/21/16.
 */
const request = require('supertest');
const config = require('../config/config');
const Appointment = require('../models/Appointment');
const Company = require('../models/Company');

describe('Appointment Test', () => {
  const url = `localhost:${config.port}`;
  let token;
  let currAppointment;
  let currCompany;

    // old appointment info
  const first_name = 'test';
  const last_name = 'test';
  var phone_number = '1234567890';
  const date = '2016-04-23T18:25:43.511Z';
  const provider_name = 'test test';

    // new appointment info
  const new_first_name = 'test1';
  const new_last_name = 'test1';
  const new_phone_number = '1231267890';
  const new_date = '2016-03-23T18:25:43.511Z';
  const new_provider_name = 'test1 test1';

    // company info
  const email = 'new@test.edu';
  const credit_card_number = '1231231241251';
  const name = 'test';
  const expiration_date = '6/17';
  var phone_number = '1234567890';

  const userID = null;


  before((done) => {
        // setup company
    const company = new Company();
    company.email = email;
    company.credit_card_number = credit_card_number;
    company.name = name;
    company.expiration_date = expiration_date;
    company.phone_number = phone_number;
    company.paid_time = new Date();

    company.save((err, c) => {
      currCompany = c;
      request(url)
                .post('/api/appointments')
                .send(
        {
          first_name,
          last_name,
          phone_number,
          date,
          company_id: currCompany._id,
          provider_name,
        },
                )
                .expect(200)
                .end((err, res) => {
                  res.body.should.have.property('_id');
                  currAppointment = res.body;
                  done();
                });
    });
  });


  it('should not create the appointment', (done) => {
    request(url)
            .post('/api/appointments')
            .send(
      {
        first_name: new_first_name,
        last_name: new_last_name,
        phone_number: new_phone_number,
        date: new_date,
        company_id: currCompany._id,
        provider_name: new_provider_name,
      },
            )
            .expect(400)
            .end((err, res) => {
              res.should.have.property('error');
              done();
            });
  });

  it('should get appointment', (done) => {
    request(url)
            .get(`/api/appointments/${currAppointment._id}`)
            .expect(200)
            .end((err, res) => {
              res.body.should.have.property('_id');
              done();
            });
  });

  it('should not get appointment', (done) => {
    request(url)
            .get(`/api/appointments/${0}`)
            .expect(400)
            .end((err, res) => {
              console.log(res.body);
              res.body.should.have.property('error');
              done();
            });
  });


  it('should get all appointments', (done) => {
    request(url)
            .get(`/api/appointments/company/${currCompany._id}`)
            .expect(200)
            .end((err, res) => {
              res.body.should.be.an.instanceof(Array);
              done();
            });
  });

  it('should update appointment', (done) => {
    request(url)
            .put(`/api/appointments/${currAppointment._id}`)
            .send(
      {
        first_name: new_first_name,
        last_name: new_last_name,
        phone_number: new_phone_number,
        date: new_date,
        provider_name: new_provider_name,
      },
            )
            .expect(200)
            .end((err, res) => {
              if (err) { throw (err); }
              res.body.should.have.property('first_name');
              res.body.first_name.should.equal(new_first_name);
              res.body.should.have.property('last_name');
              res.body.last_name.should.equal(new_last_name);
              res.body.should.have.property('phone_number');
              res.body.phone_number.should.equal(new_phone_number);
              res.body.should.have.property('date');
              res.body.date.should.equal(new_date);
              res.body.should.have.property('provider_name');
              res.body.provider_name.should.equal(new_provider_name);
              done();
            });
  });

  it('should delete appointment', (done) => {
    request(url)
            .delete(`/api/appointments/${currAppointment._id}`)
            .expect(200)
            .end((err, res) => {
              res.body.should.have.property('_id');
              Appointment.find({ _id: currAppointment._id }, (err, _) => {
                should.exist(err);
                done();
              });
            });
  });

  after((done) => {
    Company.remove({ email }, (err, c) => {
      done();
    });
  });
});
