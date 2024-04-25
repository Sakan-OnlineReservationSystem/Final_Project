const Booking = require("../models/Booking");
const User = require("../models/User");
const Hotel = require("../models/Hotel");
const catchAsync = require("../utils/catchAsync");
const { refundMoney } = require("./payment");
const { isMerchantVertified } = require("../controllers/onboardSeller");

const bookingCheckout = async (data) => {
  const bookingId = data.resource.purchase_units[0].reference_id;
  const price =
    data.resource.purchase_units[0].payments.captures[0].amount.value;
  const captureId = data.resource.purchase_units[0].payments.captures[0].id;
  const booking = await Booking.findByIdAndUpdate(
    bookingId,
    { paid: true, amountPaid: price, captureId: captureId },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!booking) {
    return next(new AppError("No booking found with this id", 404));
  }
};

exports.createBooking = catchAsync(async (req, res, next) => {
  const hotel = await Hotel.findById(req.body.hotel).select("ownerId");
  if (!isMerchantVertified(hotel.ownerId)) {
    res.status(404).json({
      status: "fails",
      message:
        "you can not reserve this room as payment method of hotel owner is not vertified",
    });
  }
  const booking = await Booking.create(req.body);
  res.status(201).json(booking);
});

exports.getBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id);
  res.status(200).json(booking);
});

exports.deleteBooking = catchAsync(async (req, res, next) => {
  const bookingID = req.params.id;
  const booking = await Booking.findById(bookingID);
  if (!booking)
    return res.status(404).json({
      status: "fail",
      message: "No booking with this id",
    });
  let thresholdTime = new Date(Date.now());
  thresholdTime.setDate(thresholdTime.getDate());
  if (booking.from <= thresholdTime)
    return res.status(401).json({
      status: "fail",
      message: "you should not cancel reservation after checkIn date",
    });
  thresholdTime.setDate(thresholdTime.getDate() - 30);
  if (booking.createdAt <= thresholdTime)
    return res.status(401).json({
      status: "fail",
      message:
        "you should not cancel reservation after 30 days from reservation time",
    });
  if (!booking.paid) {
    await Booking.findByIdAndDelete(bookingID);
    return res.status(204).json({
      status: "success",
      message: null,
    });
  }
  const out = await refundMoney(booking);
  if (out.jsonResponse.status == "COMPLETED") {
    await Booking.findByIdAndDelete(bookingID);
    return res.status(204).json({
      status: "success",
      message: null,
    });
  }
  res.status(500).json({
    status: "fail",
    message: "something went wrong, try agian please",
  });
});

exports.updateBooking = catchAsync(async (req, res, next) => {});

exports.webhookCheckout = async (req, res, next) => {
  const data = req.body;
  if (data.event_type == "CHECKOUT.ORDER.COMPLETED") bookingCheckout(req.body);
  res.status(200).json({ received: true });
};
