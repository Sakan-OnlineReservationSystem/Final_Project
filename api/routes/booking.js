const express = require("express");
const {
  createBooking,
  updateBooking,
  deleteBooking,
  getBooking,
  webhookCheckout,
} = require("../controllers/booking");

const router = express.Router();

router.post("/", createBooking);
router.get("/:id", getBooking); // id => bookingID
router.delete("/:id", deleteBooking); // cancel reservation, id => bookingID
router.post("/webHook", webhookCheckout);

module.exports = router;
