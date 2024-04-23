const Booking = require("../models/Booking");
const catchAsync = require("../utils/catchAsync");

exports.createBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.create(req.body);
  res.status(201).json(booking);
});

exports.getBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id);
  res.status(200).json(booking);
});

exports.deleteBooking = catchAsync(async (req, res, next) => {});

exports.updateBooking = catchAsync(async (req, res, next) => {});

exports.bookingCheckout = async (data) => {
  const bookingId = data.resource.purchase_units[0].reference_id;
  const price = data.resource.purchase_units[0].payments.captures[0].amount.value;
  const booking = await Booking.findByIdAndUpdate(
    bookingId,
    { paid: true, price: price },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!booking) {
    return next(new AppError("No booking found with this id", 404));
  }
};
