const express = require('express');
const chatMessageController = require('../controllers/ChatMessageController');

const router = express.Router();

router.post('/:roomPasscode/message', chatMessageController.postMessage);

module.exports = router;
