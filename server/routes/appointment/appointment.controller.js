'use strict';

/*This module is meant to house the functions
 * used by the authorization (auth) API. The
 * actual API is set up in index.js

 Functions:
 authSignup()
 authLogin()
 authResetCredentials()
 */


/* need this to enable cross origin resource sharing.If disabled, we might
 * not need this later. This is just to get the example to work
 * when front end is served from a something other than our app server.
 */
var Appointment = require('../../models/Appointment');

/****** Company TEMPLATE ROUTES ******/
module.exports.template = {};

/**
 * @api {post} /api/appointments Create an appointment for the visitor
 * @apiName create
 * @apiGroup appointments
 *
 * @apiParam {String} first_name Visitor's first name
 * @apiParam {String} last_name Visitor's last name
 * @apiParam {String} phone_number Visitor's phone number
 * @apiParam {String} date Visitor's visit date
 * @apiParam {String} company_id Visitor's company id
 * @apiParam {String} provider_name Visitor's provider name
 *
 * @apiSuccess {String} _id User ID
 * @apiSuccess {String} first_name Visitor's first name
 * @apiSuccess {String} last_name Visitor's last name
 * @apiSuccess {String} phone_number Visitor's phone number
 * @apiSuccess {String} date Visitor's visit date
 * @apiSuccess {String} company_id Visitor's company id
 * @apiSuccess {String} provider_name Visitor's provider name
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *    _id : "12314125",
 *    first_name : "test",
 *    last_name : "test",
 *    phone_number : "0123456789",
 *    date : "2016-04-23T18:25:43.511Z",
 *    company_id : "12314125",
 *    provider_name : "test test"
 * }
 *
 * @apiErrorExample {json} Error-Response:
 *   {
 *     err: "Already created"
 *   }
 */
module.exports.template.create = function(req, res) {
    var appointment = new Appointment();
    var param = req.body;

    //require provided info
    appointment.first_name = param.first_name;
    appointment.last_name = param.last_name;
    appointment.phone_number = param.phone_number;
    appointment.date = param.date;
    appointment.company_id = param.company_id;
    appointment.provider_name = param.provider_name;

    Appointment.find(
        {
            company_id:param.company_id,
            date:param.date
        }, function(err, appointments){
            if(err) return res.status(400).json({error: "Could Not Find"});
            if(appointments.length==0) {
                appointment.save(function (err, a) {
                    if (err)
                        return res.status(400).json({error: "Could Not Save"});
                    return res.status(200).json(a);
                });
            }else{
                return res.status(400).json({error: "Already Created"});
            }
        });
};

/**
 * @api {post} /api/appointments Create an appointment for the visitor
 * @apiName create
 * @apiGroup appointments
 *
 * @apiParam {String} first_name Visitor's first name
 * @apiParam {String} last_name Visitor's last name
 * @apiParam {String} phone_number Visitor's phone number
 * @apiParam {String} date Visitor's visit date
 * @apiParam {String} company_id Visitor's company id
 * @apiParam {String} provider_name Visitor's provider name
 *
 * @apiSuccess {String} _id User ID
 * @apiSuccess {String} first_name Visitor's first name
 * @apiSuccess {String} last_name Visitor's last name
 * @apiSuccess {String} phone_number Visitor's phone number
 * @apiSuccess {String} date Visitor's visit date
 * @apiSuccess {String} company_id Visitor's company id
 * @apiSuccess {String} provider_name Visitor's provider name
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *    _id : "12314125",
 *    first_name : "test",
 *    last_name : "test",
 *    phone_number : "0123456789",
 *    date : "2016-04-23T18:25:43.511Z",
 *    company_id : "12314125",
 *    provider_name : "test test"
 * }
 *
 * @apiErrorExample {json} Error-Response:
 *   {
 *     err: "Already created"
 *   }
 */
module.exports.template.getAll = function(req, res) {
    Appointment.find({company_id: req.params.id}, function(err, result){
            if(err){
                return res.status(400).json(err);
            }
            return res.status(200).json(result);
        });
};

/**
 * @api {get} /api/appointments/:id Gets an appointment
 * @apiName get
 * @apiGroup appointments
 *
 * @apiSuccess {String} _id Appointment ID
 * @apiSuccess {String} first_name Visitor's first name
 * @apiSuccess {String} last_name Visitor's last name
 * @apiSuccess {String} phone_number Visitor's phone number
 * @apiSuccess {String} date Visitor's visit date
 * @apiSuccess {String} company_id Visitor's company id
 * @apiSuccess {String} provider_name Visitor's provider name
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 * 	  _id : "12314125",
 *    first_name : "test",
 *    last_name : "test",,
 *    phone_number : "0123456789",
 *    date : "2016-04-23T18:25:43.511Z",
 *    company_id : "12314125",
 *    provider_name : "test test"
 * }
 *
 * @apiErrorExample {json} Error-Response:
 *   {
 *     err: "Can't find"
 *   }
 */
module.exports.template.get = function(req, res) {
    Appointment.findOne({_id: req.params.id}, function(err, a) {
        if(err || !a)
            return res.status(400).send({error: "Could Not Find"});
        return res.status(200).json(a);
    });
};

/**
 * @api {put} /api/appointments/:id Updates an appointment
 * @apiName update
 * @apiGroup appointments
 *
 * @apiSuccess {String} _id Appointment ID
 * @apiSuccess {String} first_name Visitor's first name
 * @apiSuccess {String} last_name Visitor's last name
 * @apiSuccess {String} phone_number Visitor's phone number
 * @apiSuccess {String} date Visitor's visit date
 * @apiSuccess {String} company_id Visitor's company id
 * @apiSuccess {String} provider_name Visitor's provider name
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 * 	  _id : "12314125",
 *    first_name : "test",
 *    last_name : "test",,
 *    phone_number : "0123456789",
 *    date : "2016-04-23T18:25:43.511Z",
 *    company_id : "12314125",
 *    provider_name : "test test"
 * }
 *
 * @apiErrorExample {json} Error-Response:
 *   {
 *     err: "Already created"
 *   }
 */
module.exports.template.update = function(req, res){
    Appointment.findOne({_id: req.params.id}, function (err, a) {
        if(err || !a)
            return res.status(401).json({error: "Could Not Find"});

        if (req.body.first_name !== undefined)
            a.first_name = req.body.first_name;

        if (req.body.last_name !== undefined)
            a.last_name = req.body.last_name;

        if (req.body.phone_number !== undefined)
            a.phone_number  = req.body.phone_number ;

        if (req.body.date!== undefined)
            a.date = req.body.date;
        if (req.body.provider_name!== undefined)
            a.provider_name = req.body.provider_name;
        //TODO check if the date is taken already
        a.save(function(err) {
            if(err) {
                return res.status(400).json({error: "Could Not Save"});
            }
            return res.status(200).json(a);
        });
    });
};

/**
 * @api {delete} /api/appointments/:id Updates an appointment
 * @apiName update
 * @apiGroup appointments
 *
 * @apiSuccess {String} _id Appointment ID
 * @apiSuccess {String} first_name Visitor's first name
 * @apiSuccess {String} last_name Visitor's last name
 * @apiSuccess {String} phone_number Visitor's phone number
 * @apiSuccess {String} old_date Visitor's old appointment date
 * @apiSuccess {String} new_date Visitor's new appointment date
 * @apiSuccess {String} company_id Visitor's company id
 * @apiSuccess {String} provider_name Visitor's provider name
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 * 	  _id : "12314125",
 *    first_name : "test",
 *    last_name : "test",,
 *    phone_number : "0123456789",
 *    old_date : "2016-04-23T18:25:43.511Z",
 *    new_date : "2016-04-23T18:25:43.511Z",
 *    company_id : "12314125",
 *    provider_name : "test test"
 * }
 *
 * @apiErrorExample {json} Error-Response:
 *   {
 *     err: "Already created"
 *   }
 */
module.exports.template.delete = function(req, res){
    Appointment.findById(req.params.id, function(err, a) {
        if(err)
            res.status(400).json({error: "Could Not Find"});
        a.remove(function(err) {
            if(err) {
                res.status(400).json({error: "Could Not Save"});
            } else {
                return res.status(200).json(a);
            }
        });
    });
};
