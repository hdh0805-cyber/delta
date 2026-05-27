const authService = require("../services/authService");

exports.login = async (req, res) => {
    try {

        const { member_id, member_pwd } = req.body;

        if (!member_id || !member_pwd) {
            return res.status(400).json({
                result: "fail",
                code: "400",
                message: "member_id 또는 member_pwd 누락",
                data: {}
            });
        }

        const result = await authService.login(member_id, member_pwd);

        if (!result) {
            return res.status(401).json({
                result: "fail",
                code: "401",
                message: "아이디 또는 비밀번호 불일치",
                data: {}
            });
        }

        return res.json({
            result: "ok",
            code: "100",
            message: "success",
            data: {
                member_seq: result.m_seq,
                member_session: result.m_session,
                member_name: result.m_name
            }
        });

    } catch (err) {

        console.error(err);

        return res.status(500).json({
            result: "fail",
            code: "500",
            message: "서버 오류",
            data: {}
        });

    }
};