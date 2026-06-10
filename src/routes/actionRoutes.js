const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const actionController = require("../controllers/actionController");

const router = express.Router();

// RPA 세부 작업 등록
router.post("/action", authMiddleware, actionController.createAction);

// RPA 세부 작업 수정
router.put("/action/:action_seq", authMiddleware, actionController.updateAction);
router.patch("/action/:action_seq", authMiddleware, actionController.updateAction);

// RPA 세부 작업 삭제
router.delete("/action/:action_seq", authMiddleware, actionController.deleteAction);

// RPA 세부 작업 조회
router.get("/action", authMiddleware, actionController.getAction);

module.exports = router;
