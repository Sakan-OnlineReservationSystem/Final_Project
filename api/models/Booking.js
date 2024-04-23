const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookindSchema = new mongoose.Schema({
  room: {
    type: Schema.Types.ObjectId,
    ref: "Room",
    required: [true, "Booking must belong to a room!"],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Booking must belong to a User!"],
  },
  hotel: {
    type: Schema.Types.ObjectId,
    ref: "Hotel",
    required: [true, "Booking must belong to a hotel!"],
  },
  from: {
    type: Date,
    required: [true, "Booking must have start date!"],
  },
  to: {
    type: Date,
    required: [true, "Booking must have end date!"],
  },
  merchantId: {
    type: String,
  },
  amountPaid: {
    type: Number,
    default: 0,
    required: [true, "Booking must have a price."],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: [true, "Booking must have a date."],
  },
  paid: {
    type: Boolean,
    default: false,
  },
});

bookindSchema.pre(/^find/, function (next) {
  this.populate({ path: "hotel", select: "ownerId" }).populate({
    path: "room",
    select: "price",
  });
  next();
});

module.exports = mongoose.model("Booking", bookindSchema);
