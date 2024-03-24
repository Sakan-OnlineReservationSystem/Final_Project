const express = require("express");
const {
  createReview,
  deleteReview,
  getReview,
  getReviews,
  updateReview,
  isReviewOwner,
} = require("../controllers/review.js");
const { verifyToken } = require("../utils/verifyToken.js");

const rounter = express.Router();

rounter.post("/", createReview);

rounter.patch("/:id", isReviewOwner, updateReview);

rounter.delete("/:id", isReviewOwner, deleteReview);

rounter.get("/:hotelId", getReviews);
rounter.get("/find/:id", getReview);

module.exports = rounter;
