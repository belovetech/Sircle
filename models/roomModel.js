const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  roomPassCode: {
    type: string,
    unique: true,
    required: [true, 'Kindly, provide the room passcode'],
    minLength: [6, 'Passcode must be a 6 digits'],
  },
  users: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Room = mongoose.Model('Room', RoomSchema);
module.exports = Room;
