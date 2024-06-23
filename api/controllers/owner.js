const User = require("../models/User.js");
const Hotel = require("../models/Hotel.js");
const catchAsync = require("../utils/catchAsync.js");
const Booking = require("../models/Booking.js");

exports.getHotels = catchAsync(async (req, res, next) => {
    const hotels = Hotel.find({ ownerId: req.user._id });
    if (!hotels) {
        return next(new AppError("No available hotels to show", 404));
    }
    res.status(200).json(reviews);
});

exports.getBookings = catchAsync(async (req, res, next) => {
    const bookings = Booking.find({ Hotel: req.params.id });
    if (!bookings) {
        return next(new AppError("No available bookings to show", 404));
    }
    res.status(200).json(bookings);
});