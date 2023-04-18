const ChatMessage = require('../models/chatMessageModel');
const makeValidation = require('@withvoid/make-validation');
const error500Handler = require('../utils/error500Handler');

class ChatMessageController {
  static async postMessage(req, res, next) {
    try {
      const validation = makeValidation((types) => ({
        payload: req.body,
        checks: {
          message: { type: types.string },
          memberId: { type: types.string },
        },
      }));

      if (!validation.success) {
        return res.status(400).json({ ...validation });
      }
      const { roomPasscode } = req.params;
      const { message, memberId } = req.body;

      const post = await ChatMessage.create({
        message,
        memberId,
        roomPasscode,
      });

      global.io.sockets.in(roomPasscode).emit('new message', { message: post });
      return res.status(201).json({ success: true, post });
    } catch (err) {
      error500Handler(res, err);
    }
  }
}

module.exports = ChatMessageController;
