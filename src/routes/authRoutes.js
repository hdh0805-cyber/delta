const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

// 로그인
// POST /api/login
router.post("/login", authController.login);

module.exports = router;