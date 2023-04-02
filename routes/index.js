const express = require('express');
const AppController = require('../controllers/AppController');

const router = express.Router();

router.get('/status', AppController.getStatus);
router.post('/room', AppController.createRoom);
router.get('/room/:passcode', AppController.getRoom);
router.post('/join-room', AppController.joinRoom);

module.exports = router;
