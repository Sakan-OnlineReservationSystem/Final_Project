const express = require("express");
const {
  login,
  register,
  forgotPassword,
  resetPassword,
  updatePassword,
  protect,
} = require("../controllers/auth.js");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgotPassword", forgotPassword);
router.post("/updatePassword", protect, updatePassword);
router.patch("/resetPassword/:token", resetPassword);
module.exports = router;
