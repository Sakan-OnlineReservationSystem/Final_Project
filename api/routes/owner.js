const express = require("express");
const {
    getHotels,
    getBookings
  } = require("../controllers/owner.js");

const { protect, isNormalUser, isOwner } = require("../controllers/auth.js");
const { isHotelOwner } = require("../controllers/hotel.js");

const router = express.Router();

router.get("/hotels", getHotels);

router.get("/bookings/:id", protect, isHotelOwner, getBookings);

module.exports = router;