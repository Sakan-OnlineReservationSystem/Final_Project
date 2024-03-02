const mongoose = require("mongoose");
const HotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: [String],
    required: true,
  },
  distance: {
    type: Number,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  photos: {
    type: [String],
  },
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: Object,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  rooms: {
    type: [String],
  },
  cheapestPrice: {
    type: Number,
    required: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  animity: {
    type: [String],
  },
  numberOfReviewers: {
    type: Number,
    default: 0,
  },
  numberOfStars: {
    type: String,
  },
});

module.exports = mongoose.model("Hotel", HotelSchema);
