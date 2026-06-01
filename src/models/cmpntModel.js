const db = require("../config/db");

// 델타웹 컴포넌트 저장
exports.createCmpnt = async ({
    page_id,
    cmpnt_type,
    cmpnt_x,
    cmpnt_y,
    cmpnt_width,
    cmpnt_height,
    cmpnt_json_key
}) => {

    const sql = `
        INSERT INTO page_cmpnt
        (
            p_id,
            pc_type,
            pc_x,
            pc_y,
            pc_width,
            pc_height,
            pc_json_key,
            pc_reg_dttm
        )
        VALUES
        (
            ?, ?, ?, ?, ?, ?, ?, NOW()
        )
    `;

    const [result] = await db.query(sql, [
        page_id,
        cmpnt_type,
        cmpnt_x || 0,
        cmpnt_y || 0,
        cmpnt_width || 0,
        cmpnt_height || 0,
        cmpnt_json_key || null
    ]);

    return result.insertId;
};

// 델타웹 컴포넌트 수정
exports.updateCmpnt = async (
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
) => {

    const sql = `
        UPDATE page_cmpnt
        SET
            p_id = ?,
            pc_type = ?,
            pc_x = ?,
            pc_y = ?,
            pc_width = ?,
            pc_height = ?,
            pc_json_key = ?
        WHERE pc_seq = ?
    `;

    const [result] = await db.query(sql, [
        page_id,
        cmpnt_type,
        cmpnt_x || 0,
        cmpnt_y || 0,
        cmpnt_width || 0,
        cmpnt_height || 0,
        cmpnt_json_key || null,
        cmpnt_seq
    ]);

    return result.affectedRows > 0;
};

// 델타웹 컴포넌트 삭제
exports.deleteCmpnt = async (cmpnt_seq) => {

    const sql = `
        DELETE FROM page_cmpnt
        WHERE pc_seq = ?
    `;

    const [result] = await db.query(sql, [
        cmpnt_seq
    ]);

    return result.affectedRows > 0;
};

// 델타웹 컴포넌트 조회
exports.getCmpnt = async ({
    cmpnt_seq,
    page_id
}) => {

    const where = [];
    const params = [];

    if (cmpnt_seq) {
        where.push("pc_seq = ?");
        params.push(cmpnt_seq);
    }

    if (page_id) {
        where.push("p_id = ?");
        params.push(page_id);
    }

    let sql = `
        SELECT
            pc_seq AS cmpnt_seq,
            p_id AS page_id,
            pc_type AS cmpnt_type,
            pc_x AS cmpnt_x,
            pc_y AS cmpnt_y,
            pc_width AS cmpnt_width,
            pc_height AS cmpnt_height,
            pc_json_key AS cmpnt_json_key,
            pc_reg_dttm AS cmpnt_reg_dttm
        FROM page_cmpnt
    `;

    if (where.length > 0) {
        sql += ` WHERE ${where.join(" AND ")}`;
    }

    sql += `
        ORDER BY pc_seq ASC
    `;

    const [rows] = await db.query(sql, params);

    return rows;
};