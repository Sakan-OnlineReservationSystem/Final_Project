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
} = require("../controllers/booking");

const router = express.Router();

router.post("/", hotelContainRoomNumber, isRoomAvailable, createBooking);
router.get("/:id", getBooking); // id => bookingID
router.delete("/:id", deleteBooking); // cancel reservation, id => bookingID
router.post("/webHook", webhookCheckout);
router.get("/reservations/:id", getUserRerservations);

module.exports = router;
