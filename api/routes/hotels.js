const express = require("express");
const {
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  getHotel,
  getHotelRooms,
  getHotels,
  updateHotel,
  getAvailableRooms,
  getOwnerHotels,
} = require("../controllers/hotel.js");
const Hotel = require("../models/Hotel.js");
const { verifyAdmin } = require("../utils/verifyToken.js");
const router = express.Router();

//CREATE
router.post("/", createHotel);

//UPDATE
router.put("/:id", updateHotel);

//DELETE
router.delete("/:id", deleteHotel);
//GET

router.get("/find/:id", getHotel);
//GET ALL

router.get("/ownerHotels/:id", getOwnerHotels);

router.get("/", getHotels);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/available/:id/:from/:to", getAvailableRooms);

module.exports = router;
