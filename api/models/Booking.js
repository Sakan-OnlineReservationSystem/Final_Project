const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookindSchema = new mongoose.Schema({
  room: {
    type: Schema.Types.ObjectId,
    ref: "RoomNumber",
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
  captureId: {
    type: String,
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

bookindSchema.statics.removeDumyBooking = async function () {
  const thresholdTime = new Date(Date.now() - 10 * 60 * 1000);
  console.log("Hello", thresholdTime);
  // await this.deleteMany({
  //   $and: [{ createdAt: { $lte: thresholdTime } }, { paid: false }],
  // });
};

bookindSchema.pre(/^find/, function (next) {
  //console.log(thresholdTime);
  //Booking.constructor.removeDumyBooking();
  this.populate({
    path: "hotel",
    select:
      "-photos -_id -distance -rooms -aminity -numberOfReviewers -recommendation -desc",
  });
  next();
});

module.exports = mongoose.model("Booking", bookindSchema);
