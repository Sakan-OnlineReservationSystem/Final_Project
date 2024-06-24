const express = require("express");
const {
  createReview,
  deleteReview,
  getReview,
  getReviews,
  updateReview,
  isReviewOwner,
  getUserReview,
} = require("../controllers/review.js");
const { protect, isNormalUser } = require("../controllers/auth.js");

const rounter = express.Router();

rounter.get("/findUserReview", getUserReview);

rounter.get("/find/:id", getReview);

rounter.get("/:hotelId", getReviews);

rounter.use(protect, isNormalUser);

rounter.post("/", createReview);

rounter.patch("/:id", isReviewOwner, updateReview);

rounter.delete("/:id", isReviewOwner, deleteReview);

module.exports = rounter;
