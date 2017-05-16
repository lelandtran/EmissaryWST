

const express = require('express');
const controller = require('./form.controller');

const router = express.Router();

const bodyparser = require('body-parser');
const urlparser = bodyparser.urlencoded({ extended: false });

router.get('/template/company/:id', controller.template.findByCompanyId);
router.get('/template/:adminid', controller.template.findByAdminId);
router.post('/template/:adminid', controller.template.sendByAdminId);
router.post('/template', controller.template.create);
router.put('/template', controller.template.update);
router.delete('/template/:template_id', controller.template.delete);

router.get('/visitorList/:form_id', controller.submitted_form.findById);
router.get('/visitorList', controller.submitted_form.findByPatientInfo);
router.post('/visitorList', controller.submitted_form.create);

module.exports = router;
