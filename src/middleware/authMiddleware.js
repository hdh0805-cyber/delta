const userModel = require("../models/userModel");

const authMiddleware = async (req, res, next) => {
    try {
        const member_seq = req.headers["api-key-seq"];
        const member_session = req.headers["api-key-session"];

        if (!member_seq || !member_session) {
            return res.status(401).json({
                result: "fail",
                code: "401",
                message: "인증 정보가 없습니다.",
                data: {}
            });
        }

        const member = await userModel.findBySession(
            member_seq,
            member_session
        );

        if (!member) {
            return res.status(401).json({
                result: "fail",
                code: "401",
                message: "유효하지 않은 세션입니다.",
                data: {}
            });
        }

        req.member = member;

        next();

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            result: "fail",
            code: "500",
            message: "인증 처리 중 서버 오류",
            data: {}
        });
    }
};

module.exports = authMiddleware;