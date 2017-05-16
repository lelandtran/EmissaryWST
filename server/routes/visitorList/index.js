

const express = require('express');
const controller = require('./visitorList.controller');

const router = express.Router();

router.post('/', controller.createReq);
router.get('/company/:id', controller.getCompanyVisitorListReq);
router.delete('/company/:company_id/visitor/:visitor_id', controller.deleteVisitorReq);
router.delete('/:id', controller.deleteReq);

module.exports = router;
