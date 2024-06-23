const express = require("express");
const {
  createBooking,
  updateBooking,
  deleteBooking,
  getBooking,
  webhookCheckout,
  getUserRerservations,
  hotelContainRoomNumber,
  isBookingOwner,
  isRoomAvailable,
} = require("../controllers/booking");
const { protect, isNormalUser, isOwner } = require("../controllers/auth.js");

const router = express.Router();

router.get("/reservations", protect, getUserRerservations);
router.post("/", protect, hotelContainRoomNumber, isRoomAvailable, createBooking);
router.get("/:id", protect, isBookingOwner, getBooking); // id => bookingID

router.delete("/:id", protect, isBookingOwner, deleteBooking); // cancel reservation, id => bookingID
router.post("/webHook", webhookCheckout);

module.exports = router;
