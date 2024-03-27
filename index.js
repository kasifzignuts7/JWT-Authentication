const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes/routes");

// constants
const PORT = 5000;
const databaseURL = "mongodb://127.0.0.1:27017/JWTAuth";

// some necessary express middlewares configuration
app.use(express.json());

// putting react app url in white list
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// database connection, using IIFE
(async () => {
  try {
    await mongoose.connect(databaseURL);
    app.listen(PORT, console.log(`Server started on port: ${PORT}!`));
  } catch (error) {
    console.log("DB Connection Error: ", error);
    process.exit();
  }
})();

// user routes
app.use("/", routes);
