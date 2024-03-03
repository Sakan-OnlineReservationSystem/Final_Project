const Hotel = require("../models/Hotel.js");
const Room = require("../models/Room.js");

exports.createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);

  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};
exports.updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};
exports.deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted.");
  } catch (err) {
    next(err);
  }
};

exports.getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};

exports.getHotels = async (req, res, next) => {
  try {
    console.log(req.query);
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
      "numberOfStars",
      "min",
      "max",
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

    // applay search first
    const searchHotels = await Hotel.aggregate([
      { $match: queryObj },
      { $unwind: "$rooms" },
      {
        $lookup: {
          from: "rooms",
          localField: "rooms",
          foreignField: "_id",
          as: "roomDetails",
        },
      },
      { $unwind: "$roomDetails" }, // Unwind the roomDetails array
      { $unwind: "$roomDetails.roomNumbers" },
      {
        $match: {
          "roomDetails.maxPeople": { $gte: req.query.maxPeople * 1 || 1 }, // Filter rooms based on maxPeople
          "roomDetails.roomNumbers.unavailableDates": {
            $not: {
              $elemMatch: { $gte: checkInDate, $lt: checkOutDate }, // Filter out unavailable dates
            },
          },
        },
      },
      { $group: { _id: "$_id", numRooms: { $sum: 1 } } }, // Group by hotel and count number of rooms
      { $match: { numRooms: { $gte: minAvailableRooms } } }, // Filter hotels based on minAvailableRooms
    ]);

    let query = Hotel.find({
      _id: { $in: searchHotels.map((hotel) => hotel._id) },
    });

    // filter by number of stars
    if (req.query.numberOfStars) {
      const stars = req.query.numberOfStars
        .split(",")
        .map((star) => parseInt(star));
      query = query.find({ numberOfStars: { $in: stars } });
    }

    // filter by aminities
    if (req.query.aminities) {
      const aminities = req.query.aminities.split(",");
      query = query.find({ aminity: { $all: aminities } });
    }

    // sorting and pagination
    query = query.sort(sortBy).skip(skip).limit(limit);

    const hotels = await query;
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};

exports.countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
exports.countByType = async (req, res, next) => {
  try {
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
  } catch (err) {
    next(err);
  }
};

exports.getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
