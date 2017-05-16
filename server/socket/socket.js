

const express = require('express');
let server;
let io = require('socket.io')();
const exports = module.exports;

// Constants for listening to Sockets
const CONNECTION = 'connection';
const VALIDATE_COMPANY_ID = 'validate_company_id';
const VISITOR_LIST_UPDATE = 'visitor_list_update';
const DISCONNECT = 'disconnect';
const REMOVE_VISITOR = 'remove_visitor';
const ADD_VISITOR = 'add_visitor';
const NOTIFY_ERROR = 'notify_error';

const VisitorListCtr = require('../routes/visitorList/visitorList.controller');
const Company = require('../models/Company');
/** ******** Socket IO Module **********/
exports.createServer = function (io_in) {
  io = io_in;

    /*
     * This handles the 'connection' event, which is send when the user is
     * trying to connect a socket.
     *
     * Note that when the connection is established for that client,
     * the '_admin_id' needs to be set so that the client can be added to the
     * room and notified when changes are being made.
     */
  io.on(CONNECTION, (socket) => {
    console.log('SOCKET CONNECTED');
        /* company_id is required to connect to join right socket to listen to*/
    socket.on(VALIDATE_COMPANY_ID, (data) => {
      console.log(data);
      const company_id = data.company_id;
      Company.findOne({ _id: company_id }, (err, c) => {
        if (err || !c) {} else {
          socket.join(company_id);
          VisitorListCtr.getCompanyVisitorList(company_id, (err_msg, result) => {
            if (err_msg) { exports.notifyError(company_id, { error: err_msg }); } else {
              exports.notifyNewList(company_id, result);
            }
          });
        }
      });
    });

        // requires the company_id to be sent
    socket.on(VISITOR_LIST_UPDATE, (data) => {
      const company_id = data.company_id;
      console.log(`Visitor List Update${data}`);
      VisitorListCtr.getCompanyVisitorList(company_id, (err_msg, result) => {
        if (err_msg) {
          exports.notifyError(company_id, { error: err_msg });
        } else { exports.notifyNewList(company_id, result); }
      });
    });

    socket.on(DISCONNECT, () => {
            // console.log('user disconnected from ' + company_id);
    });

        // requires the company_id and visitor_id to be sent
    socket.on(REMOVE_VISITOR, (data) => {
      console.log(data.company_id);
      const company_id = data.company_id;
      const visitor_id = data.visitor_id;
      if (!company_id || !visitor_id) return;
      VisitorListCtr.deleteVisitor(company_id, visitor_id, (err_msg, result) => {
        if (err_msg) {
          console.log('error');
          exports.notifyError(company_id, { error: err_msg });
        } else { exports.notifyNewList(company_id, result); }
      });
    });

        // require the params to be set with info of the visitor
    socket.on(ADD_VISITOR, (data) => {
      console.log('ADDING VISITOR');
      console.log(data);
      console.log(data.company_id);
      const company_id = data.company_id;
      VisitorListCtr.create(data, (err_msg, result) => {
        if (err_msg) {
          console.log('error');
          exports.notifyError(company_id, { error: err_msg });
        } else {
          exports.notifyNewList(company_id, result);
        }
      });
    });
  });
  return server;
};
/*
 * A function that allows you to notify all clients that
 * the queue has been updated.
 *
 * The client side needs to be listening for the 'queue_updated' event. When
 * this event is triggered, the client side can retrieve the whole queue of
 * patients to reflect the changes.
 */
exports.notifyNewList = function (company_id, data) {
  io.to(company_id).emit(VISITOR_LIST_UPDATE, data);
};

exports.notifyError = function (company_id, data) {
  io.to(company_id).emit(NOTIFY_ERROR, data);
};

/*
 * Set up a custom namespace.
 *
 * On the client side get the socket as follows to robobetty:
 *   var socket = io('/visitorList');
 */
const nsp = io.of('/visitorList');

// To be used with authorization.
// io.set('authorization', socketioJwt.authorize({
//   secret: jwtSecret,
//   handshake: true
// }));
