const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const privatePage = require("../controllers/privateController");
const { auth } = require("../controllers/userController");

router.post("/auth", auth);
router.get("/private", authMiddleware, privatePage);

module.exports = router;
