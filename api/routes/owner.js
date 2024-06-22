const express = require("express");
const {
    getHotels
  } = require("../controllers/owner.js");

const { protect, isNormalUser, isOwner } = require("../controllers/auth.js");

const router = express.Router();

router.use(protect, isOwner);

router.get("/:ownerId", getHotels);

module.exports = router;