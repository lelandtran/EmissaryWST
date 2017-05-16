const request = require('supertest');

const config = require('../config/config');
const should = require('chai').should();

// Wrapper that creates admin user to allow api calls
const ConfigureAuth = require('./ConfigureAuth');


describe('Employee', () => {
  const url = `localhost:${config.port}`;

  let credentials;  // variable to hold all the need authentication variables.

        // before function is called at the very beginning of the 'Forms' test suite,
        // no tests are run until the done() callback is called.
  before((done) => {
            // setupAdmin will create and admin and log you in, give it a callback that will give you
            // the credentials you need. Make sure to call done() inside ConfigureAuth's callback!
    ConfigureAuth.setupAdmin((cred) => {
      credentials = cred;
      done();
    });
  });

  const templateFormId = null;


  describe('Employee Testing', () => {
            // TEST POST
    describe('POST /api/employees', () => {
      it('should save submitted employee', (done) => {
        request(url)
                        .post('/api/employees')
                        .query({ email: credentials.email, token: credentials.token })
                        .send({
                          company_id: credentials.admin._id,
                          first_name: 'John',
                          last_name: 'Smith',
                          email: 'jt@tomcruise.com',
                          phone_number: '123456789',
                          role: 'c_admin',
                          password: 'test',
                        })
                        .end((err, res) => {
                          if (err) { throw (err); }
                          res.body.should.have.property('first_name').and.be.equal('John');
                          res.body.should.have.property('email').and.be.equal('jt@tomcruise.com');
                          res.body.should.not.have.property('password');
                          returnedId = res.body._id;
                          done();
                        });
      });
    });
    describe('Login', () => {
      it('Should login with employee data', (done) => {
        request(url)
                        .post('/api/employees/login')
                            .send(
          {
            email: 'jt@tomcruise.com',
            password: 'test',
          },
                            )
                            .end((err, res) => {
                              if (err) throw (err);
                              res.body.should.have.property('_id');
                              res.body.should.not.have.property('password');
                              done();
                            });
      });
      it('Should not login with employee data', (done) => {
        request(url)
                        .post('/api/employees/login')
                        .send(
          {
            email: 'jt@tomcruise.com',
            password: 'incorrect',
          },
                        )
                        .end((err, res) => {
                          if (err) throw (err);
                          res.body.should.have.property('error');

                          done();
                        });
      });
      it('Should update the employee data', (done) => {
        request(url)
                        .put(`/api/employees/${returnedId}`)
                        .query({ email: credentials.email, token: credentials.token })
                        .send({
                          _admin_id: credentials.admin._id,
                          password: 'new_password',
                        })
                        .end((err, res) => {
                          if (err) { throw (err); }

                          res.body.should.have.property('email');
                          res.body.should.have.property('phone_number');
                          res.body.should.not.have.property('password');
                          done();
                        });
      });
      it('Should login with new password', (done) => {
        request(url)
                        .post('/api/employees/login')
                        .send(
          {
            email: 'jt@tomcruise.com',
            password: 'new_password',
          },
                        )
                        .end((err, res) => {
                          if (err) throw (err);
                          res.body.should.have.property('email');
                          res.body.should.have.property('phone_number');
                          res.body.should.not.have.property('password');
                          done();
                        });
      });
    });

            // TEST PUT
    describe('PUT /api/employee/:id', () => {
      it('Should update the employee data', (done) => {
        request(url)
                        .put(`/api/employees/${returnedId}`)
                        .query({ email: credentials.email, token: credentials.token })
                        .send({
                          _admin_id: credentials.admin._id,
                          email: 'updated_email@tomcruise.com',
                          phone_number: '987654321',
                        })
                        .end((err, res) => {
                          if (err) { throw (err); }

                          res.body.should.have.property('email').and.be.equal('updated_email@tomcruise.com');
                          res.body.should.have.property('phone_number').and.be.equal('987654321');
                          res.body.should.not.have.property('password');
                          done();
                        });
      });
    });

            // TEST GET ALL EMPLOYEES
    describe('GET /api/employees/company/:id', () => {
      it('should return all employees', (done) => {
        request(url)
                        .get(`/api/employees/company/${credentials.admin._id}`)
                        .send({
                          _admin_id: credentials.admin._id,
                        })
                        .end((err, res) => {
                            // console.log("RESPONSE", res)
                          res.body.should.be.instanceof(Object);
                            // res.body.should.not.be.empty;
                          res.body.should.not.be.empty();
                            // res.body.should.exist;
                          should.exist(res.body);
                          res.body.should.have.length.of(1);
                          res.body.should.be.an.instanceof(Array);
                          res.body[0].should.not.have.property('password');
                          done();
                        });
      });
    });

            // TEST GET A SPECIFIC EMPLOYEE
    describe('GET /api/employees/:id', () => {
      it('should return a specific employee', (done) => {
        request(url)
                        .get(`/api/employees/${returnedId}`)
                        .query({ email: credentials.email, token: credentials.token })
                        .end((err, res) => {
                          res.body.should.have.property('_id');
                          res.body.should.have.property('email');
                          res.body.should.have.property('first_name');
                          res.body.should.have.property('last_name');
                          res.body.should.have.property('phone_number');
                          res.body.should.not.have.property('password');
                          res.body.should.be.instanceof(Object);

                          res.body._id.should.equal(returnedId);
                          done();
                        });
      });
    });

            // TEST DELETE
    describe('DELETE /api/employees/:id', () => {
      it('Should delete the employee data', (done) => {
        request(url)
                        .delete(`/api/employees/${returnedId}`)
                        .query({ email: credentials.email, token: credentials.token })
                        .end((err, res) => {
                          res.body.should.have.property('_id');
                          res.body.should.not.have.property('password');
                          done();
                        });
      });
    });
  });


  after((done) => {
    ConfigureAuth.cleanupAuth(credentials.email, done);
  });
},
);
