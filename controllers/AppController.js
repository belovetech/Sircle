const db = require('../database/connection');
const Room = require('../models/roomModel');
const Member = require('../models/memberModel');
const generateSecretRoomPassCode = require('../utils/generateSecretRoomPassCode');

class AppController {
  static async getStatus(req, res, next) {
    if (db.isAlive()) {
      return res.status(200).send('Everything is cool!');
    }
    return res.status(500).send('Something went wrong');
  }

  static async createRoom(req, res, next) {
    try {
      const { userName } = req.body;
      const passcode = generateSecretRoomPassCode();

      if (!userName) {
        return res.status(400).json({ error: 'Kindly provide username' });
      }
      if (!passcode) {
        return res.status(500).json({ error: 'Something went wrong' });
      }

      const admin = await Member.create({ userName });
      const room = await Room.create({
        roomPassCode: passcode,
        members: admin._id,
      });

      return res.status(201).json({
        id: room._id,
        passcode: room.roomPassCode,
        admin: admin.userName,
      });
    } catch (err) {
      return next(err);
    }
  }

  static async joinRoom(req, res, next) {
    try {
      const { userName, passCode } = req.body;

      if (!userName) {
        return res.status(400).json({ error: 'Kindly provide username' });
      }
      if (!passCode || passCode.length < 7) {
        return res.status(400).json({ error: 'Provide the room passcode' });
      }

      const room = await Room.findOne({ roomPassCode: passCode });

      if (!room) {
        return res.status(400).json({ error: 'Invalid room passcode' });
      }
      const member = await Member.create({ userName });
      if (Array.isArray(room.members)) {
        room.members.push(member._id);
        room.save();
      }

      return res.status(200).json({
        message: `You have been successfully added to the room with ${passCode}`,
      });
    } catch (err) {
      return next(err);
    }
  }

  static async getRoom(req, res, next) {
    try {
      const room = await Room.findOne({
        roomPassCode: req.params.passcode,
      }).select('-__v');
      return res.status(200).json(room);
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = AppController;
