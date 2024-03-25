const express = require("express");
const {
    getHotels
  } = require("../controllers/owner.js");

const router = express.Router();

router.get("/:ownerId", getHotels);

module.exports = router;