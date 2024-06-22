const Room = require("../models/Room.js");
const Hotel = require("../models/Hotel.js");
const RoomNumber = require("../models/RoomNumber.js");
const catchAsync = require("../utils/catchAsync.js");
const Booking = require("../models/Booking.js");
const { getOrSetCache, deleteCache, setCache } = require("../utils/redis.js");

exports.createRoom = catchAsync(async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Room(req.body.room);
  var roomNumbers = [];
  let hotel;
  try {
    hotel = await Hotel.findByIdAndUpdate(hotelId, {
      $push: { rooms: savedRoom._id },
    });
  } catch (err) {
    next(err);
  }
  for (let i = 0; i < req.body.roomNumbers.length; i++) {
    const newRoomNumber = new RoomNumber({
      roomId: savedRoom._id,
      roomNumber: req.body.roomNumbers[i],
    });
    await newRoomNumber.save();
    roomNumbers.push(newRoomNumber._id);
  }
  newRoom.roomNumbers = roomNumbers;
  const savedRoom = await newRoom.save();
  await setCache(`rooms?id=${savedRoom._id}`, savedRoom);
  await deleteCache(`hotelRooms?id=${hotelId}`);
  await deleteCache(`ownerHotels?id=${hotel.ownerId}`);
  await setCache(`hotels?id=${hotelId}`, hotel);
  res.status(200).json(savedRoom);
});

exports.createRooms = catchAsync(async (req, res, next) => {
  const hotelId = req.params.id;
  let savedRooms = [];
  for (let i = 0; i < req.body.rooms.length; i++) {
    var newRoom = new Room(req.body.rooms[i].room);
    var roomNumbers = [];
    let hotel;
    try {
      hotel = await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
      next(err);
    }
    for (let i = 0; i < req.body.rooms[i].roomNumbers.length; i++) {
      const newRoomNumber = new RoomNumber({
        roomId: savedRoom._id,
        roomNumber: req.body.rooms[i].roomNumbers[i],
      });
      await newRoomNumber.save();
      roomNumbers.push(newRoomNumber._id);
    }
    newRoom.roomNumbers = roomNumbers;
    const savedRoom = await newRoom.save();
    await setCache(`rooms?id=${savedRoom._id}`, savedRoom);
    await deleteCache(`hotelRooms?id=${hotelId}`);
    await deleteCache(`ownerHotels?id=${hotel.ownerId}`);
    await setCache(`hotels?id=${hotelId}`, hotel);
    savedRooms.push(savedRoom);
  }
  res.status(200).json(savedRooms);
});

exports.updateRoom = catchAsync(async (req, res, next) => {
  const updatedRoom = await Room.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );
  await setCache(`rooms?id=${updatedRoom._id}`, updatedRoom);
  res.status(200).json(updatedRoom);
});

exports.deleteRoom = catchAsync(async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const roomNumbers = await RoomNumber.find({ roomId: req.params.id });
  for (let i = 0; i < roomNumbers.length; i++) {
    var booking = await Booking.findOne({
      room: roomNumbers[i]._id,
      to: { $gte: new Date(Date.now()) }
    });
    if (booking)
      res.status(403).json("can't delete the room there is an upcoming reservation")
  }
  await Room.findByIdAndDelete(req.params.id);
  await RoomNumber.deleteMany({ roomId: req.params.id });
  let hotel;
  try {
    hotel = await Hotel.findByIdAndUpdate(hotelId, {
      $pull: { rooms: req.params.id },
    });
  } catch (err) {
    next(err);
  }
  await deleteCache(`rooms?id=${req.params.id}`);
  await deleteCache(`hotelRooms?id=${hotelId}`);
  await deleteCache(`ownerHotels?id=${hotel.ownerId}`);
  await setCache(`hotels?id=${hotelId}`, hotel);
  res.status(200).json("Room has been deleted.");
});

exports.getRoom = catchAsync(async (req, res, next) => {
  const room = await getOrSetCache(`rooms?id=${req.params.id}`, async () => {
    const room = await Room.findById(req.params.id);
    return room;
  });
  res.status(200).json(room);
});

exports.getRooms = catchAsync(async (req, res, next) => {
  const rooms = await Room.find();
  res.status(200).json(rooms);
});

exports.getHotelRooms = catchAsync(async (req, res, next) => {
  const list = await getOrSetCache(
    `hotelRooms?id=${req.params.id}`,
    async () => {
      const hotel = await Hotel.findById(req.params.id);
      const list = await Promise.all(
        hotel.rooms.map((room) => {
          return Room.findById(room);
        })
      );
      return list;
    }
  );
  res.status(200).json(list);
});
