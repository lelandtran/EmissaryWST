/**
 * Main application routes
 */


module.exports = function (app) {
  const r = require;
  app.use(r('./routes/home'));
  app.use('/api/form', r('./routes/form'));
  app.use('/api', r('./routes/theme'));
  app.use('/api/employees', r('./routes/employee'));
  app.use('/api/visitorLists', r('./routes/visitorList'));
  app.use('/api/companies', r('./routes/company'));
  app.use('/api/appointments', r('./routes/appointment'));
  app.use('/payment', r('./routes/payment'));
};
