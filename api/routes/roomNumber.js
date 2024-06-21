const express = require("express");
const {
    createRoomNumber,
    deleteRoomNumber
} = require("../controllers/roomNumber.js");

const { verifyAdmin } = require("../utils/verifyToken.js");

const router = express.Router();

//CREATE
router.post("/:roomid", createRoomNumber);

//DELETE
router.delete("/:id", deleteRoomNumber);

module.exports = router;