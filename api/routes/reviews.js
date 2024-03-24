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
const { verifyToken } = require("../utils/verifyToken.js");

const rounter = express.Router();

rounter.post("/", createReview);

rounter.patch("/:id", updateReview);

rounter.delete("/:id", deleteReview);

rounter.get("/findUserReview", getUserReview);

rounter.get("/:hotelId", getReviews);

rounter.get("/find/:id", getReview);

module.exports = rounter;
