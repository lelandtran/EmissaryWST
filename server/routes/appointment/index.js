

const express = require('express');
const controller = require('./appointment.controller');

const router = express.Router();

router.post('/', 			controller.template.create);
router.get('/:id', 			controller.template.get);
router.get('/company/:id', 	controller.template.getAll);
router.put('/:id', controller.template.update);
router.delete('/:id', controller.template.delete);

module.exports = router;
