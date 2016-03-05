'use strict';

/*
 * Module dependencies.
 */
var express = require('express');
var router = express.Router();
var cors = require('cors');
var session = require('express-session');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var errorHandler = require('errorhandler');
var path = require('path');
var mongoose = require('mongoose');
var socketIO = require('./socket/socket');
//var oauthserver = require('oauth2-server');
var newrelic = require('newrelic');


/*
 * App configs
 */
var config = require('./config/config');
var validate = require('./config/validation');
var winstonConfig = require("./config/winston");

/*
 * Create Express server.
 */
var app = express();

app.use(morgan('dev', {"stream": winstonConfig.stream}));

/*
 * setting up oath
 */
/*app.oauth = oauthserver({
    model: require('./models/Employee'),
    grants: ['password'],
    debug: true
});

app.all('/oauth/token', app.oauth.grant());
app.get('/secret', app.oauth.authorise(), function (req, res) {
    res.send('Secret area');
});
app.use(app.oauth.errorHandler());
*/

/*
 * Connect to MongoDB.
 */
mongoose.connect(config.mongoDBUrl);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    console.log("Connected to mongolab");
});

/*
 * Express configuration.
 */
app.set('port', config.port);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../dist')));
app.set('view engine', 'html');

app.use(cors());
require('./routes')(app);

/*
 * Disable api auth if were are in dev mode
 */
if(app.get('env') !== 'development') {
  app.use('/api/*', validate);
}

/*
 * Error Handler.
 */
app.use(errorHandler());

var server = require('http').createServer(app);
var io = require('socket.io')(server)
server.listen(app.get('port'), function() {
  console.log('Express server listening on port %d in %s mode',
    app.get('port'),
    app.get('env'));
});

/*
 * Create Socket.io server.
 */
var server = socketIO.createServer(io);

module.exports = app;
