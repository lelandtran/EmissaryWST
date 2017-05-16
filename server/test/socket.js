/**
 * Created by kevingu on 2/26/16.
 */
const io = require('socket.io-client');
const config = require('../config/config');
const Company = require('../models/Company');
const Appointment = require('../models/Appointment');
const VisitorList = require('../models/VisitorList');

const socketURL = `http://localhost:${config.port}`;

const options = {
  transports: ['websocket'],
  'force new connection': true,
};

// Constants for listening to Sockets
const VALIDATE_COMPANY_ID = 'validate_company_id';
const VISITOR_LIST_UPDATE = 'visitor_list_update';
const REMOVE_VISITOR = 'remove_visitor';
const ADD_VISITOR = 'add_visitor';
const NOTIFY_ERROR = 'notify_error';


describe('Visitor List Socket', () => {
  let currCompany;
  let currVisitorList;
  let appointment1;
  let appointment2;
  let visitor1;
  let client1;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = today.setDate(today.getDate() + 1);

    // info for the company
  const company_info = {
    email: 'test@test.edu',
    credit_card_number: '1231231241251',
    name: 'test',
    expiration_date: '6/17',
    phone_number: '1234567890',
    paid_time: new Date(),
  };

    // info for first visitor
  const first_visitor_info = {
    first_name: 'test1',
    last_name: 'test1',
    phone_number: '1234567890',
    checkin_time: new Date(),
    additional_info: {
      allergies: 'peanuts',
    },
  };

    // info for second visitor
  const second_visitor_info = {
    first_name: 'test2',
    last_name: 'test2',
    phone_number: '1234567890',
    checkin_time: new Date(),
    additional_info: {
      allergies: 'seafood',
    },
  };

    // info for visitor_one's appointment
  const first_appointment_info = {
    first_name: first_visitor_info.first_name,
    last_name: first_visitor_info.last_name,
    phone_number: first_visitor_info.phone_number,
    date: new Date(),
    provider_name: 'provider1',
  };

    // info for visitor_two's appointment
  const second_appointment_info = {
    first_name: second_visitor_info.first_name,
    last_name: second_visitor_info.last_name,
    phone_number: second_visitor_info.phone_number,
    date: tomorrow,
    provider_name: 'provider2',
  };

  before((done) => {
    currCompany = new Company();
    currCompany.email = company_info.email;
    currCompany.credit_card_number = company_info.credit_card_number;
    currCompany.name = company_info.name;
    currCompany.expiration_date = company_info.expiration_date;
    currCompany.phone_number = company_info.phone_number;
    currCompany.paid_time = company_info.paid_time;
    currCompany.save((err, c) => {
      if (err) throw (err);
      currCompany = c;
      appointment1 = new Appointment();
      appointment1.first_name = first_appointment_info.first_name;
      appointment1.last_name = first_appointment_info.last_name;
      appointment1.phone_number = first_appointment_info.phone_number;
      appointment1.date = first_appointment_info.date;
      appointment1.company_id = c._id;
      appointment1.provider_name = first_appointment_info.provider_name;
      appointment1.save((err, a1) => {
        if (err) throw (err);
        appointment1 = a1;
        appointment2 = new Appointment();
        appointment2.first_name = second_appointment_info.first_name;
        appointment2.last_name = second_appointment_info.last_name;
        appointment2.phone_number = second_appointment_info.phone_number;
        appointment2.date = second_appointment_info.date;
        appointment2.company_id = c._id;
        appointment2.provider_name = second_appointment_info.provider_name;
        appointment2.save((err, a2) => {
          if (err) throw (err);
          appointment2 = a2;
          client1 = io.connect(socketURL, options);
          client1.once('connect', () => {
            client1.emit(VALIDATE_COMPANY_ID, { company_id: currCompany._id });
            client1.on(VISITOR_LIST_UPDATE, updateList = function (data) {
              client1.removeListener(VISITOR_LIST_UPDATE, updateList);
              done();
            });
          });
        });
      });
    });
  });

  it('Should add visitors to List', (done) => {
    const client2 = io.connect(socketURL, options);
    client2.once('connect', () => {
      first_visitor_info.company_id = currCompany._id;
      client2.emit(VALIDATE_COMPANY_ID, { company_id: currCompany._id });
      client2.on(VISITOR_LIST_UPDATE, (data) => {
        data.should.have.property('_id');
        client2.emit(ADD_VISITOR, first_visitor_info);
        client1.on(VISITOR_LIST_UPDATE, updateList = function (data) {
          data.should.have.property('_id');
          data.should.have.property('visitors');
          data.should.have.property('company_id');
          const visitors = data.visitors;
          visitors.should.be.an.instanceof(Array);
          visitors.should.have.length.of(1);
          visitor1 = visitors[0];

          visitor1.should.have.property('_id');
          visitor1.should.have.property('company_id');
          visitor1.should.have.property('first_name');
          visitor1.should.have.property('last_name');
          visitor1.should.have.property('phone_number');
          visitor1.should.have.property('checkin_time');

          visitor1.should.have.property('appointments');
          visitor1.appointments.should.be.an.instanceof(Array);
          visitor1.appointments.should.have.length.of.at.least(1);

          visitor1.should.have.property('additional_info');
          visitor1.additional_info.should.have.property('allergies');

          currVisitorList = data;

                    // clean up
          client1.removeListener(VISITOR_LIST_UPDATE, updateList);
          client2.disconnect();
          done();
        });
      });
    });
  });

  it('Should get visitors from list', (done) => {
    client1.emit(VISITOR_LIST_UPDATE, { company_id: currCompany._id });
    client1.on(VISITOR_LIST_UPDATE, updateList = function (data) {
      data.should.have.property('_id');
      data.should.have.property('visitors');
      data.should.have.property('company_id');
      const visitors = data.visitors;
      visitors.should.be.an.instanceof(Array);
      visitors.should.have.length.of(1);
      visitor1 = visitors[0];

      visitor1.should.have.property('_id');
      visitor1.should.have.property('company_id');
      visitor1.should.have.property('first_name');
      visitor1.should.have.property('last_name');
      visitor1.should.have.property('phone_number');
      visitor1.should.have.property('checkin_time');

      visitor1.should.have.property('appointments');
      visitor1.appointments.should.be.an.instanceof(Array);
      visitor1.appointments.should.have.length.of(1);

      visitor1.should.have.property('additional_info');
      visitor1.additional_info.should.have.property('allergies');

                // cleanup listener
      client1.removeListener(VISITOR_LIST_UPDATE, updateList);
      done();
    });
  });

  it('remove visitor from list', (done) => {
    client1.emit(REMOVE_VISITOR, { company_id: currCompany._id,
      visitor_id: visitor1._id });
    client1.on(VISITOR_LIST_UPDATE, updateList = function (data) {
      data.should.have.property('_id');
      data.should.have.property('visitors');
      data.should.have.property('company_id');
      const visitors = data.visitors;
      visitors.should.be.an.instanceof(Array);
      visitors.should.have.length.of(0);
            // cleanup listener
      client1.removeListener(VISITOR_LIST_UPDATE, updateList);
      done();
    });
  });

  after((done) => {
    Appointment.remove({ _id: appointment1._id }, (err, _) => {
      if (err) throw (err);
      Appointment.remove({ _id: appointment2._id }, (err, _) => {
        if (err) throw (err);
        Company.remove({ _id: currCompany._id }, (err, _) => {
          if (err) throw (err);
          VisitorList.remove({ _id: currVisitorList._id }, (err, _) => {
            if (err) throw (err);
            client1.disconnect();
            done();
          });
        });
      });
    });
  });
});
