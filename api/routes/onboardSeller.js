const express = require("express");
const {
  callReferralsApi,
  getMerchantId,
  getOrder,
} = require("../controllers/onboardSeller");
const router = express.Router();

router.get("/:tracking_id", callReferralsApi);
router.get("/merchantId/:tracking_id", getMerchantId);
router.get("/getOrder/:orderId", getOrder);

module.exports = router;
