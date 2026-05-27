const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");

exports.login = async (member_id, member_pwd) => {

    // 사용자 조회
    const member = await userModel.findByMemberId(member_id);

    if (!member) {
        return null;
    }

    // 비밀번호 검증
    const isMatch = await bcrypt.compare(
        member_pwd,
        member.m_pwd
    );

    if (!isMatch) {
        return null;
    }

    // 세션 생성
    const member_session = crypto
        .randomBytes(64)
        .toString("hex");

    // 세션 저장
    await userModel.updateLoginSession(
        member.m_seq,
        member_session
    );

    // 결과 반환
    return {
        m_seq: member.m_seq,
        m_id: member.m_id,
        m_name: member.m_name,
        m_session: member_session
    };
};