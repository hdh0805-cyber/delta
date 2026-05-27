const db = require("../config/db");

// 델타웹 페이지 조회
exports.getPage = async () => {

    const sql = `
        SELECT
            p_id AS page_id,
            p_url AS page_uri,
            p_memo AS page_memo
        FROM page
        ORDER BY p_id ASC
    `;

    const [rows] = await db.query(sql);

    return rows;

};