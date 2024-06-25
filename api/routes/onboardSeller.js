const express = require("express");
const {
  callReferralsApi,
  getMerchantId,
  getOrder,
  isPaymentVerified,
} = require("../controllers/onboardSeller");
const { protect } = require("../controllers/auth.js");

const router = express.Router();

router.get("/", protect, callReferralsApi);
router.get("/isPaymentVerified/:hotelId", protect, isPaymentVerified);
router.get("/merchantId", protect, getMerchantId);
router.get("/getOrder/:orderId", protect, getOrder);

module.exports = router;
