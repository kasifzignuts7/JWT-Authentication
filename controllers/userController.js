const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// JWT sign token function
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
      return res
        .cookie("jwt", jwtToken, {
          maxAge: 1000 * 60 * 60 * 24,
          httpOnly: true,
          secure: true,
        })
        .json({
          message: "success",
          id: foundUser._id,
          error: false,
        });
    } else {
      // if no user found, create one and response with token
      const newUser = await User.create({ email, password });

      const jwtToken = createToken(newUser._id);
      return res
        .cookie("jwt", jwtToken, {
          maxAge: 1000 * 60 * 60 * 24,
          httpOnly: true,
          secure: true,
        })
        .json({
          message: "success",
          id: newUser._id,
          error: false,
        });
    }
  } catch (err) {
    return res.status(200).json({ error: true, message: err.message });
  }
};

// controller for logging out
const logout = (req, res) => {
  // clear the cookie
  return res.clearCookie("jwt").status(200).json({
    message: "success",
  });
};

module.exports = { auth, logout };
