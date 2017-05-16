

const express = require('express');
const controller = require('./payment.controller');

const router = express.Router();

router.post('/payment/subscription', controller.createSubscription);
router.get('/payment/subscription/:id', controller.getSubscription);

module.exports = router;
