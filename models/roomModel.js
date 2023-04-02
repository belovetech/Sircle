const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  roomPassCode: {
    type: String,
    unique: true,
    required: [true, 'Kindly, provide the room passcode'],
    minLength: [7, 'Passcode must be a 7 characters'],
  },
  members: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Member',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

RoomSchema.pre(/find/, function (next) {
  this.populate({ path: 'members', select: '-__v' });
  next();
});

RoomSchema.index({ members: 1 });

const Room = mongoose.model('Room', RoomSchema);
module.exports = Room;
