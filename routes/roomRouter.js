const express = require('express');
const RoomController = require('../controllers/RoomController');

const router = express.Router();

router.get('/status', RoomController.getStatus);
router.get('/stats', RoomController.getStats);

router.route('/').post(RoomController.createRoom).get(RoomController.getRooms);

router.route('/:passcode').get(RoomController.getRoom);

router.post('/join-room', RoomController.joinRoom);
router.delete('/leave-room/:memberId', RoomController.leaveRoom);
router.delete('/delete-room/:adminId', RoomController.deleteRoom);
module.exports = router;
