const express = require("express");
const {
  createRoom,
  deleteRoom,
  getRoom,
  getAvailableRooms,
  getRooms,
  updateRoom,
} = require("../controllers/room.js");

const { verifyAdmin } = require("../utils/verifyToken.js");

const router = express.Router();

//CREATE
router.post("/:hotelid", createRoom);

//UPDATE
router.put("/:id", updateRoom);

//DELETE
router.delete("/:id/:hotelid", deleteRoom);

//GET
router.get("/:id", getRoom);

//GET ALL
router.get("/", getRooms);

//GET
router.get("/availabe/:id", getAvailableRooms);

module.exports = router;
