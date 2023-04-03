/* eslint-disable no-restricted-globals */
// const { v4: uuidv4 } = require('uuid');
const db = require('../database/connection');
const Room = require('../models/roomModel');
const Member = require('../models/memberModel');
const generateRoomPassCode = require('../utils/generateRoomPassCode');
const formatResponse = require('../utils/formatResponse');

class RoomController {
  static async getStatus(req, res, next) {
    if (db.isAlive()) {
      return res.status(200).send('Everything is cool!');
    }
    return res.status(500).send('Something went wrong');
  }

  static async getStats(req, res, next) {
    const rooms = await Room.find();
    const users = await Member.find();
    let members = 0;
    let admins = 0;
    users.forEach((member) => {
      if (member.role === 'admin') {
        admins += 1;
      } else members += 1;
    });
    return res.status(200).json({ Rooms: rooms.length, admins, members });
  }

  static async createRoom(req, res, next) {
    try {
      const passcode = generateRoomPassCode();
      const { userName } = req.body;
      // eslint-disable-next-line no-restricted-globals
      if (!userName || !isNaN(userName)) {
        return res
          .status(400)
          .json({ error: 'Kindly provide a valid username' });
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
        admin: member.userName,
        members: room.members.length - 1,
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
      if (!room) {
        return res.status(404).json({ error: 'The room does not exist.' });
      }
      const members = room.members.map((member) => formatResponse(member));
      const admin = members.shift();

      return res.status(200).json({
        roomPasscode: room.roomPassCode,
        admin,
        members: {
          results: members.length,
          data: members,
        },
      });
    } catch (err) {
      return next(err);
    }
  }

  static async getRooms(req, res, next) {
    try {
      const rooms = await Room.find().select('-__v');
      const ArrRooms = rooms.map((room) => {
        const members = room.members.map((member) => formatResponse(member));
        const admin = members.shift();
        return {
          roomPasscode: room.roomPassCode,
          admin,
          members,
        };
      });

      return res.status(200).json({
        results: rooms.length,
        rooms: ArrRooms,
      });
    } catch (err) {
      return next(err);
    }
  }

  static async joinRoom(req, res, next) {
    try {
      const { userName, passCode } = req.body;

      if (!userName || !isNaN(userName)) {
        return res
          .status(400)
          .json({ error: 'Kindly provide a valid username' });
      }
      if (!passCode || passCode.length < 7) {
        return res
          .status(400)
          .json({ error: 'Provide the valid room passcode' });
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

      const admin = room.members[0].userName;
      const message = `${userName} joined the room created by ${admin}`;
      return res.status(200).json({
        message,
        data: formatResponse(member),
      });
    } catch (err) {
      return next(err);
    }
  }

  static async leaveRoom(req, res, next) {
    try {
      const { memberId } = req.params;
      const { passcode } = req.query;
      if (!memberId) {
        return res.status(400).json({ error: 'memberId should be provided' });
      }
      if (!passcode) {
        return res
          .status(400)
          .json({ error: 'Room passcode should be provided' });
      }
      const room = await Room.findOne({ roomPassCode: passcode });
      if (!room) {
        return res.status(404).json({ error: 'The room does not exist.' });
      }
      const currentMember = await Member.findById(memberId);
      if (!currentMember) {
        return res.status(404).json({ error: 'No member with this ID' });
      }

      const index = room.members
        .map((member) => member._id.toString())
        .indexOf(memberId);

      if (index !== -1) {
        RoomController.delete(Member, memberId);
        room.members.splice(index, 1);
        room.save();
      }

      return res
        .status(204)
        .json({ message: `${currentMember.userName} left the room` });
    } catch (err) {
      return next(err);
    }
  }

  static async deleteRoom(req, res, next) {
    try {
      const { adminId } = req.params;
      const { passcode } = req.query;
      if (!adminId) {
        return res.status(400).json({ error: 'admin ID should be provided' });
      }
      if (!passcode) {
        return res
          .status(400)
          .json({ error: 'Room passcode should be provided' });
      }
      const admin = await Member.findById(adminId);
      if (!admin || admin.role !== 'admin') {
        return res
          .status(403)
          .json({ error: 'Only admin can dissolve the room' });
      }
      const room = await Room.findOne({ roomPassCode: passcode });
      if (!room) {
        return res.status(404).json({ error: 'The room does not exist.' });
      }
      room.members.forEach((member) => {
        RoomController.delete(Member, member._id);
      });

      RoomController.delete(Room, room._id);
      return res.status(204).json({ message: 'Room successfully dissolved' });
    } catch (err) {
      return next(err);
    }
  }

  static async delete(Model, ID) {
    await Model.findByIdAndDelete(ID);
  }
}

module.exports = RoomController;
