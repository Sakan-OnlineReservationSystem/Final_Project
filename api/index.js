const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const authRoute = require("./routes/auth.js");
const usersRoute = require("./routes/users.js");
const hotelsRoute = require("./routes/hotels.js");
const roomsRoute = require("./routes/rooms.js");
const onboardSellerRoute = require("./routes/onboardSeller.js");
const reviewssRoute = require("./routes/reviews.js");
const paymentRoute = require("./routes/payment.js");
const ownerRoute = require("./routes/owner.js");
const bookingRoute = require("./routes/booking.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const globalErrorHandler = require("./controllers/error.js");
const castQuery = require("./utils/castQuery.js");
const onboardSeller = require("./controllers/onboardSeller.js");

const PORT = process.env.PORT || 8800;

const app = express();
dotenv.config();
const origin = process.env.ORIGIN;
const redis = require("./utils/redis.js");

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});
// await client.disconnect();
const corsOptions = {
  origin: origin,
  credentials: true,
};

// app.all("*", function (req, res, next) {
//   const origin = corsOptions.origin.includes(req.header("origin").toLowerCase())
//     ? req.headers.origin
//     : corsOptions.default;
//   res.header("Access-Control-Allow-Origin", origin);
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   res.header("Access-Control-Allow-Credentials", true);
//   next();
// });

// middleware to set headers security
app.use(helmet());

// middleware to limit too many requests from same api
// const limiter = rateLimit({
//   max: 100,
//   window: 60 * 60 * 1000,
//   message: "Too Many requests from this Ip, Please Try agian in an hour",
// });

// app.use("/api", limiter);

//middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json({ limit: "10kb" }));

// Data Sanitization against nosql query injection
app.use(mongoSanitize());

// Data Sanitization against XSS attach
app.use(xss());

app.use(castQuery);

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/onboardSeller", onboardSellerRoute);
app.use("/api/reviews", reviewssRoute);
app.use("/api/payment", paymentRoute);
app.use("/api/owner", ownerRoute);
app.use("/api/booking", bookingRoute);

app.use(globalErrorHandler);

app.listen(PORT, () => {
  connect();
  console.log("Connected to backend.");
});
