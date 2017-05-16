

const express = require('express');
const controller = require('./company.controller');

const router = express.Router();

router.post('/', 			controller.template.create);
router.get('/:id', 			controller.template.get);
router.get('/', 			controller.template.getAll);
router.put('/:id', controller.template.update);
router.delete('/:id', controller.template.delete);

router.put('/setting/:user', 	controller.template.resetCredentials);

module.exports = router;
