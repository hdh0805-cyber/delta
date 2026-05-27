const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const documentController = require("../controllers/documentController");

const router = express.Router();

// 종이 송장 저장
// POST /api/document
router.post("/document", authMiddleware, documentController.createDocument);

// 종이 송장 수정
// PUT /api/document/:document_seq
router.put("/document/:document_seq", authMiddleware, documentController.updateDocument);

// PATCH /api/document/:document_seq
router.patch("/document/:document_seq", authMiddleware, documentController.updateDocument);

// 종이 송장 삭제
// DELETE /api/document/:document_seq
router.delete("/document/:document_seq", authMiddleware, documentController.deleteDocument);

// 종이 송장 조회
// GET /api/document?document_seq=&document_no=
router.get("/document", authMiddleware, documentController.getDocument);

module.exports = router;