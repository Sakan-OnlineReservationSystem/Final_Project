const express = require("express");
const {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom,
  getHotelRooms,
  createRooms,
} = require("../controllers/room.js");

const { verifyAdmin } = require("../utils/verifyToken.js");

const router = express.Router();

//CREATE
router.post("/:hotelid", createRoom);
router.post("multible/:hotelid", createRooms);

//UPDATE
router.put("/:id", updateRoom);

//DELETE
router.delete("/:id/:hotelid", deleteRoom);

//GET
router.get("/:id", getRoom);

//GET ALL
router.get("/", getRooms);

router.get("/hotelRooms/:id", getHotelRooms);

module.exports = router;
