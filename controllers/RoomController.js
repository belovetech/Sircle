const db = require('../database/connection');
const Room = require('../models/roomModel');
const Member = require('../models/memberModel');
const generateSecretRoomPassCode = require('../utils/generateSecretRoomPassCode');

class RoomController {
  static async getStatus(req, res, next) {
    if (db.isAlive()) {
      return res.status(200).send('Everything is cool!');
    }
    return res.status(500).send('Something went wrong');
  }

  static async getStats(req, res, next) {
    const rooms = await Room.find();
    const members = await Member.find();

    return res
      .status(200)
      .json({ Rooms: rooms.length, Members: members.length });
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

      const member = await Member.create({ userName, role: 'admin' });
      const room = await Room.create({
        roomPassCode: passcode,
        members: member._id,
      });

      return res.status(201).json({
        id: room._id,
        passcode: room.roomPassCode,
        member: member.userName,
        role: member.role,
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

      const admin = room.members.at(0);
      const message = `You have been successfully added to the room created by ${admin.userName}`;
      return res.status(200).json({
        message,
        data: {
          id: member._id,
          userName,
        },
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
      return res.status(200).json({
        roomPasscode: room.roomPassCode,
        admin: room.members.at[0].userName,
        members: room.members.length - 1,
      });
    } catch (err) {
      return next(err);
    }
  }

  static async getRooms(req, res, next) {
    try {
      const rooms = await Room.find();
      const ArrRooms = rooms.map((room) => ({
        roomPasscode: room.roomPassCode,
        admin: room.members[0].userName,
        members: room.members.map((member) => member.userName),
      }));

      return res
        .status(200)
        .json({ results: ArrRooms.length, rooms: ArrRooms });
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = RoomController;