const express = require("express");
const {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom,
  getHotelRooms,
  isRoomOwner,
} = require("../controllers/room.js");
const { protect, isNormalUser, isOwner } = require("../controllers/auth.js");
const { verifyAdmin } = require("../utils/verifyToken.js");
const { isHotelOwner } = require("../controllers/hotel.js");

const router = express.Router();

//GET
router.get("/:id", getRoom);

//GET ALL
router.get("/", getRooms);

router.get("/hotelRooms/:id", getHotelRooms);

router.use(protect, isOwner);

//CREATE
router.post("/:id", isHotelOwner, createRoom); // check if he is the owner of hotel or not

//UPDATE
router.put("/:id/:hotelid", isRoomOwner, updateRoom); // check if he is the owner of room or not

//DELETE
router.delete("/:id/:hotelid", isRoomOwner, deleteRoom); // check if he is the owner of room or not

module.exports = router;
