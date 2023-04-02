const express = require('express');
const appStatus = require('../controllers/appStatus');

const router = express.Router();

router.get('/status', appStatus);

module.exports = router;
