const db = require("../config/db");

exports.findByMemberId = async (member_id) => {
    const sql = `
        SELECT 
            m_seq,
            m_id,
            m_pwd,
            m_name,
            m_etc,
            m_session,
            m_reg_dttm,
            m_lgn_dttm
        FROM member
        WHERE m_id = ?
        LIMIT 1
    `;

    const [rows] = await db.query(sql, [member_id]);

    return rows.length > 0 ? rows[0] : null;
};

exports.updateLoginSession = async (member_seq, member_session) => {
    const sql = `
        UPDATE member
        SET 
            m_session = ?,
            m_lgn_dttm = NOW()
        WHERE m_seq = ?
    `;

    const [result] = await db.query(sql, [
        member_session,
        member_seq
    ]);

    return result.affectedRows > 0;
};

exports.findBySession = async (member_seq, member_session) => {
    const sql = `
        SELECT 
            m_seq,
            m_id,
            m_name,
            m_session
        FROM member
        WHERE m_seq = ?
          AND m_session = ?
        LIMIT 1
    `;

    const [rows] = await db.query(sql, [
        member_seq,
        member_session
    ]);

    return rows.length > 0 ? rows[0] : null;
};