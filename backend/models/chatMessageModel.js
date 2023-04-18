const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const ChatMessageSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => uuidv4().replace(/-/g, ''),
    },
    message: String,
    memberId: String,
    roomPasscode: String,
  },
  {
    timestamps: true,
    collection: 'chatmessages',
  }
);

const ChatMessage = mongoose.model('ChatMessage', ChatMessageSchema);
module.exports = ChatMessage;
