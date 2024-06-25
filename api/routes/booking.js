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
  getUserRerservationsHistory,
} = require("../controllers/booking");
const { protect, isNormalUser, isOwner } = require("../controllers/auth.js");
const { checkMerchantState } = require("../controllers/onboardSeller.js");
const router = express.Router();

router.get("/reservations", protect, getUserRerservations);
router.get("/history", protect, getUserRerservationsHistory);

router.post("/webHook", webhookCheckout);
router.post(
  "/",
  protect,
  hotelContainRoomNumber,
  isRoomAvailable,
  checkMerchantState,
  createBooking
);
router.get("/:id", protect, isBookingOwner, getBooking); // id => bookingID

router.delete("/:id", protect, isBookingOwner, deleteBooking); // cancel reservation, id => bookingID

module.exports = router;
