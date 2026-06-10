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

const getCmpntBody = (body) => {
    return {
        page_id: body.page_id,
        cmpnt_type: body.cmpnt_type,
        cmpnt_x: body.cmpnt_x,
        cmpnt_y: body.cmpnt_y,
        cmpnt_width: body.cmpnt_width,
        cmpnt_height: body.cmpnt_height,
        cmpnt_json_key: body.cmpnt_json_key,

        cmpnt_action_type: body.cmpnt_action_type,
        cmpnt_scroll_cnt: body.cmpnt_scroll_cnt,
        cmpnt_scroll_interval: body.cmpnt_scroll_interval,
        cmpnt_scroll_amount: body.cmpnt_scroll_amount,
        cmpnt_must_done: body.cmpnt_must_done,
        cmpnt_mod_shift: body.cmpnt_mod_shift,
        cmpnt_mod_ctrl: body.cmpnt_mod_ctrl,
        cmpnt_mod_alt: body.cmpnt_mod_alt,
        cmpnt_focus_click: body.cmpnt_focus_click,
        cmpnt_keys_seq: body.cmpnt_keys_seq,
        cmpnt_next_delay: body.cmpnt_next_delay,
        cmpnt_text_data: body.cmpnt_text_data
    };
};

// 델타웹 컴포넌트 저장
// POST /api/cmpnt
exports.createCmpnt = async (req, res) => {
    try {
        const data = getCmpntBody(req.body);

        if (!data.page_id || !data.cmpnt_type) {
            return fail(
                res,
                400,
                "400",
                "page_id 또는 cmpnt_type 값이 없습니다."
            );
        }

        const cmpnt_seq = await cmpntService.createCmpnt(data);

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

        if (!cmpnt_seq) {
            return fail(
                res,
                400,
                "400",
                "cmpnt_seq 값이 없습니다."
            );
        }

        const data = getCmpntBody(req.body);

        const updated = await cmpntService.updateCmpnt(
            cmpnt_seq,
            data
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

        if (!cmpnt_seq) {
            return fail(
                res,
                400,
                "400",
                "cmpnt_seq 값이 없습니다."
            );
        }

        const deleted = await cmpntService.deleteCmpnt(
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

        const cmpnt = await cmpntService.getCmpnt({
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