const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const {
  generateClientToken,
  createOrder,
  captureOrder,
  sayHello,
  webhookCheckout,
} = require("../controllers/payment.js");

const router = express.Router();
router.get("/order/:bookingId", createOrder);

router.post("/token/:trackingId", generateClientToken);

router.get("/order/:orderID/:bookingId", captureOrder);

router.get("/sayHello", sayHello);

router.get("/sayHello", sayHello);

router.post("/webHook", webhookCheckout);

module.exports = router;
