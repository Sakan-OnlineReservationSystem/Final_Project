const express = require("express");
const {
    createRoomNumber,
    deleteRoomNumber,
    isRoomNumberOwner
} = require("../controllers/roomNumber.js");

const { verifyAdmin } = require("../utils/verifyToken.js");
const { isRoomOwner } = require("../controllers/room.js");

const router = express.Router();

router.use(protect, isOwner);

//CREATE
router.post("/:id/:hotelid", isRoomOwner, createRoomNumber);

//DELETE
router.delete("/:id/:hotelid", isRoomNumberOwner, deleteRoomNumber);

module.exports = router;