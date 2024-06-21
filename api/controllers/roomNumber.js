const Booking = require("../models/Booking");
const Room = require("../models/Room");
const RoomNumber = require("../models/RoomNumber");

exports.createRoomNumber = catchAsync(async (req, res, next) => {
    const roomId = req.params.roomid;
    const room = await RoomNumber.findOne({
        roomId : roomId,
        roomNumber : req.body.roomNumber
    });
    if (room)
        res.status(404).json("roomNumber already exists");
    const newRoom = new RoomNumber();
    newRoom.roomNumber = req.body.roomNumber;
    newRoom.roomId = roomId;
    const savedRoom = await newRoom.save();
    try {
        await Room.findByIdAndUpdate(roomId, {
            $push: { roomNumbers: req.body.roomNumber }
        });
    } catch (err) {
        next(err);
    }
    res.status(200).json(savedRoom);
});

exports.deleteRoomNumber = catchAsync(async (req, res, next) => {
    const roomNumber = await RoomNumber.findById(req.params.id);
    const roomId = roomNumber.roomId;
    const booking = await Booking.findOne({
        room: req.params.id,
        to: { $gte: new Date(Date.now()) }
    });
    if (booking)
        res.status(403).json("can't delete the roomNumber there is an upcoming reservation");
    await RoomNumber.findByIdAndDelete(req.params.id);
    try {
        await Room.findByIdAndUpdate(roomId, {
          $pull: { roomNumbers: roomNumber.roomNumber },
        });
      } catch (err) {
        next(err);
      }
    
    res.status(200).json("RoomNumber has been deleted.");
});