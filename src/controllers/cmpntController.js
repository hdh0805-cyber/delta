const cmpntService = require("../services/cmpntService");

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

// 델타웹 컴포넌트 저장
// POST /api/cmpnt
exports.createCmpnt = async (req, res) => {
    try {

        const {
            page_id,
            cmpnt_type,
            cmpnt_x,
            cmpnt_y,
            cmpnt_width,
            cmpnt_height,
            cmpnt_json_key
        } = req.body;

        if (!page_id || !cmpnt_type) {
            return fail(
                res,
                400,
                "400",
                "page_id 또는 cmpnt_type 값이 없습니다."
            );
        }

        const cmpnt_seq =
            await cmpntService.createCmpnt({
                page_id,
                cmpnt_type,
                cmpnt_x,
                cmpnt_y,
                cmpnt_width,
                cmpnt_height,
                cmpnt_json_key
            });

        return success(res, {
            cmpnt_seq
        });

    } catch (err) {

        console.error(err);

        return fail(
            res,
            500,
            "500",
            "컴포넌트 저장 중 서버 오류"
        );

    }
};

// 델타웹 컴포넌트 수정
// PUT/PATCH /api/cmpnt/:cmpnt_seq
exports.updateCmpnt = async (req, res) => {
    try {

        const { cmpnt_seq } = req.params;

        const {
            page_id,
            cmpnt_type,
            cmpnt_x,
            cmpnt_y,
            cmpnt_width,
            cmpnt_height,
            cmpnt_json_key
        } = req.body;

        const updated =
            await cmpntService.updateCmpnt(
                cmpnt_seq,
                {
                    page_id,
                    cmpnt_type,
                    cmpnt_x,
                    cmpnt_y,
                    cmpnt_width,
                    cmpnt_height,
                    cmpnt_json_key
                }
            );

        if (!updated) {
            return fail(
                res,
                404,
                "404",
                "수정할 컴포넌트를 찾을 수 없습니다."
            );
        }

        return success(res);

    } catch (err) {

        console.error(err);

        return fail(
            res,
            500,
            "500",
            "컴포넌트 수정 중 서버 오류"
        );

    }
};

// 델타웹 컴포넌트 삭제
// DELETE /api/cmpnt/:cmpnt_seq
exports.deleteCmpnt = async (req, res) => {
    try {

        const { cmpnt_seq } = req.params;

        const deleted =
            await cmpntService.deleteCmpnt(
                cmpnt_seq
            );

        if (!deleted) {
            return fail(
                res,
                404,
                "404",
                "삭제할 컴포넌트를 찾을 수 없습니다."
            );
        }

        return success(res);

    } catch (err) {

        console.error(err);

        return fail(
            res,
            500,
            "500",
            "컴포넌트 삭제 중 서버 오류"
        );

    }
};

// 델타웹 컴포넌트 조회
// GET /api/cmpnt?cmpnt_seq=&page_id=
exports.getCmpnt = async (req, res) => {
    try {

        const {
            cmpnt_seq,
            page_id
        } = req.query;

        const cmpnt =
            await cmpntService.getCmpnt({
                cmpnt_seq,
                page_id
            });

        return success(res, {
            cmpnt
        });

    } catch (err) {

        console.error(err);

        return fail(
            res,
            500,
            "500",
            "컴포넌트 조회 중 서버 오류"
        );

    }
};