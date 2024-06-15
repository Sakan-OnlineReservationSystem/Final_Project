const mongoose = require("mongoose");
const { Schema } = mongoose;

const RoomNumberSchema = new mongoose.Schema(
  {
    roomId: {
      type: Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    roomNumber: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("RoomNumber", RoomNumberSchema);