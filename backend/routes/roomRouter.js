const express = require('express');
const RoomController = require('../controllers/RoomController');

const router = express.Router();

router
  .get('/status', RoomController.getStatus)
  .get('/stats', RoomController.getStats)
  .post('/', RoomController.createRoom)
  .get('/', RoomController.getRooms)
  .get('/:passcode', RoomController.getRoom)
  .post('/join-room', RoomController.joinRoom)
  .delete('/leave-room/:memberId', RoomController.leaveRoom)
  .delete('/delete-room/:adminId', RoomController.deleteRoom);

module.exports = router;
