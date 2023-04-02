const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, 'Kindly, provide your username'],
  },
  photo: String,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  role: {
    type: String,
    default: 'member',
  },
});

const Member = mongoose.model('Member', memberSchema);
module.exports = Member;
