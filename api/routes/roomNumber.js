const express = require("express");
const {
    createRoomNumber,
    deleteRoomNumber
} = require("../controllers/roomNumber.js");

const { verifyAdmin } = require("../utils/verifyToken.js");

const router = express.Router();

//CREATE
router.post("/:hotelid", createRoomNumber);

//DELETE
router.delete("/:id/:hotelid", deleteRoomNumber);

module.exports = router;