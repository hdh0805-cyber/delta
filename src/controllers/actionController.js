const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const actionService = require("../services/actionService");

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

// BASE64 스냅샷 이미지 저장
const saveBase64Snapshot = (base64Image) => {
    const base64Data = base64Image.replace(
        /^data:image\/\w+;base64,/,
        ""
    );

    const uploadDir = path.join(
        __dirname,
        "../../uploads/action"
    );

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, {
            recursive: true
        });
    }

    const fileName = `${uuidv4()}.png`;

    const filePath = path.join(
        uploadDir,
        fileName
    );

    fs.writeFileSync(
        filePath,
        base64Data,
        "base64"
    );

    return `/uploads/action/${fileName}`;
};

// RPA 세부 작업 등록
// POST /api/action
exports.createAction = async (req, res) => {
    try {
        const {
            job_seq,
            action
        } = req.body;

        if (!job_seq) {
            return fail(res, 400, "400", "job_seq 값이 없습니다.");
        }

        if (!Array.isArray(action) || action.length === 0) {
            return fail(res, 400, "400", "action 배열 값이 없습니다.");
        }

        await actionService.createAction({
            job_seq,
            action
        });

        return success(res);

    } catch (err) {
        console.error(err);
        return fail(res, 500, "500", "RPA 세부 작업 등록 중 서버 오류");
    }
};

// RPA 세부 작업 수정
// PUT/PATCH /api/action/:action_seq
exports.updateAction = async (req, res) => {
    try {
        const { action_seq } = req.params;

        const {
            action_status,
            action_snapshot_img
        } = req.body;

        if (!action_seq) {
            return fail(res, 400, "400", "action_seq 값이 없습니다.");
        }

        if (!action_status) {
            return fail(res, 400, "400", "action_status 값이 없습니다.");
        }

        let snapshotPath = null;

        if (action_snapshot_img) {
            snapshotPath = saveBase64Snapshot(action_snapshot_img);
        }

        const updated = await actionService.updateAction(
            action_seq,
            {
                action_status,
                action_snapshot_img: snapshotPath
            }
        );

        if (!updated) {
            return fail(res, 404, "404", "수정할 세부 작업을 찾을 수 없습니다.");
        }

        return success(res);

    } catch (err) {
        console.error(err);
        return fail(res, 500, "500", "RPA 세부 작업 수정 중 서버 오류");
    }
};

// RPA 세부 작업 삭제
// DELETE /api/action/:action_seq
exports.deleteAction = async (req, res) => {
    try {
        const { action_seq } = req.params;

        if (!action_seq) {
            return fail(res, 400, "400", "action_seq 값이 없습니다.");
        }

        const deleted = await actionService.deleteAction(action_seq);

        if (!deleted) {
            return fail(res, 404, "404", "삭제할 세부 작업을 찾을 수 없습니다.");
        }

        return success(res);

    } catch (err) {
        console.error(err);
        return fail(res, 500, "500", "RPA 세부 작업 삭제 중 서버 오류");
    }
};

// RPA 세부 작업 조회
// GET /api/action?job_seq=
exports.getAction = async (req, res) => {
    try {
        const { job_seq } = req.query;

        if (!job_seq) {
            return fail(res, 400, "400", "job_seq 값이 없습니다.");
        }

        const action = await actionService.getAction({
            job_seq
        });

        return success(res, {
            action
        });

    } catch (err) {
        console.error(err);
        return fail(res, 500, "500", "RPA 세부 작업 조회 중 서버 오류");
    }
};