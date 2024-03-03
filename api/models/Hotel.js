const mongoose = require("mongoose");
const { Schema } = mongoose;

const HotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: [String],
    required: true,
    trim: true,
  },
  distance: {
    type: Number,
    required: true,
  },
  country: {
    type: String,
    required: true,
    trim: true,
  },
  photos: {
    type: [String],
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  desc: {
    type: Object,
    required: true,
  },
  rating: {
    type: Number,
  },
  rooms: {
    type: [{ type: Schema.Types.ObjectId, ref: "Room" }],
  },
  cheapestPrice: {
    type: Number,
    required: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  aminity: {
    type: [String],
  },
  numberOfReviewers: {
    type: Number,
    default: 0,
  },
  numberOfStars: {
    type: Number,
  },
});

module.exports = mongoose.model("Hotel", HotelSchema);
