const mongoose = require("mongoose");
const Hotel = require("./Hotel");

const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    trim: true,
  },
  rating: {
    type: Number,
    min: [1, "minimum rating is 1"],
    max: [5, "max rating is 5"],
  },
  crearedAt: {
    type: Date,
    default: Date.now,
  },
  revieweeId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "please provide the reviewee id"],
  },
  propertyId: {
    type: mongoose.Schema.ObjectId,
    ref: "Hotel",
    required: [true, "please provide the property id"],
  },
});

module.exports = mongoose.model("Review", reviewSchema);

reviewSchema.static.clacRating = async function (propId) {
  const results = await this.aggregate([
    {
      $match: { propertyId: propId },
    },
    {
      $group: {
        _id: "$propertyId",
        numRating: { $sum: 1 },
        numReviewers: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);
  if (results.length > 0) {
    await Hotel.findByIdAndUpdate(propId, {
      numRatings: results.numRating,
      rating: Math.round(results.avgRating * 10) / 10,
      numberOfReviewers: results.numReviewers,
    });
  }
};

reviewSchema.post("save", function () {
  this.constructor.clacRating(this.propertyId);
});

// reviewSchema.pre(/^findOneAnd/, async function (next) {
//   this.r = await this.findOne();
//   next();
// });

reviewSchema.post(/^findOneAnd/, async function (doc) {
  console.log(doc);
  doc.constructor.clacRating(doc.propertyId);
});
