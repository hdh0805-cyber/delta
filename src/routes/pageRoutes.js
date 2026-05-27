const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const pageController = require("../controllers/pageController");

const router = express.Router();

// 델타웹 페이지 조회
// GET /api/page
router.get(
    "/page",
    authMiddleware,
    pageController.getPage
);

module.exports = router;