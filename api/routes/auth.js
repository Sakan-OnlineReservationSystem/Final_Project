const express = require("express");
const {
  login,
  register,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth.js");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgotPassword", forgotPassword);
router.patch("/resetPassword/:token", resetPassword);
module.exports = router;
