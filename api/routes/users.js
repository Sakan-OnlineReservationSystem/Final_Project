const express = require("express");
const {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
  getBookings,
} = require("../controllers/user.js");
const {
  verifyAdmin,
  verifyToken,
  verifyUser,
} = require("../utils/verifyToken.js");

const router = express.Router();

// router.get("/checkauthentication", verifyToken, (req,res,next)=>{
//   res.send("hello user, you are logged in")
// })

// router.get("/checkuser/:id", verifyUser, (req,res,next)=>{
//   res.send("hello user, you are logged in and you can delete your account")
// })

// router.get("/checkadmin/:id", verifyAdmin, (req,res,next)=>{
//   res.send("hello admin, you are logged in and you can delete all accounts")
// })

//UPDATE
router.put("/:id", verifyUser, updateUser);

//DELETE
router.delete("/:id", verifyUser, deleteUser);

//GET
router.get("/:id", verifyUser, getUser);

//GET ALL
router.get("/", verifyAdmin, getUsers);

router.get("/bookings/:id", getBookings);

module.exports = router;
