const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const {
  generateClientToken,
  createOrder,
  captureOrder,
} = require("../controllers/payment.js");

const router = express.Router();
router.get("/order/:bookingId", createOrder);

router.get("/token/:bookingId", generateClientToken);

router.get("/order/:orderID/:bookingId", captureOrder);

module.exports = router;
