let winston = require('winston'),
  fs = require('fs'),
  path = require('path'),
  logDir = path.join(process.cwd(), '/server/log/');

winston.emitErrs = true;

/* Create log dir if it doesn't exist */
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

/* configure logger. One transport for file logging
 * and another to get console output.
 */
const logger = new winston.Logger({
  transports: [
    new winston.transports.DailyRotateFile({
      level: 'info',
      datePattern: ('.yyyy-MM-dd' + '.log'),
      filename: path.join(logDir, 'logs'),
      handleExceptions: true,
      json: false,
      maxsize: 5242880,
      maxFiles: 10,
      colorize: false,
    }),
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
    }),
  ],
  exitOnError: false,
});

logger.stream = {
  write(message, encoding) {
    logger.info(message);
  },
};

module.exports = logger;
