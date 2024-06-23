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
} = require("../controllers/booking");
const { protect, isNormalUser, isOwner } = require("../controllers/auth.js");

const router = express.Router();

router.post("/", protect, hotelContainRoomNumber, createBooking);
router.get("/:id", getBooking); // id => bookingID
router.delete("/:id", protect, isBookingOwner, deleteBooking); // cancel reservation, id => bookingID
router.post("/webHook", webhookCheckout);
router.get("/reservations/:id", getUserRerservations);

module.exports = router;
