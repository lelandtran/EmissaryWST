

/* This module is strictly meant for one route. This route
 * is responsible for rendering our angular app home page.
 */
const express = require('express');
const path = require('path');
const router = express.Router();

/**
 * GET /
 * Render out angular app.
 */
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/visitors.html'));
});

module.exports = router;
