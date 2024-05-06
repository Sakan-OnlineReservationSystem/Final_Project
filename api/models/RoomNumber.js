const mongoose = require("mongoose");

const RoomNumberSchema = new mongoose.Schema(
  {
    roomId: {
      type: String,
      required: true,
    },
    roomNumber: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("RoomNumberSchema", RoomNumberSchema);
