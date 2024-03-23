const express = require("express");
const {
  callReferralsApi,
  getMerchantId,
} = require("../controllers/onboardSeller");
const router = express.Router();

router.get("/:userId", callReferralsApi);
router.get("/merchantId/:tracking_id", getMerchantId);

module.exports = router;
