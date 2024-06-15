const mongoose = require("mongoose");
const { Schema } = mongoose;

const HotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide the name of the property"],
    trim: true,
  },
  ownerId: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: [true, "please provide the type of the property"],
    trim: true,
  },
  city: {
    type: String,
    required: [true, "please provide the city of the property"],
    trim: true,
  },
  address: {
    type: [String],
    required: [true, "please provide the address of the property"],
    trim: true,
  },
  distance: {
    type: Number,
    required: [true, "please provide the distance from the center of the city"],
  },
  country: {
    type: String,
    required: [true, "please provide the country of the property"],
    trim: true,
  },
  photos: {
    type: [String],
  },
  title: {
    type: String,
    trim: true,
  },
  desc: {
    type: Object,
    required: [true, "please provide the description of the property"],
  },
  rating: {
    type: Number,
  },
  numRatings: {
    type: Number,
    default: 0,
  },
  rooms: {
    type: [{ type: Schema.Types.ObjectId, ref: "Room" }],
  },
  cheapestPrice: {
    type: Number,
    required: [true, "please provide the cheapest price in the property"],
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
  reviewScore: {
    type: String,
    default: "normal",
  },
  score: {
    type: Number,
  },
  recommendation: {
    type: [{ type: Schema.Types.ObjectId, ref: "Hotel" }],
  },
});

module.exports = mongoose.model("Hotel", HotelSchema);
