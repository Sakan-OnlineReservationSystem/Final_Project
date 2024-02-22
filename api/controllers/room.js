const Room = require("../models/Room.js");
const Hotel = require("../models/Hotel.js");
const catchAsync = require("../utils/catchAsync.js");

exports.createRoom = catchAsync(async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Room(req.body);
  const savedRoom = await newRoom.save();
  try {
    await Hotel.findByIdAndUpdate(hotelId, {
      $push: { rooms: savedRoom._id },
    });
  } catch (err) {
    next(err);
  }
  res.status(200).json(savedRoom);
});

exports.updateRoom = catchAsync(async (req, res, next) => {
  const updatedRoom = await Room.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );
  res.status(200).json(updatedRoom);
});

exports.updateRoomAvailability = catchAsync(async (req, res, next) => {
  await Room.updateOne(
    { "roomNumbers._id": req.params.id },
    {
      $push: {
        "roomNumbers.$.unavailableDates": req.body.dates,
      },
    }
  );
  res.status(200).json("Room status has been updated.");
});

exports.deleteRoom = catchAsync(async (req, res, next) => {
  const hotelId = req.params.hotelid;
  await Room.findByIdAndDelete(req.params.id);
  try {
    await Hotel.findByIdAndUpdate(hotelId, {
      $pull: { rooms: req.params.id },
    });
  } catch (err) {
    next(err);
  }
  res.status(200).json("Room has been deleted.");
});

exports.getRoom = catchAsync(async (req, res, next) => {
  const room = await Room.findById(req.params.id);
  res.status(200).json(room);
});

exports.getRooms = catchAsync(async (req, res, next) => {
  const rooms = await Room.find();
  res.status(200).json(rooms);
});
