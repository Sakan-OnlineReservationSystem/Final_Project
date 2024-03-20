const jwt = require("jsonwebtoken");
const { AppError } = require("../utils/appError.js");
const catchAsync = require("./catchAsync.js");
const { promisify } = require("util");
const User = require("../models/User.js");

exports.verifyToken = catchAsync(async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access", 401)
    );
  }
  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }
  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password! Please log in again.", 401)
    );
  }
  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});

exports.verifyUser = (req, res, next) => {
  if (req.user._id === req.params.id || req.user.isAdmin) {
    next();
  } else {
    return next(new AppError("You are not authorized!", 403));
  }
};

exports.verifyAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    return next(new AppError("You are not authorized!", 403));
  }
};
