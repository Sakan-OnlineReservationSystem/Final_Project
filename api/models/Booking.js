const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookindSchema = new mongoose.Schema({
  room: {
    type: Schema.Types.ObjectId,
    ref: "Room",
    required: [true, "Booking must belong to a Tour!"],
  },
  merchantId: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Booking must belong to a User!"],
  },
  price: {
    type: Number,
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
