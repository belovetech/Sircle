const express = require('express');
const RoomController = require('../controllers/RoomController');

const router = express.Router();

router.get('/status', RoomController.getStatus);
router.get('/stats', RoomController.getStats);
router.post('/rooms', RoomController.createRoom);
router.get('/rooms', RoomController.getRooms);
router.get('/rooms/:passcode', RoomController.getRoom);
router.post('/join-room', RoomController.joinRoom);

module.exports = router;
