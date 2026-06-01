const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const cmpntController = require("../controllers/cmpntController");

const router = express.Router();

// 델타웹 컴포넌트 저장
router.post("/cmpnt", authMiddleware, cmpntController.createCmpnt);

// 델타웹 컴포넌트 수정
router.put("/cmpnt/:cmpnt_seq", authMiddleware, cmpntController.updateCmpnt);
router.patch("/cmpnt/:cmpnt_seq", authMiddleware, cmpntController.updateCmpnt);

// 델타웹 컴포넌트 삭제
router.delete("/cmpnt/:cmpnt_seq", authMiddleware, cmpntController.deleteCmpnt);

// 델타웹 컴포넌트 조회
router.get("/cmpnt", authMiddleware, cmpntController.getCmpnt);

module.exports = router;