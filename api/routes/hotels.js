const express = require("express");
const {
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  getHotel,
  getHotels,
  updateHotel,
  getAvailableRooms,
  getOwnerHotels,
  isHotelOwner,
} = require("../controllers/hotel.js");
const Hotel = require("../models/Hotel.js");
const { verifyAdmin } = require("../utils/verifyToken.js");
const { protect, isNormalUser, isOwner } = require("../controllers/auth.js");

const router = express.Router();

router.get("/", getHotels);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/available/:id", getAvailableRooms);
router.get("/find/:id", getHotel);

router.use(protect);

//CREATE
router.post("/", createHotel);

//UPDATE
router.put("/:id", isHotelOwner, updateHotel);

//DELETE
router.delete("/:id", isHotelOwner, deleteHotel);

//GET ALL
router.get("/ownerHotels", getOwnerHotels);

module.exports = router;
