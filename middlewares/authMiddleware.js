const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authMiddleware = (req, res, next) => {
  const token = req?.headers?.authorization.split(" ")[1];

  try {
    if (token) {
      jwt.verify(token, "MyStrongSecretKey", async (err, decodedToken) => {
        // error in verifying token
        if (err) {
          return res
            .status(401)
            .json({ error: true, id: null, message: "invalid token" });
        } else {
          // find the user with decoded token's id
          const user = await User.findById(decodedToken.id);

          // user not found
          if (!user) {
            return res.status(401).json({
              error: true,
              id: null,
              message: "invalid token",
            });
          }
          req.user = user;
          next();
        }
      });
    } else {
      // no token found
      return res
        .status(400)
        .json({ error: true, id: null, message: "no token found" });
    }
  } catch (error) {
    console.log("Auth middleware error:", error);
    return res
      .status(500)
      .json({ error: true, id: null, message: "something went wrong" });
  }
};

module.exports = authMiddleware;
