const User = require("../models/User.js");
const Hotel = require("../models/Hotel.js");
const catchAsync = require("../utils/catchAsync.js");

exports.getHotels = catchAsync(async (req, res, next) => {
    const hotels = Hotel.find({ ownerId: req.params.owner });
    if (!hotels) {
        return next(new AppError("No available hotels to show", 404));
    }
    res.status(200).json(reviews);
});

