'use strict';

/*
 * This module is meant to house all of the API
 * routes that pertain to users
 */
var exports = module.exports;

var Employee = require('../../models/Employee');


/**
 * @api {post} /api/employees/login Employee Login
 * @apiName login
 * @apiGroup employees
 *
 * @apiParam {String} email Employee's email
 * @apiParam {String} password Employee's password
 *
 * @apiSuccess {String} _id User ID
 * @apiSuccess {String} first_name User's first name
 * @apiSuccess {String} last_name User's last name
 * @apiSuccess {String} email User's email
 * @apiSuccess {String} phone_number User's phone number
 * @apiSuccess {String} company_id Company ID
 * @apiSuccess {String} role User's role
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *  	_id : "12314125",
 *  	first_name : "test",
 *      last_name : "test",
 *  	email : "test@yahoo.com",
 *  	phone_number : "6581922344",
 *  	company_id : "123124124",
 *  	role : "a_admin"
 * }
 *
 * @apiErrorExample {json} Error-Response:
 *   {
 *     error: "Incorrect Credentials"
 *   }
 */
exports.login = function(req, res) {
    Employee.findOne({email:req.body.email}, function(err, e) {
        if(err || !e){
          return res.status(400).send({error: "Can not Find"});
        }
        if(!e.validPassword(req.body.password))
          return res.status(400).send({error: "Incorrect Credentials"});
        var employee_json=e.toJSON();
        delete employee_json.password;
        return res.status(200).json(employee_json);
    });
};


/**
 * @api {get} /api/employees/company/:id Gets all employees
 * @apiName getAllEmployees
 * @apiGroup employees
 *
 * @apiSuccess {String} _id User ID
 * @apiSuccess {String} email User's email
 * @apiSuccess {String} phone_number User's phone number
 * @apiSuccess {String} company_id Company ID
 * @apiSuccess {String} role User's role
 *
 * @apiSuccessExample {json} Success-Response:
 *{
 * 	{
 * 		id : "12314125",
 * 		email: "test@yahoo.com",
 * 		phone_number: "6581922344"
 * 		role: "a_admin",
 * 		company_id: "12314125"
 * 	},
 * 	{
 * 		id : "12314125",
 * 		email: "test@yahoo.com",
 * 		phone_number: "6581922344"
 * 		role: "a_admin",
 * 		company_id: "12314125"
 * 	}
 *}
 *
 * @apiErrorExample {json} Error-Response:
 *   {
 *     error: "Incorrect Credentials"
 *   }
 */
exports.getAllEmployees = function(req, res) {
  Employee.find({company_id : req.params.id}, { password: 0}, function(err, result) {
    if(err){
      return res.status(400).send({error: "Can not Find"});
    }
    return res.status(200).json(result);
  });
};

/**
 * @api {get} /api/employees/:id Get Employee
 * @apiName get
 * @apiGroup employees
 *
 * @apiParam {String} id Employee ID
 *
 * @apiSuccess {String} _id User ID
 * @apiSuccess {String} first_name User's first name
 * @apiSuccess {String} last_name User's last name
 * @apiSuccess {String} email User's email
 * @apiSuccess {String} phone_number User's phone number
 * @apiSuccess {String} company_id Company ID
 * @apiSuccess {String} role User's role
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *  	_id : "12314125",
 *  	first_name : "test",
 *      last_name : "test",
 *  	email : "test@yahoo.com",
 *  	phone_number : "6581922344",
 *  	company_id : "123124124",
 *  	role : "a_admin"
 * }
 *
 * @apiErrorExample {json} Error-Response:
 *   {
 *     error: "Incorrect Credentials"
 *   }
 */
exports.getById = function(req, res) {
   Employee.findById(req.params.id, { password: 0}, function(err, employee) {
      if(err) {
          return res.status(400).json({error: "Can not Find"});
      } else {
          console.log(employee)
          return res.status(200).json(employee);
      }
    });
};

/**
 * @api {post} /api/employees Creates employee
 * @apiName create
 * @apiGroup employees
 *
 * @apiParam {String} first_name User's first name
 * @apiParam {String} last_name User's last name
 * @apiParam {String} email User's email
 * @apiParam {String} password Employee's password
 * @apiParam {String} phone_number User's phone number
 * @apiParam {String} company_id Company ID
 * @apiParam {String} role User's role
 *
 * @apiSuccess {String} _id User ID
 * @apiSuccess {String} first_name User's first name
 * @apiSuccess {String} last_name User's last name
 * @apiSuccess {String} email User's email
 * @apiSuccess {String} phone_number User's phone number
 * @apiSuccess {String} company_id Company ID
 * @apiSuccess {String} role User's role
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *  	_id : "12314125",
 *  	first_name : "test",
 *      last_name : "test",
 *  	email : "test@yahoo.com",
 *  	phone_number : "6581922344",
 *  	company_id : "123124124",
 *  	role : "a_admin"
 * }
 *
 * @apiErrorExample {json} Error-Response:
 *   {
 *     error: "email taken"
 *   }
 */
exports.insert = function(req, res) {
    var employee = new Employee();

    /* required info */
    employee.first_name = req.body.first_name;
    employee.last_name = req.body.last_name;
    employee.email = req.body.email,
    employee.phone_number  = req.body.phone_number,
    employee.company_id = req.body.company_id,
    employee.password = employee.generateHash(req.body.password),
    employee.role =  req.body.role

    employee.save(function(err, e) {
        if(err) {
            return res.status(400).json({error: "Can not Save"});
        }
        var employee_json=e.toJSON();
        delete employee_json.password;
        return res.status(200).json(employee_json);
    });
};


/**
 * @api {put} /api/employees Updates employee
 * @apiName update
 * @apiGroup employees
 *
 * @apiParam {String} first_name User's first name
 * @apiParam {String} last_name User's last name
 * @apiParam {String} email User's email
 * @apiParam {String} password Employee's password
 * @apiParam {String} phone_number User's phone number
 * @apiParam {String} role User's role
 *
 * @apiSuccess {String} _id User ID
 * @apiSuccess {String} email User's email
 * @apiSuccess {String} phone_number User's phone number
 * @apiSuccess {String} company_id Company ID
 * @apiSuccess {String} role User's role
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *  	_id : "12314125",
 *  	email : "test@yahoo.com",
 *  	phone_number : "6581922344",
 *  	company_id : "123124124",
 *  	role : "a_admin"
 * }
 *
 * @apiErrorExample {json} Error-Response:
 *   {
 *     error: "Incorrect Credentials"
 *   }
 */
exports.update = function(req, res) {
    Employee.findById(req.params.id, function (err, employee) {
        if(err)
            return res.status(400).json({error: "Can not Update"});
 
        employee.first_name = req.body.first_name || employee.first_name;
        employee.last_name = req.body.last_name || employee.last_name;
        employee.email = req.body.email || employee.email;
        employee.phone_number = req.body.phone_number || employee.phone_number;
        employee.password = employee.generateHash(req.body.password) || employee.password;
        employee.role = req.body.role || employee.role;

        employee.save(function(err) {
            console.log(err);
            console.log(employee);
            if(err)
                return res.status(400).json({error: "Can not Save"});
            var employee_json=employee.toJSON();
            delete employee_json.password;
            return res.status(200).send(employee_json);
        });
   });
};

/**
 * @api {delete} /api/employees Deletes employee
 * @apiName delete
 * @apiGroup employees
 *
 * @apiParam {String} id Employee's id
 *
 * @apiSuccess {String} _id User ID
 * @apiSuccess {String} email User's email
 * @apiSuccess {String} phone_number User's phone number
 * @apiSuccess {String} company_id Company ID
 * @apiSuccess {String} role User's role
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *  	_id : "12314125",
 *  	email : "test@yahoo.com",
 *  	phone_number : "6581922344",
 *  	company_id : "123124124",
 *  	role : "a_admin"
 * }
 *
 * @apiErrorExample {json} Error-Response:
 *   {
 *     error: "Incorrect Credentials"
 *   }
 */
exports.delete = function(req, res) {
  Employee.findById(req.params.id, function(err, employee) {
    return employee.remove(function(err) {
      if(err) {
        res.status(400).json({error: "Can not Find"});
      } else {
          var employee_json=employee.toJSON();
          delete employee_json.password;
          return res.status(200).send(employee_json);
      }
    });
  });
};
