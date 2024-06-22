const Hotel = require("../models/Hotel.js");
const Room = require("../models/Room.js");
const RoomNumber = require("../models/RoomNumber.js");
const Booking = require("../models/Booking.js");
const catchAsync = require("../utils/catchAsync.js");
const uploadImages = require("../utils/cloudinary.js");
const { getOrSetCache, deleteCache, setCache } = require("../utils/redis.js");
const AppError = require("../utils/appError.js");

exports.createHotel = catchAsync(async (req, res, next) => {
  if (req.body.photos) {
    const imageUrls = await uploadImages(req.body.photos);
    req.body.photos = imageUrls;
  }
  const newHotel = new Hotel(req.body);
  const savedHotel = await newHotel.save();
  await setCache(`hotels?id=${savedHotel._id}`, savedHotel);
  await deleteCache(`ownerHotels?id=${savedHotel.ownerId}`);
  res.status(200).json(savedHotel);
});

exports.updateHotel = catchAsync(async (req, res, next) => {
  const updatedHotel = await Hotel.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );
  await setCache(`hotels?id=${updatedHotel._id}`, updatedHotel);
  await deleteCache(`ownerHotels?id=${updatedHotel.ownerId}`);
  res.status(200).json(updatedHotel);
});

exports.deleteHotel = catchAsync(async (req, res, next) => {
  await Hotel.findByIdAndDelete(req.params.id);
  const hotel = await Hotel.findById(req.params.id);
  const booking = await Booking.findOne({
    hotel: req.params.id,
    to: { $gte: new Date(Date.now()) },
  });
  if (booking)
    res
      .status(403)
      .json("can't delete the hotel there is an upcoming reservation");
  for (let i = 0; i < hotel.rooms.length; i++) {
    await Room.findByIdAndDelete(hotel.rooms[i]);
    await RoomNumber.deleteMany({ roomId: hotel.rooms[i] });
  }
  await deleteCache(`hotels?id=${req.params.id}`);
  await deleteCache(`ownerHotels?id=${hotel.ownerId}`);
  res.status(200).json("Hotel has been deleted.");
});

exports.getHotel = catchAsync(async (req, res, next) => {
  const hotel = await getOrSetCache(`hotels?id=${req.params.id}`, async () => {
    const hotel = await Hotel.findById(req.params.id);
    return hotel;
  });
  res.status(200).json(hotel);
});

exports.getOwnerHotels = catchAsync(async (req, res, next) => {
  const hotels = await getOrSetCache(
    `ownerHotels?id=${req.params.id}`,
    async () => {
      const hotels = await Hotel.find().where({ ownerId: req.params.id });
      return hotels;
    }
  );
  res.status(200).json(hotels);
});

exports.getHotels = catchAsync(async (req, res, next) => {
  const queryObj = { ...req.query };
  const excludedTerms = [
    "page",
    "sort",
    "limit",
    "aminities",
    "checkIn",
    "checkOut",
    "rooms",
    "maxPeople",
    "stars",
    "min",
    "max",
    "adults",
    "children",
    "reviewScore",
    "roomFacilities",
  ];
  excludedTerms.forEach((term) => delete queryObj[term]);

  // checkInDate and checkOutDate
  let checkInDate = new Date();
  let checkOutDate = new Date();
  if (!req.query.checkIn || !req.query.checkOut) {
    checkOutDate.setDate(checkInDate.getDate() + 2);
  } else {
    checkInDate = new Date(req.query.checkIn);
    checkOutDate = new Date(req.query.checkOut);
  }

  // avaiable Rooms
  const minAvailableRooms = req.query.rooms * 1 || 1;
  // pagination
  const limit = req.query.limit * 1 || 10;
  const page = req.query.page * 1 || 1;
  const skip = (page - 1) * limit;

  // sort
  let sortBy;
  if (req.query.sort) {
    sortBy = req.query.sort.split(",").join(" ");
  } else {
    sortBy = "distance";
  }

  // search by city
  if (req.query.city) {
    queryObj.city = new RegExp(`\\b${req.query.city}`, "i");
  }

  // filter by room facilities
  const matchStages = [];
  if (req.query.roomFacilities) {
    const roomFacilities = req.query.roomFacilities
      .split(",")
      .map((facility) => new RegExp(facility, "i"));

    matchStages.push({
      $match: {
        "roomDetails.roomFacilities": { $all: roomFacilities },
      },
    });
  }

  // applay search first
  const searchHotels = await Hotel.aggregate([
    { $match: queryObj },
    // { $unwind: "$rooms" },
    // {
    //   $lookup: {
    //     from: "rooms",
    //     localField: "rooms",
    //     foreignField: "_id",
    //     as: "roomDetails",
    //   },
    // },
    // { $unwind: "$roomDetails" }, // Unwind the roomDetails array
    // // { $unwind: "$roomDetails.roomNumbers" },
    // {
    //   $match: {
    //     "roomDetails.adults": req.query.adults * 1 || { $gte: 0 },
    //     "roomDetails.children": req.query.children * 1 || { $gte: 0 },
    //     "roomDetails.maxPeople": { $gte: req.query.maxPeople * 1 || 1 }, // Filter rooms based on maxPeople
    //     // "roomDetails.roomNumbers.unavailableDates": {
    //     //   $not: {
    //     //     $elemMatch: { $gte: checkInDate, $lt: checkOutDate }, // Filter out unavailable dates
    //     //   },
    //     // },
    //   },
    // },
    // ...matchStages,
    // { $group: { _id: "$_id", numRooms: { $sum: 1 } } }, // Group by hotel and count number of rooms
    // { $match: { numRooms: { $gte: minAvailableRooms } } }, // Filter hotels based on minAvailableRooms
  ]);
  let query = Hotel.find({
    _id: { $in: searchHotels.map((hotel) => hotel._id) },
  });

  // filter by review Score

  if (req.query.reviewScore) {
    const reviewScores = req.query.reviewScore
      .split(",")
      .map((reviewScore) => new RegExp(reviewScore, "i"));
    query = query.find({ reviewScore: { $in: reviewScores } });
  }

  // filter by number of stars
  if (req.query.stars) {
    const numberStars = req.query.stars
      .split(",")
      .map((star) => parseInt(star));
    query = query.find({ numberOfStars: { $in: numberStars } });
  }

  // filter by hotel Facilities
  if (req.query.aminities) {
    const aminities = req.query.aminities
      .split(",")
      .map((aminity) => new RegExp(aminity, "i"));
    query = query.find({ aminity: { $all: aminities } });
  }

  // sorting and pagination
  query = query.sort(sortBy).skip(skip).limit(limit);

  const hotels = await query;
  res.status(200).json(hotels);
});

exports.countByCity = catchAsync(async (req, res, next) => {
  const cities = req.query.cities.split(",");
  const list = await Promise.all(
    cities.map((city) => {
      return Hotel.countDocuments({ city: city });
    })
  );
  res.status(200).json(list);
});

exports.countByType = catchAsync(async (req, res, next) => {
  const hotelCount = await Hotel.countDocuments({ type: "hotel" });
  const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
  const resortCount = await Hotel.countDocuments({ type: "resort" });
  const villaCount = await Hotel.countDocuments({ type: "villa" });
  const cabinCount = await Hotel.countDocuments({ type: "cabin" });

  res.status(200).json([
    { type: "hotel", count: hotelCount },
    { type: "apartments", count: apartmentCount },
    { type: "resorts", count: resortCount },
    { type: "villas", count: villaCount },
    { type: "cabins", count: cabinCount },
  ]);
});

exports.getAvailableRooms = catchAsync(async (req, res, next) => {
  // console.log(req.query);
  if (!(req.query.from && req.query.to))
    res.status(404).json("request must contain from and to");
  const hotel = await Hotel.findById(req.params.id);
  const rooms = await Promise.all(
    hotel.rooms.map((room) => {
      return Room.findById(room);
    })
  );
  const booking = await Booking.find({
    hotel: hotel._id,
    $or: [
      {
        from: { $lte: new Date(req.query.from) },
        to: { $gte: new Date(req.query.from) },
      },
      {
        from: { $lte: new Date(req.query.to) },
        to: { $gte: new Date(req.query.to) },
      },
      { from: { $lte: new Date(req.query.to), $gte: new Date(req.query.from) } },
      { to: { $lte: new Date(req.query.to), $gte: new Date(req.query.from) } },
    ],
  });
  const b = booking.map((book) => {
    return String(book.room._id);
  });
  let roomsList = [];
  for (let j = 0; j < rooms.length; j++) {
    var roomNumbers = await RoomNumber.find({ roomId: rooms[j]._id });
    var roomNumbersList = [];
    for (let i = 0; i < roomNumbers.length; i++) {
      if (b.includes(String(roomNumbers[i]._id))) continue;
      roomNumbersList.push(roomNumbers[i]);
    }
    if (roomNumbersList.length > 0) {
      var roomResult = {
        room: rooms[j],
        roomNumbers: roomNumbersList,
      };
      roomsList.push(roomResult);
    }
  }
  res.status(200).json(roomsList);
});

exports.isHotelOwner = catchAsync(async (req, res, next) => {
  const hotel = await Hotel.findById(req.params.id).select("ownerId");
  if (!hotel) {
    return next(new AppError("No Hotel with this id", 404));
  }
  if (hotel.ownerId.toString() === req.user._id.toString()) {
    next();
  } else {
    return next(
      new AppError("Not Authorized, you are not the owner of this hotel", 401)
    );
  }
});
