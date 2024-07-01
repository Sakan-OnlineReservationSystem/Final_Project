const Booking = require("../models/Booking");
const User = require("../models/User");
const Hotel = require("../models/Hotel");
const catchAsync = require("../utils/catchAsync");
const { refundMoney } = require("./payment");
const { isMerchantVertified } = require("../controllers/onboardSeller");
const RoomNumber = require("../models/RoomNumber");
const AppError = require("../utils/appError");

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
  const roomNumber = await RoomNumber.findById(req.body.roomNumber).populate({
    path: "roomId",
    select: "price",
  });
  const differenceMs =
    new Date(req.body.to).getTime() - new Date(req.body.from).getTime();
  let numDays = Math.ceil(differenceMs / (1000 * 3600 * 24));
  req.body.pricePerDay = roomNumber.roomId.price;
  req.body.totalPrice = roomNumber.roomId.price * numDays;
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
    return res.status(400).json({
      status: "fail",
      message: "you should not cancel reservation after checkIn date",
    });
  thresholdTime.setDate(thresholdTime.getDate() - 30);
  if (booking.createdAt <= thresholdTime)
    return res.status(400).json({
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

exports.getUserRerservations = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find({
    user: req.user._id,
    to: { $gte: new Date(Date.now()) },
  }).populate({
    path: "roomNumber",
    select: "-_id",
  });
  res.status(200).json(bookings);
});

exports.getUserRerservationsHistory = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find({
    user: req.user._id,
    to: { $lte: new Date(Date.now()) },
  }).populate({
    path: "roomNumber",
    select: "-_id",
  });
  res.status(200).json(bookings);
});

exports.updateBooking = catchAsync(async (req, res, next) => {});

exports.webhookCheckout = async (req, res, next) => {
  const data = req.body;
  if (data.event_type == "CHECKOUT.ORDER.COMPLETED") bookingCheckout(req.body);
  res.status(200).json({ received: true });
};

exports.hotelContainRoomNumber = async (req, res, next) => {
  const roomNumber = await RoomNumber.findById(req.body.roomNumber);
  if (!roomNumber) return next(new AppError("RoomNumber does not exist", 404));
  const hotel = await Hotel.findById(req.body.hotel);
  if (!hotel) {
    return next(new AppError("Hotel does not exist", 404));
  }
  if (hotel.rooms.includes(roomNumber.roomId)) {
    next();
  } else {
    return next(
      new AppError("This RoomNumber does not belong to this hotel", 404)
    );
  }
};

exports.isRoomAvailable = async (req, res, next) => {
  var to = new Date(req.body.to);
  to.setHours(23);
  to.setMinutes(59);
  req.body.to = to;
  const from = req.body.from;
  const booking = await Booking.find({
    roomNumber: req.body.roomNumber,
    $or: [
      {
        from: { $lte: new Date(from) },
        to: { $gte: new Date(to) },
      },
      {
        from: { $lte: new Date(to) },
        to: { $gte: new Date(to) },
      },
      {
        from: { $lte: new Date(to), $gte: new Date(from) },
      },
      { to: { $lte: new Date(to), $gte: new Date(from) } },
    ],
  });
  if (booking.length > 0)
    return next(new AppError("Room is not available at this time", 400));
  next();
};

exports.isBookingOwner = catchAsync(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) return next(new AppError("No reservation with this id", 404));
  if (booking.user.toString() === req.user._id.toString()) {
    next();
  } else {
    return next(
      new AppError(
        "Not Authorized, you are not the owner of this reservation",
        401
      )
    );
  }
});
