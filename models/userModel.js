const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userName: {
    type: string,
    required: [true, 'Kindly, provide your username'],
  },
  photo: String,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

const User = mongoose.Model('User', UserSchema);
module.exports = User;
