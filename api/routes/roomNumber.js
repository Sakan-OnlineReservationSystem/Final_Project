const express = require("express");
const {
    createRoomNumber,
    deleteRoomNumber,
    isRoomNumberOwner
} = require("../controllers/roomNumber.js");

const { isRoomOwner } = require("../controllers/room.js");
const { protect } = require("../controllers/auth.js");

const router = express.Router();

router.use(protect);

//CREATE
router.post("/:id/:hotelid", isRoomOwner, createRoomNumber);

//DELETE
router.delete("/:id/:hotelid", isRoomNumberOwner, deleteRoomNumber);

module.exports = router;