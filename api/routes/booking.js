const express = require("express");
const {
  createBooking,
  updateBooking,
  deleteBooking,
  getBooking,
} = require("../controllers/booking");

const router = express.Router();

router.post("/", createBooking);
router.get("/:id", getBooking);
// router.post("/book", createBooking);
// router.post("/book", createBooking);

module.exports = router;
