/*
 * GET home page.
 */

exports.init = function func1(req, res) {
  const slack = req.app.get('slack');
  const message = `Name: ${req.param('first')} ${req.param('last')} || Appointment Time: ${req.param('appointment_time')}`;
  if (req.param('first') !== undefined) {
    slack.send({
      channel: '#checkin',
      text: message,
      username: 'CheckInBot',
    });
  }
  res.render('checkin');
};
exports.view = function func2(req, res) {
 // const slack = req.app.get('slack');

  res.render('checkin');
};
