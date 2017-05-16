define({ "api": [
  {
    "type": "delete",
    "url": "/api/companies:id",
    "title": "",
    "name": "DeleteCompany",
    "group": "Company",
    "description": "<p>Delete a company's information</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>id of the company to delete</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>unique id of entry</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>name of the company</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>email of the company</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "phone_number",
            "description": "<p>phone number of the company</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "paid_time",
            "description": "<p>when the payment was made</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error",
            "description": "<p>Incorrect parameters</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (success):",
          "content": "{\n    _id : \"12314125\"\n    name : \"test\",\n    email : \"test\",\n    phone_number : \"0123456789\",\n    paid_time: \"2016-04-23T18:25:43.511Z\",\n}",
          "type": "json"
        },
        {
          "title": "Response (error):",
          "content": "{\n    error: \"Incorrect parameters\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server/routes/company/company.controller.js",
    "groupTitle": "Company"
  },
  {
    "type": "get",
    "url": "/api/companies",
    "title": "",
    "name": "GetAllCompany",
    "group": "Company",
    "description": "<p>Retrieve information for all companies</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>unique id of entry</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>name of the company</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>email of the company</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "phone_number",
            "description": "<p>phone number of the company</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "paid_time",
            "description": "<p>when the payment was made</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error",
            "description": "<p>Incorrect credentials</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (success):",
          "content": "{\n    {\n        _id : \"12314125\"\n        name : \"test\",\n        email : \"test\",\n        phone_number : \"0123456789\",\n        paid_time: \"2016-04-23T18:25:43.511Z\",\n    },\n    {\n        _id : \"12314125\"\n        name : \"test\",\n        email : \"test\",\n        phone_number : \"0123456789\",\n        paid_time: \"2016-04-23T18:25:43.511Z\",\n    }\n}",
          "type": "json"
        },
        {
          "title": "Response (error):",
          "content": "{\n    error: \"Incorrect credentials\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server/routes/company/company.controller.js",
    "groupTitle": "Company"
  },
  {
    "type": "get",
    "url": "/api/companies/:id",
    "title": "",
    "name": "GetCompany",
    "group": "Company",
    "description": "<p>Retrieve information about a company</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>id of the company to search for</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>unique id of entry</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>name of the company</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>email of the company</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "phone_number",
            "description": "<p>phone number of the company</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "paid_time",
            "description": "<p>when the payment was made</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error",
            "description": "<p>Incorrect credentials</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (success):",
          "content": "{\n    _id : \"12314125\"\n    name : \"test\",\n    email : \"test\",\n    phone_number : \"0123456789\",\n    paid_time: \"2016-04-23T18:25:43.511Z\",\n}",
          "type": "json"
        },
        {
          "title": "Response (error):",
          "content": "{\n    error: \"Incorrect credentials\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server/routes/company/company.controller.js",
    "groupTitle": "Company"
  },
  {
    "type": "post",
    "url": "/api/companies",
    "title": "",
    "name": "PostCompany",
    "group": "Company",
    "description": "<p>Create new company for the website with provided mandatory information</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>name of the company</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "credit_card_number",
            "description": "<p>credit card to sign up the company with</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "expiration_date",
            "description": "<p>credit card's expiration date</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>to sign up with</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone_number",
            "description": "<p>phone number to sign up with</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "paid_time",
            "description": "<p>when the payment was made</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>unique id of entry</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>name of the company</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>email of the company</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "phone_number",
            "description": "<p>phone number of the company</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "paid_time",
            "description": "<p>when the payment was made</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error",
            "description": "<p>email was taken</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (success):",
          "content": "{\n    _id : \"12314125\"\n    name : \"test\",\n    email : \"test\",\n    phone_number : \"0123456789\",\n    paid_time: \"2016-04-23T18:25:43.511Z\",\n}",
          "type": "json"
        },
        {
          "title": "Response (error):",
          "content": "{\n    error: \"email taken\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server/routes/company/company.controller.js",
    "groupTitle": "Company"
  },
  {
    "type": "put",
    "url": "/api/companies:id",
    "title": "",
    "name": "PutCompany",
    "group": "Company",
    "description": "<p>Update a company's information</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>id of the company to update</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "name",
            "description": "<p>name of the company</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "credit_card_number",
            "description": "<p>credit card to sign up the company with</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "expiration_date",
            "description": "<p>credit card's expiration date</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "email",
            "description": "<p>to sign up with</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "phone_number",
            "description": "<p>phone number to sign up with</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>unique id of entry</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>name of the company</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>email of the company</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "phone_number",
            "description": "<p>phone number of the company</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "paid_time",
            "description": "<p>when the payment was made</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error",
            "description": "<p>Incorrect parameters</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (success):",
          "content": "{\n    _id : \"12314125\"\n    name : \"test\",\n    email : \"test\",\n    phone_number : \"0123456789\",\n    paid_time: \"2016-04-23T18:25:43.511Z\",\n}",
          "type": "json"
        },
        {
          "title": "Response (error):",
          "content": "{\n    error: \"Incorrect parameters\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server/routes/company/company.controller.js",
    "groupTitle": "Company"
  }
] });
