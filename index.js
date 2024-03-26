const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRoute = require("./routes/userRoute");

//Constants
const PORT = 5000;
const databaseURL = "mongodb://127.0.0.1:27017/JWTAuth";

//Some necessary express middlewares configuration
app.use(express.json());
app.use(cookieParser());

//Putting react app url in white list
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

//Database connection, using IIFE
(async () => {
  try {
    await mongoose.connect(databaseURL);
    app.listen(PORT, console.log(`Server started on port: ${PORT}!`));
  } catch (error) {
    console.log("DB Connection Error: ", error);
    process.exit();
  }
})();

//User routes
app.use("/", userRoute);
