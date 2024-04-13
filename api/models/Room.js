const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "please provide title of room"],
    },
    price: {
      type: Number,
      required: [true, "please provide price of room"],
    },
    maxPeople: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    adults: {
      type: Number,
      required: [true, "please provide number of adults in the room"],
    },
    children: {
      type: Number,
      required: [true, "please provide number of children in the room"],
    },
    roomFacilities: {
      type: [String],
    },
    roomNumbers: [{ number: Number, unavailableDates: { type: [Date] } }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Room", RoomSchema);
