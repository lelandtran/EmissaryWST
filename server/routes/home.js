'use strict';

/* This module is strictly meant for one route. This route
 * is responsible for rendering our angular app home page.
 */
var express = require('express');
var path = require('path');
var router = express.Router();

/**
 * GET /
 * Render out angular app.
 */
router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../dist/visitors.html'));
});

module.exports = router;