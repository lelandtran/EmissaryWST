import form from './routes/form';
import theme from './routes/theme';
import employee from './routes/employee';
import visitorList from './routes/visitorList';
import company from './routes/company';
import appointment from './routes/appointment';
import payment from './routes/payment';
import validate from './config/validation';
import path from 'path';


export function configureRoutes(app) {
  app.use('/api/form', form);
  app.use('/api', theme);
  app.use('/api/employees', employee);
  app.use('/api/visitorLists', visitorList);
  app.use('/api/companies', company);
  app.use('/api/appointments', appointment);
  app.use('/payment', payment);

  // Disable the api auth if in development mode
  if (app.get('env') !== 'development') {
    app.use('/api/*', validate);
  }

  const VIEW_PATH = path.join(__dirname, '..', '..', 'frontend', 'static', 'views');

  app.get('/settings', (req,res) => {
    res.sendFile(`${VIEW_PATH}/settings.html`);
  });
  app.get('/admin-companies', (req,res) => {
    res.sendFile(`${VIEW_PATH}/admin-companies.html`);
  });
  app.get('/admin-dashboard', (req,res) => {
    res.sendFile(`${VIEW_PATH}/admin-dashboard.html`);
  });
  app.get('/analytics_raw', (req,res) => {
    res.sendFile(`${VIEW_PATH}/analytics_raw.html`);
  });
  app.get('/appointments', (req,res) => {
    res.sendFile(`${VIEW_PATH}/appointments.html`);
  });
  app.get('/checkin', (req,res) => {
    res.sendFile(`${VIEW_PATH}/checkin.html`);
  });
  app.get('/employees', (req,res) => {
    res.sendFile(`${VIEW_PATH}/employees.html`);
  });
  app.get('/forgot-password', (req,res) => {
    res.sendFile(`${VIEW_PATH}/forgot-password.html`);
  });
  app.get('/form-builder', (req,res) => {
    res.sendFile(`${VIEW_PATH}/form-builder.html`);
  });
  app.get('/login', (req,res) => {
    res.sendFile(`${VIEW_PATH}/login.html`);
  });
  app.get('/signup', (req,res) => {
    res.sendFile(`${VIEW_PATH}/signup.html`);
  });
  app.get('/visitors', (req,res) => {
    res.sendFile(`${VIEW_PATH}/visitors.html`);
  });
  app.get('/404', (req,res) => {
    res.sendFile(`${VIEW_PATH}/404.html`);
  });
  app.get('/admin-settings', (req,res) => {
    res.sendFile(`${VIEW_PATH}/admin-settings.html`);
  });
  app.get('/', (req,res) => {
    res.sendFile(`${VIEW_PATH}/index.html`);
  });
}

export default configureRoutes;


