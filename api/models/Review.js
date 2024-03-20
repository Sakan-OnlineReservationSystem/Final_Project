const mongoose = require("mongoose");
const Hotel = require("./Hotel");

const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    trim: true,
  },
  rating: {
    type: Number,
    required: [true, "please provide your rating"],
    min: [1, "minimum rating is 1"],
    max: [5, "max rating is 5"],
  },
  crearedAt: {
    type: Date,
    default: Date.now,
  },
  reviewee: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "please provide the reviewee id"],
  },
  hotelId: {
    type: mongoose.Schema.ObjectId,
    ref: "Hotel",
    required: [true, "please provide the property id"],
  },
});

reviewSchema.statics.clacRating = async function (propId) {
  const results = await this.aggregate([
    {
      $match: { hotelId: propId },
    },
    {
      $group: {
        _id: "$hotelId",
        numRating: { $sum: 1 },
        numReviewers: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);
  if (results.length > 0) {
    await Hotel.findByIdAndUpdate(propId, {
      numRatings: results[0].numRating,
      rating: Math.round(results[0].avgRating * 10) / 10,
      numberOfReviewers: results[0].numReviewers,
    });
  } else {
    await Hotel.findByIdAndUpdate(propId, {
      numRatings: 0,
      rating: 1,
      numberOfReviewers: 0,
    });
  }
};

reviewSchema.pre(/^find/, function (next) {
  this.populate({ path: "reviewee", select: "username img" });
  next();
});

reviewSchema.post("save", function (data) {
  this.constructor.clacRating(this.hotelId);
});

reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.reviewQuery = await this.model.findOne(this.getQuery());
  next();
});

reviewSchema.post(/^findOneAnd/, async function () {
  await this.reviewQuery.constructor.clacRating(this.reviewQuery.hotelId);
});

reviewSchema.index({ hotelId: 1, reviewee: 1 }, { unique: true });

module.exports = mongoose.model("Review", reviewSchema);
