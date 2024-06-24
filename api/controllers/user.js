const Booking = require("../models/Booking.js");
const Hotel = require("../models/Hotel.js");
const Room = require("../models/Room.js");
const RoomNumber = require("../models/RoomNumber.js");
const User = require("../models/User.js");
const AppError = require("../utils/appError.js");
const catchAsync = require("../utils/catchAsync.js");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password updates. Please use /updateMyPassword.",
        400
      )
    );
  }
  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(
    req.body,
    "username",
    "email",
    "phone",
    "address"
  );
  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user._id, filteredBody, {
    new: true,
    runValidators: true,
  });
  res.status(200).json(updatedUser);
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user._id, { isActive: false });
  res.status(204).json("User has been deleted.");
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) return next(new AppError("there is no user with this id", 404));
  res.status(200).json(user);
});

exports.getUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json(users);
});

exports.getBookings = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find({
    user: req.params.id,
  });
  var response = [];
  for (let i = 0; i < bookings.length; i++) {
    var roomNumber1 = await RoomNumber.findById(bookings[i].room);
    let booking = {
      from: bookings[i].from,
      to: bookings[i].to,
      amountPaid: bookings[i].amountPaid,
      hotel: bookings[i].hotel,
      room: await Room.findById(roomNumber1.roomId),
      roomNumber: roomNumber1.roomNumber,
    };
    response.push(booking);
  }
  res.status(200).json(response);
});
