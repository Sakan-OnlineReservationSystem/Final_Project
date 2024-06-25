const express = require("express");
const {
  updateMe,
  deleteUser,
  getUser,
  getUsers,
  getBookings,
} = require("../controllers/user.js");
const { protect, isNormalUser } = require("../controllers/auth.js");
const router = express.Router();

//UPDATE
router.put("/", protect, updateMe); // update me

//DELETE
router.delete("/:id", protect, deleteUser);

//GET
router.get("/:id", getUser);

//GET ALL
router.get("/", getUsers);

router.get("/bookings/:id", protect, getBookings);

module.exports = router;
