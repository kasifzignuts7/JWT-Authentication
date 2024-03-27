const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// JWT sign token helper function
const createToken = (id) => {
  return jwt.sign({ id }, "MyStrongSecretKey", {
    expiresIn: "1d",
  });
};

// controller for authentication
const auth = async (req, res) => {
  const { email, password } = req.body;

  try {
    // try to login
    const foundUser = await User.login(email, password);

    // if credentials found ok, then reponse with jwt
    if (foundUser) {
      const jwtToken = createToken(foundUser._id);
      return res.status(200).json({
        message: "success",
        id: foundUser._id,
        jwt: jwtToken,
        error: false,
      });
    } else {
      // if no user found, create one and response with token
      const newUser = await User.create({ email, password });

      const jwtToken = createToken(newUser._id);
      return res.status(200).json({
        message: "success",
        id: newUser._id,
        jwt: jwtToken,
        error: false,
      });
    }
  } catch (err) {
    console.log("Auth :", error);
    return res.status(500).json({ error: true, message: err.message });
  }
};

module.exports = { auth };
