const pageService = require("../services/pageService");

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

// 델타웹 페이지 조회
// GET /api/page
exports.getPage = async (req, res) => {
    try {
        const page = await pageService.getPage();

        return success(res, {
            page
        });

    } catch (err) {
        console.error(err);

        return fail(
            res,
            500,
            "500",
            "델타웹 페이지 조회 중 서버 오류"
        );
    }
};