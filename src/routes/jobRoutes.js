const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const jobController = require("../controllers/jobController");

const router = express.Router();

// RPA 작업 저장
// POST /api/job
router.post(
    "/job",
    authMiddleware,
    jobController.createJob
);

// RPA 작업 수정
// PUT /api/job/:job_seq
router.put(
    "/job/:job_seq",
    authMiddleware,
    jobController.updateJob
);

// PATCH /api/job/:job_seq
router.patch(
    "/job/:job_seq",
    authMiddleware,
    jobController.updateJob
);

// RPA 작업 삭제
// DELETE /api/job/:job_seq
router.delete(
    "/job/:job_seq",
    authMiddleware,
    jobController.deleteJob
);

// RPA 작업 조회
// GET /api/job?document_no=
router.get(
    "/job",
    authMiddleware,
    jobController.getJob
);

module.exports = router;