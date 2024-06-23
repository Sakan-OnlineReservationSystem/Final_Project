const Booking = require("../models/Booking");
const Room = require("../models/Room");
const RoomNumber = require("../models/RoomNumber");

exports.createRoomNumber = catchAsync(async (req, res, next) => {
    const roomId = req.params.id;
    const room = await RoomNumber.findOne({
        roomId: roomId,
        roomNumber: req.body.roomNumber
    });
    if (room)
        res.status(404).json("roomNumber already exists");
    const newRoom = new RoomNumber();
    newRoom.roomNumber = req.body.roomNumber;
    newRoom.roomId = roomId;
    const savedRoom = await newRoom.save();
    try {
        await Room.findByIdAndUpdate(roomId, {
            $push: { roomNumbers: savedRoom._id }
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
    try {
        await Room.findByIdAndUpdate(roomId, {
            $pull: { roomNumbers: roomNumber._id },
        });
    } catch (err) {
        next(err);
    }
    await RoomNumber.findByIdAndDelete(req.params.id);
    res.status(200).json("RoomNumber has been deleted.");
});

exports.isRoomNumberOwner = catchAsync(async (req, res, next) => {
    const hotel = await Hotel.findById(req.params.hotelid);
    const roomNumber = await RoomNumber.findById(req.params.id);
    if (!hotel) {
      return next(new AppError("No Hotel with this id", 404));
    }
    for (let i = 0; i < hotel.rooms.length; i++) {
      if (!(hotel.rooms[i].toString() === roomNumber.roomId.toString()))
        continue;
      if (hotel.ownerId.toString() === req.user._id.toString()) {
        next();
      } else {
        return next(
          new AppError("Not Authorized, you are not the owner of this hotel", 401)
        );
      }
    }
    res.status(403).json("request error the roomNumber doesn't exist in the hotel");
  });