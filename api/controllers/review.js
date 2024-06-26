const catchAsync = require("../utils/catchAsync");
const Review = require("../models/Review");
const { getOrSetCache, deleteCache, setCache } = require("../utils/redis.js");
const AppError = require("../utils/appError.js");
const Hotel = require("../models/Hotel.js");

exports.createReview = catchAsync(async (req, res, next) => {
  const review = await Review.create(req.body);
  await setCache(`reviews?id=${review._id}`, review);
  await deleteCache(`hotelReviews?id=${review.hotelId}`);
  res.status(201).json(review);
});

exports.updateReview = catchAsync(async (req, res, next) => {
  const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!review) {
    return next(new AppError("No review found with this id", 404));
  }
  await setCache(`reviews?id=${review._id}`, review);
  await deleteCache(`hotelReviews?id=${review.hotelId}`);
  res.status(200).json(review);
});

exports.deleteReview = catchAsync(async (req, res, next) => {
  const review = await Review.findByIdAndDelete(req.params.id);
  if (!review) {
    return next(new AppError("No review found with this id", 404));
  }
  await deleteCache(`reviews?id=${review._id}`);
  await deleteCache(`hotelReviews?id=${review.hotelId}`);
  res.status(201).json("review deleted successfully");
});

exports.getReview = catchAsync(async (req, res, next) => {
  const review = await getOrSetCache(
    `reviews?id=${req.params.id}`,
    async () => {
      const review = await Review.findById(req.params.id);
      return review;
    }
  );
  res.status(200).json(review);
});

exports.getReviews = catchAsync(async (req, res, next) => {
  const result = await getOrSetCache(
    `hotelReviews?id=${req.params.hotelId}`,
    async () => {
      const reviews = await Review.find({ hotelId: req.params.hotelId });
      if (!reviews) {
        return next(new AppError("No reviews for this hotel", 404));
      }
      const { rating, numberOfReviewers, reviewScore } = await Hotel.findById(
        req.params.hotelId
      );
      return { hotelRating: rating, numberOfReviewers, reviewScore, reviews };
    }
  );
  res.status(200).json(result);
});

exports.isReviewOwner = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id).select("reviewee");
  if (!review) {
    return next(new AppError("No review with this id", 404));
  }
  if (review.reviewee._id.toString() === req.user._id.toString()) {
    next();
  } else {
    return next(
      new AppError("Not Authorized, you are not the owner of this review", 401)
    );
  }
});

exports.getUserReview = catchAsync(async (req, res, next) => {
  const review = await Review.find(req.query);
  if (!review) {
    return next(new AppError("No review with this id", 404));
  }
  res.status(200).json(review[0]);
});
