const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");

// PORT on Express server will run
const PORT = 3000;

//JWT secret key, It will used for signing and verifying the tokens. Keep it safe and strong.
const secretKey = "MyStrongSecretKey";

//Mongo db url, If you have remote mongoDB url you can replace with the same
const mongoURL = "mongodb://127.0.0.1:27017/JWTAuth";

//Some neccessary express configuration
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

/*
 * Mongo database connection function
 *
 * This IIFE function connects the Node.js application to a MongoDB database
 * and starts the Express server upon successful connection.
 * If the connection to the database fails, it logs an error and gracefully exits the process.
 */
(async () => {
  try {
    await mongoose.connect(mongoURL);
    app.listen(PORT, console.log(`Server started on port: ${PORT}!`));
  } catch (error) {
    console.log("DB Connection Error: ", error);
    process.exit();
  }
})();

// MongoDB User Schema Definition
const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Creating a MongoDB Model based on the userSchema
const User = mongoose.model("user", userSchema);

/*
 * Express Middleware for JWT Authentication
 *
 * This middleware checks for the presence of a JWT token in the cookies of incoming requests.
 * If a valid token is found, it decodes the token, verifies its authenticity, and retrieves user information.
 * The user information is then attached to the 'res.locals' object for easy access in Static EJS file.
 * If no token is present or the token is invalid, the 'res.locals.user' is set to null.
 */
async function authMiddleware(req, res, next) {
  // Check for the presence of a JWT token in cookies
  const jwtToken = req.cookies["jwt"];

  try {
    if (jwtToken) {
      // Decode and verify the JWT token
      const decodedToken = jwt.verify(jwtToken, secretKey);

      if (!decodedToken) {
        // Set 'res.locals.user' to null if the decoded token is invalid
        res.locals.user = null;
        next();
      }

      // Find user based on the decoded token's ID
      const findUser = await User.findOne({ _id: decodedToken.id });
      if (!findUser) throw new Error("Invalid Token!");

      // Set the user data in response locals so that we can access it in client side file(homepage)
      res.locals.user = {
        id: findUser._id,
        name: findUser.name,
        email: findUser.email,
      };
      next();
    } else {
      // Set 'res.locals.user' to null if no token is present
      res.locals.user = null;
      next();
    }
  } catch (error) {
    console.log("Auth middleware error: ", error);
    next();
  }
}

// Route for the homepage, verify jwtToken if any using authMiddleware
app.get("/", authMiddleware, (req, res) => {
  res.render("homepage.ejs");
});

// Route for the signup page
app.get("/signup", (req, res) => {
  // Render the signup page with user data (set to null for initial state)
  res.render("signup.ejs", { user: null });
});

// Route for the login page
app.get("/login", (req, res) => {
  // Render the login page with user data (set to null for initial state)
  res.render("login.ejs", { user: null });
});

// Route for logging out, clears the JWT cookie and redirects to the homepage
app.get("/logout", (req, res) => {
  res.clearCookie("jwt").redirect("/");
});

// POST route for signup user
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the user with the provided email already exists
    const findUser = await User.findOne({ email });

    if (findUser) {
      // If the user exists, return a 400 response with a message
      return res.status(400).send("User already exist. Try to login.");
    } else {
      // Create a new user in the database
      const newUser = await User.create({ name, email, password });

      // Generate a JWT token for the newly created user
      const jwtToken = jwt.sign(
        { id: newUser._id, name: newUser.name, email: newUser.email },
        secretKey,
        {
          expiresIn: "1d",
        }
      );

      // Set the user data in response locals so that we can access it in client side file(homepage)
      res.locals.user = {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      };

      // Set the JWT token in cookie, and redirect to the homepage
      return res
        .status(201)
        .cookie("jwt", jwtToken, {
          maxAge: 1000 * 60 * 60 * 24,
          httpOnly: true,
          secure: true,
        })
        .redirect("/");
    }
  } catch (error) {
    console.log("Sign up error: ", error);
    return res.status(500).send("Something went wrong!!");
  }
});

// POST route for login user
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Find a user with the provided email and password in the database
  const findUser = await User.findOne({ email, password });

  // If no user is found, return a 400 status and redirect to the homepage
  if (!findUser) {
    return res.redirect("/signup");
  } else {
    // If a user is found, generate a JWT token with user information
    const jwtToken = jwt.sign(
      { id: findUser._id, name: findUser.name, email: findUser.email },
      secretKey,
      {
        expiresIn: "1d",
      }
    );

    // Set the user data in response locals so that we can access it in client side file(homepage)
    res.locals.user = {
      id: findUser._id,
      name: findUser.name,
      email: findUser.email,
    };

    // Set the JWT token in cookie, and redirect to the homepage
    return res
      .status(200)
      .cookie("jwt", jwtToken, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        secure: true,
      })
      .redirect("/");
  }
});
