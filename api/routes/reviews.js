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

rounter.post("/", verifyToken, createReview);

rounter.patch("/:id", verifyToken, isReviewOwner, updateReview);

rounter.delete("/:id", verifyToken, isReviewOwner, deleteReview);

rounter.get("/:hotelId", getReviews);
rounter.get("/find/:id", getReview);

module.exports = rounter;
