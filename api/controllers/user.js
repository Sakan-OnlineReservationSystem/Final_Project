const Booking = require("../models/Booking.js");
const Hotel = require("../models/Hotel.js");
const Room = require("../models/Room.js");
const RoomNumber = require("../models/RoomNumber.js");
const User = require("../models/User.js");
const catchAsync = require("../utils/catchAsync.js");
const Booking = require("../models/Booking.js");

exports.updateUser = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );
  res.status(200).json(updatedUser);
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(200).json("User has been deleted.");
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  res.status(200).json(user);
});

exports.getUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json(users);
});

exports.getBookings = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find({
    user: req.params.id
  });
  var response = [];
  for (let i = 0; i < bookings.length; i++) {
    var hotel1 = await Hotel.findById(bookings[i].hotel);
    var roomNumber1 = await RoomNumber.findById(bookings[i].room);
    var room1 = await Room.findById(roomNumber1.roomId);
    Booking = {
      from: bookings[i].from,
      to: bookings[i].to,
      amountPaid: bookings[i].amountPaid,
      hotel: hotel1,
      room: room1,
      roomNumber: roomNumber1.roomNumber
    };
    response.push(Booking);
  }
  res.status(200).json(response);
});