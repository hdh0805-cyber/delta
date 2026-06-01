const jobService = require("../services/jobService");

const success = (res, data = {}) => {
    return res.json({
        result: "ok",
        code: "100",
        message: "success",
        data
    });
};

const fail = (res, status, code, message) => {
    return res.status(status).json({
        result: "fail",
        code,
        message,
        data: {}
    });
};

// RPA 작업 저장
// POST /api/job
exports.createJob = async (req, res) => {
    try {
        const { document_no } = req.body;

        if (!document_no) {
            return fail(res, 400, "400", "document_no 값이 없습니다.");
        }

        const job_seq = await jobService.createJob({
            document_no
        });

        return success(res, {
            job_seq
        });

    } catch (err) {
        console.error(err);
        return fail(res, 500, "500", "RPA 작업 저장 중 서버 오류");
    }
};

// RPA 작업 수정
// PUT/PATCH /api/job/:job_seq
exports.updateJob = async (req, res) => {
    try {
        const { job_seq } = req.params;

        const {
            job_status,
            job_err_msg
        } = req.body;

        if (!job_seq) {
            return fail(res, 400, "400", "job_seq 값이 없습니다.");
        }

        if (!job_status) {
            return fail(res, 400, "400", "job_status 값이 없습니다.");
        }

        const updated = await jobService.updateJob(
            job_seq,
            {
                job_status,
                job_err_msg
            }
        );

        if (!updated) {
            return fail(res, 404, "404", "수정할 RPA 작업을 찾을 수 없습니다.");
        }

        return success(res);

    } catch (err) {
        console.error(err);
        return fail(res, 500, "500", "RPA 작업 수정 중 서버 오류");
    }
};

// RPA 작업 삭제
// DELETE /api/job/:job_seq
exports.deleteJob = async (req, res) => {
    try {
        const { job_seq } = req.params;

        if (!job_seq) {
            return fail(res, 400, "400", "job_seq 값이 없습니다.");
        }

        const deleted = await jobService.deleteJob(job_seq);

        if (!deleted) {
            return fail(res, 404, "404", "삭제할 RPA 작업을 찾을 수 없습니다.");
        }

        return success(res);

    } catch (err) {
        console.error(err);
        return fail(res, 500, "500", "RPA 작업 삭제 중 서버 오류");
    }
};

// RPA 작업 조회
// GET /api/job?document_no=
exports.getJob = async (req, res) => {
    try {
        const { document_no } = req.query;

        const job = await jobService.getJob({
            document_no
        });

        return success(res, {
            job
        });

    } catch (err) {
        console.error(err);
        return fail(res, 500, "500", "RPA 작업 조회 중 서버 오류");
    }
};
