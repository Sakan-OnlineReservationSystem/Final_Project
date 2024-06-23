const express = require("express");
const {
  createBooking,
  updateBooking,
  deleteBooking,
  getBooking,
  webhookCheckout,
  getUserRerservations,
  hotelContainRoomNumber,
  isRoomAvailable,
  isBookingOwner,
} = require("../controllers/booking");
const { protect } = require("../controllers/auth");

const router = express.Router();

router.post("/", protect, hotelContainRoomNumber, isRoomAvailable, createBooking);
router.get("/:id", protect, isBookingOwner, getBooking); // id => bookingID
router.delete("/:id", protect, isBookingOwner, deleteBooking); // cancel reservation, id => bookingID
router.post("/webHook", webhookCheckout);
router.get("/reservations/:id", getUserRerservations);

module.exports = router;
