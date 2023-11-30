const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authMiddleware = (req, res) => {
  const token = req.cookies["jwt"];
  try {
    // check for token in cookie
    if (token) {
      jwt.verify(token, "MyStrongSecretKey", async (err, decodedToken) => {
        // error in verifying token
        if (err) {
          return res.json({ error: true, id: null, message: "invalid token" });
        } else {
          // find the user with decoded token's id
          const user = await User.findById(decodedToken.id);

          if (user) {
            // user found
            return res.json({ error: false, id: user._id, message: "success" });
          } else {
            // user not found
            return res.json({
              error: true,
              id: null,
              message: "invalid token",
            });
          }
        }
      });
    } else {
      // no token found
      return res.json({ error: true, id: null, message: "no token found" });
    }
  } catch (error) {
    console.log("Auth middleware error:", error);
    return res.json({ error: true, id: null, message: "something went wrong" });
  }
};

module.exports = authMiddleware;
