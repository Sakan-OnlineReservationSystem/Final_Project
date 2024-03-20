const express = require("express");
const {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom,
  updateRoomAvailability,
} = require("../controllers/room.js");
const { verifyAdmin, verifyToken } = require("../utils/verifyToken.js");

const router = express.Router();
//CREATE
router.post("/:hotelid", verifyToken, verifyAdmin, createRoom);

//UPDATE
router.put("/availability/:id/:roomNumber", updateRoomAvailability);
router.put("/:id", verifyToken, verifyAdmin, updateRoom);
//DELETE
router.delete("/:id/:hotelid", verifyToken, verifyAdmin, deleteRoom);
//GET

router.get("/:id", getRoom);
//GET ALL

router.get("/", getRooms);

module.exports = router;
