#WebstormTroopers
##1. Getting Started

###1.1 List of Requirements
1. [Node Js](http://nodejs.org) (http://nodejs.org)
2. [MongoDb](https://www.mongodb.org) (https://www.mongodb.org)
3. [HandleBars](http://handlebarsjs.com) (http://handlebarsjs.com/)
4. [Jquery](https://jquery.com/)(https://jquery.com/)

###1.2 Instructions
**Step 1:** Clone our project on [Github](https://github.com/thiefjack/WebStormTroopers)(https://github.com/thiefjack/WebStormTroopers)

**Step 2:** run **npm install** in the directory of the project to install the dependency for the backend

**Step 3:** run **gulp test:backend** to test the backend api, all the tests should pass

**Step 4:** run **gulp test:frontend** to test the frontend dependecies, all the tests should pass

**Step 5:** run **npm start** to start the application

##1.3 Workflow
We used codeship to manage our build process and our production code is on heroku


##Emissary Server API
## Overview
App is on heroku, http://webstormtroopers.herokuapp.com/

200 : success

400 : Incorrect values

404 : Not Found

Assumption is that there will be system that provides our application with the appointment information

##1. Company 
###Create
#####Post /api/companies

**required**

	name
	email
	phone_number

####Responses
**Success**

	{
		_id : "12314125"
		name : "test",
		email : "test",
		phone_number : "0123456789",
		paid_time: "2016-04-23T18:25:43.511Z",
		
	}
**Error**
	
	{
		error: "email taken"
	}
	
###Get
#####Get /api/companies/:id
	
####Responses
**Success**
	
	{
		_id : "12314125",
		name : "test",
		email : "test",
		phone_number : "0123456789",
		paid_time: "2016-04-23T18:25:43.511Z"
	}
	
**Error**
	
	{
		error: "Incorrect credentials"
	}
	
###Get All Companies
only certain type of users can get this information
#####Get /api/companies
	
####Responses
**Success**

	{			
		{
			_id : "12314125",
			name : "test",
			email : "test",
			phone_number : "0123456789",
			paid_time: "2016-04-23T18:25:43.511Z"
		},
		{
			_id : "123112325",
			name : "test",
			email : "test",
			phone_number : "0123456789",
			paid_time: "2016-04-23T18:25:43.511Z"
		}
	}

**Error**
	{
		err: "Incorrect Crenditials"
	}	

###Update 
renewing subscription of companies
#####Put /api/companies/:id


**optional**

	name
	credit_card_number
	expiration_date
	email
	phone_number

####Responses
**Success**

	{
		_id : "123112325",
		name : "test",
		email : "test",
		phone_number : "0123456789",
		paid_time: "2016-04-23T18:25:43.511Z"
	}
	
**Error**

	{
		error: "incorrect parameters"
	}
	
###Delete
####Delete /api/companies/:id
	
####Responses
**Success**
	
	{
		_id : "123112325",
		name : "test",
		email : "test",
		phone_number : "0123456789",
		paid_time: "2016-04-23T18:25:43.511Z"
	}
	
**Error**
	
	{
		error: "incorrect parameters"
	}
	
	
##2. Employees
accounts to manage the companies' accounts

###Login
#####Post /api/employees/login

**required**

	email	
	password
	
####Responses
**Success**

	{
		id : "12314125",
		email : "test@yahoo.com",
		phone_number : "6581922344",
		company_id : "123124124",
		role : "a_admin"
	}
**Error**
	
	{
		error: "Incorrect Credentials"
	}

###Create
#####Post /api/employees/

**required**

	email
	password
	phone_number
	role
	company_id
	
####Role

	c_admin: company admin
	c_receptionist: compay receptionist
	c_employee: company employee
	a_admin: app administrator

####Responses
**Success**

	{
		id : "12314125",
		email : "test@yahoo.com",
		phone_number : "6581922344"
		role : "a_admin"
	}
**Error**
	
	{
		error: "email taken"
	}

###Get
#####Get /api/employees/:id
	
####Responses
**Success**
	
	{
		id : "12314125",
		email: "test@yahoo.com",
		phone_number: "6581922344"
		role: "a_admin",
		company_id: "12314125"
	}
	
**Error**
	
	{
		error: "Incorrect credentials"
	}
	
###Get All Employees
#####Get /api/employees/company/:id

**required**

	email	
	password
	
####Responses
**Success**
	
	{
		{
			id : "12314125",
			email: "test@yahoo.com",
			phone_number: "6581922344"
			role: "a_admin",
			company_id: "12314125"
		},
		{
			id : "12314125",
			email: "test@yahoo.com",
			phone_number: "6581922344"
			role: "a_admin",
			company_id: "12314125"
		}
	}
	
**Error**
	
	{
		error: "Incorrect credentials"
	}
	
###Update
#####Put /api/employees

**optional**

	name
	email
	password
	phone_number
	role

**Success**
	
	{
		id : "12314125",
		email: "test@yahoo.com",
		phone_number: "6581922344"
		role: "a_admin",
		company_id: "12314125"
	}
**Error**
	
	{
		error: "Incorrect credentials"
	}

###Delete
#####Delete /api/employees

**Success**
	
	{
		id : "12314125",
		email: "test@yahoo.com",
		phone_number: "6581922344"
		role: "a_admin",
		company_id: "12314125"
	}
**Error**
	
	{
		error: "Incorrect credentials"
	}		


##3. Appointments
###Create
#####Post /api/appointments
create an appointment for the visitor

**required**

	first_name
	last_name
	phone_number
	date
	company_id
	provider_name
	
####Responses
#####Appointment Created

	{
		_id : "12314125",
		first_name : "test",
		last_name : "test",
		phone_number : "0123456789",
		date : "2016-04-23T18:25:43.511Z",
		company_id : "12314125",
		provider_name : "test test"
	}

#####Error
		
	{
		err: "Already Created"
	}

###Get 
#####Get /api/appointments/admin/:id

**required**

	company_id

	
####Responses
**success**

	{
		{
			_id : "12314125",
			first_name : "test",
			last_name : "test",
			phone_number : "0123456789",
			date : "2016-04-23T18:25:43.511Z",
			company_id : "12314125",
			provider_name : "test test"
		},
		{
			_id : "1231af3424fae",
			first_name : "test",
			last_name : "test",
			phone_number : "0123456789",
			date : "2016-05-23T18:25:43.511Z",
			company_id : "12314125",
			provider_name : "test test"
		}
		
	}
	
###Get 
#####Get /api/appointments/:id
	
####Responses
**success**

	{
		_id : "12314125",
		first_name : "test",
		last_name : "test",,
		phone_number : "0123456789",
		date : "2016-04-23T18:25:43.511Z",
		company_id : "12314125",
		provider_name : "test test"
	}
**error**
		
	{
		err: "Can't find"
	}
	
###Update
#####Put /api/appointments/:id

	
**optional**

	name
	phone_number
	date
	
**success**

	{
		_id : "12314125",
		first_name : "test",
		last_name : "test",
		phone_number : "0123456789",
		date : "2016-04-23T18:25:43.511Z",
		company_id : "12314125",
		provider_name : "test test"
	}

**error**
		
	{
		err: "Already Created"
	}
	
###Delete
#####Delete /api/appointments/:id
	
####Responses
**success**

	{
		_id : "12314125",
		first_name : "test",
		last_name : "test",
		phone_number : "0123456789",
		old_date : "2016-04-23T18:25:43.511Z",
		new_date : "2016-04-23T18:25:43.511Z",
		company_id : "12314125",
		provider_name : "test test"
	}

**error**
		
	{
		err: "Can't find"
	}
	
##4. Visitor List

**important!**

Store the additional field information not including name and phone_number, in the field additional_info as a dictionary type {}

###Get
#####Get  /api/visitorLists/company/:id
gives visitor's appointment of that current day in appointments

####Response
**success**

	{
		_id: "123124124",
		company_id: "12312355",
		visitors: 
		[
			{
				_id: "12314125",
				company_id: "12314125",
				first_name : "test",
				last_name : "test",
				phone_number: "21324125",
				checkin_time: "2016-04-23T18:25:43.511Z",
				appointments: 
				[
					{
						_id : "12314125",
						name : "test1",
						phone_number : "0123456789",
						date : "2016-04-23T18:25:43.511Z",
						company_id : "12314125",
						provider_name : "test test"
					}
				]
				additional_info: 
					{
						allergies: "peanuts",
						sex: "male"
					}
			},
			{
				_id: "12314125",
				company_id: "12314125",
				first_name : "test",
				last_name : "test",
				phone_number: "21324125",
				checkin_time: "2016-04-23T18:25:43.511Z",
				appointments: 
				[
					{
						_id : "12314125",
						name : "test1",
						phone_number : "0123456789",
						date : "2016-04-23T18:25:43.511Z",
						company_id : "12314125",
						provider_name : "test test"
					}
				]
				additional_info: 
					{
						allergies: "peanuts",
						sex: "male"
					}
		]
	}
**error**

	{
		error: "getting visitor list"
	}
	
###Create
add a Visitor to the list,
gives the visitor current day's appointments
#####Post /api/visitorLists

**required**
	
	company_id
	first_name
	last_name
	phone_number
	checkin_time	
	
**optional**

	additional_info
	
**success**

	{
		_id: "123124124",
		company_id: "12312355",
		visitors: 
		[
			{
				_id: "12314125",
				company_id: "12314125",
				first_name : "test",
				last_name : "test",
				phone_number: "21324125",
				checkin_time: "2016-04-23T18:25:43.511Z",
				appointments: 
				[
					{
						_id : "12314125",
						name : "test1",
						phone_number : "0123456789",
						date : "2016-04-23T18:25:43.511Z",
						company_id : "12314125",
						provider_name : "test test"
					}
				]
				additional_info: 
					{
						allergies: "peanuts",
						sex: "male"
					}
			},
			{
				_id: "12314125",
				company_id: "12314125",
				first_name : "test",
				last_name : "test",
				phone_number: "21324125",
				checkin_time: "2016-04-23T18:25:43.511Z",
				appointments: 
				[
					{
						_id : "12314125",
						name : "test1",
						phone_number : "0123456789",
						date : "2016-04-23T18:25:43.511Z",
						company_id : "12314125",
						provider_name : "test test"
					}
				]
				additional_info: 
					{
						allergies: "peanuts",
						sex: "male"
					}
		]
	}
**error**

	{
		error: "getting visitor list"
	}
	
###Delete
delete visitor from company list
#####Delete /api/visitorLists/company/:company_id/visitor/:visitor_id

**success**

	{
		_id: "123124124",
		company_id: "12312355",
		visitors: 
		[
			{
				_id: "12314125",
				company_id: "12314125",
				first_name : "test",
				last_name : "test",
				phone_number: "21324125",
				checkin_time: "2016-04-23T18:25:43.511Z",
				appointments: 
				[
					{
						_id : "12314125",
						name : "test1",
						phone_number : "0123456789",
						date : "2016-04-23T18:25:43.511Z",
						company_id : "12314125",
						provider_name : "test test"
					}
				]
				additional_info: 
					{
						allergies: "peanuts",
						sex: "male"
					}
			}
		]
	}
**error**

	{
		error: "getting visitor list"
	}

###Delete
clear visitor list
#####Delete /api/visitorLists/:id

**success**

	{
		_id: "123124124",
		company_id: "12312355",
		visitors: []
	}
**error**

	{
		error: "getting visitor list"
	}
	
#5 Sockets
used for system when people checkin to the service provider, and the dashboard will instantly showed

### Join Socket based on company id
Emit on "validate_company_id""

**required**

	company_id

### Add visitor to companie's list
Emit on "add_visitor"

**required**

	company_id
	first_name
	last_name
	phone_number
	checkin_time	
	
### Remove visitor to companie's list
Emit on "add_visitor"

**required**

	company_id
	visitor_id

#6 Notification
Currently using twillio and nodemailer
Needs to be tested and fixed 
	
		
	
