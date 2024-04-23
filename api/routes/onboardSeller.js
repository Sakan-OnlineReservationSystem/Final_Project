const express = require("express");
const {
  callReferralsApi,
  getMerchantId,
  getMerchantState,
  getOrder,
} = require("../controllers/onboardSeller");
const router = express.Router();

router.get("/:tracking_id", callReferralsApi);
router.get("/merchantId/:tracking_id", getMerchantId);
router.get("/merchantState/:tracking_id", getMerchantState);
router.get("/getOrder/:orderId", getOrder);

module.exports = router;
