const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const memberSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => uuidv4().replace(/-/g, ''),
  },
  userName: {
    type: String,
    required: [true, 'Kindly, provide your username'],
  },
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
