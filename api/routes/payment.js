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
router.post("/order", createOrder);

router.post("/token/:trackingId", generateClientToken);

router.post("/order/:orderID/:trackingId", captureOrder);

router.get("/sayHello", sayHello);

router.get("/sayHello", sayHello);

router.post("/webHook", webhookCheckout);

module.exports = router;
