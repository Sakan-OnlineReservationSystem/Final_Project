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
