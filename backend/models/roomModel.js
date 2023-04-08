const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const RoomSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => uuidv4().replace(/-/g, ''),
    },
    passCode: {
      type: String,
      unique: true,
      required: [true, 'Kindly, provide the room passcode'],
      minLength: [7, 'Passcode must be a 7 characters'],
    },
    members: [
      {
        type: String,
        ref: 'Member',
      },
    ],
    timeTTL: {
      type: Date,
      default: () => Date.now() + 5 * 60 * 60 * 1000, //5hrs
    },
  },
  {
    timestamps: true,
    collection: 'rooms',
  }
);

RoomSchema.pre(/find/, function (next) {
  this.populate({ path: 'members', select: '-__v' });
  next();
});

RoomSchema.methods.isRoomExpired = function () {
  const createdAtInMilliseconds = parseInt(this.createAt.getTime() / 1000, 10);
  const timeTTLInMilliseconds = Date.now() + 10 * 60 * 1000;

  return timeTTLInMilliseconds < createdAtInMilliseconds;
};

RoomSchema.index({ members: 1 });

const Room = mongoose.model('Room', RoomSchema);
module.exports = Room;
