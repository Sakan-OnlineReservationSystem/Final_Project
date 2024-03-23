const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth.js");
const usersRoute = require("./routes/users.js");
const hotelsRoute = require("./routes/hotels.js");
const roomsRoute = require("./routes/rooms.js");
const onboardSellerRoute = require("./routes/onboardSeller.js");
const reviewssRoute = require("./routes/reviews.js");

const cookieParser = require("cookie-parser");
const cors = require("cors");
const globalErrorHandler = require("./controllers/error.js");
const castQuery = require("./utils/castQuery.js");

const onboardSeller = require("./controllers/onboardSeller.js");

const PORT = process.env.PORT || 8800;

const app = express();
dotenv.config();

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

const corsOptions = {
  origin: [
    "https://final-project-sigma-ochre.vercel.app",
    "'https://localhost:3000",
  ],
  default: "https://localhost:3000",
};

app.all("*", function (req, res, next) {
  const origin = corsOptions.origin.includes(req.header("origin").toLowerCase())
    ? req.headers.origin
    : corsOptions.default;
  res.header("Access-Control-Allow-Origin", origin);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
//middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use(castQuery);

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/onboardSeller", onboardSellerRoute);
app.use("/api/reviews", reviewssRoute);

app.use(globalErrorHandler);

app.listen(PORT, () => {
  connect();
  console.log("Connected to backend.");
});
