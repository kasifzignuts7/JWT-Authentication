const express = require("express");
const router = express.Router();
const { auth, logout } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/profile", authMiddleware);
router.post("/auth", auth);
router.get("/logout", logout);

module.exports = router;
