import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import errorHandler from 'errorhandler';
import path from 'path';
import http from 'http';
import socketIO from './socket/socket';
import socketIOInitialize from 'socket.io';
import stripeInitializer from 'stripe';
import slackHookInitializer from 'slack-notify';
import config from './config/config';
import winstonConfig from './config/winston';
import configureRoutes from './routes';
import connectToDatabase from './database';

// Stripe
const MY_STRIPE_TEST_KEY = 'sk_test_dqzYJJ6xWGgg6U1hgQr3hNye';
const stripe = stripeInitializer(MY_STRIPE_TEST_KEY);

// Slack
const MY_SLACK_WEBHOOK_URL = 'https://hooks.slack.com/services/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';
const slack = slackHookInitializer(MY_SLACK_WEBHOOK_URL);


// Initialize the express server object (app) and configure it
const app = express();

// Set the port
app.set('port', config.port);

// Allow parsing of the HTTP body with JSON format
app.use(bodyParser.json());

// Allow parsing of the HTTP body with urlencoded format
app.use(bodyParser.urlencoded({ extended: true }));

// Point static content serving
app.use(express.static(path.join(__dirname, '../frontend')));
app.use('/static', express.static(path.join(__dirname, '..', '..', 'frontend', 'static')));

// Set view engine
app.set('view engine', 'html');

// Set up Cross-origin resource sharing (CORS)
app.use(cors());

// Use morgan for logging
app.use(morgan('dev', {"stream": winstonConfig.stream}));

// Set up error handling
app.use(errorHandler());

// Add middleware that removes .html endings from url paths
app.use((req, res, next) => {
    if (req.path.substr(-5) === '.html' && req.path.length > 1) {
        var query = req.url.slice(req.path.length);
        res.redirect(301, req.path.slice(0, -5) + query);
        //res.sendFile(path.join(__dirname,'../dist/assets/views/checkin.html'))
    } else {
        next();
    }
});


// Connect to the database
connectToDatabase();

// Set the routes
configureRoutes(app);

// Create an http server with the express server application
const server = http.createServer(app);

const io = socketIOInitialize(server);
server.listen(app.get('port'), () => {
  console.log('Express server listening on port %d in %s mode',
    app.get('port'),
    app.get('env')
  );
});

// Create Socket.io server.
socketIO.createServer(io);


export default app;
