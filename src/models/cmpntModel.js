const db = require("../config/db");

// 델타웹 컴포넌트 저장
exports.createCmpnt = async ({
    page_id,
    cmpnt_type,
    cmpnt_x,
    cmpnt_y,
    cmpnt_width,
    cmpnt_height,
    cmpnt_json_key,

    cmpnt_action_type,
    cmpnt_scroll_cnt,
    cmpnt_scroll_interval,
    cmpnt_scroll_amount,
    cmpnt_must_done,
    cmpnt_mod_shift,
    cmpnt_mod_ctrl,
    cmpnt_mod_alt,
    cmpnt_focus_click,
    cmpnt_keys_seq,
    cmpnt_next_delay,
    cmpnt_text_data
}) => {

    const sql = `
        INSERT INTO page_cmpnt
        (
            p_id,
            pc_type,
            pc_json_key,
            pc_action_type,
            pc_x,
            pc_y,
            pc_width,
            pc_height,
            pc_scroll_cnt,
            pc_scroll_interval,
            pc_scroll_amount,
            pc_must_done,
            pc_mod_shift,
            pc_mod_ctrl,
            pc_mod_alt,
            pc_focus_click,
            pc_keys_seq,
            pc_next_delay,
            pc_text_data,
            pc_reg_dttm
        )
        VALUES
        (
            ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
            ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW()
        )
    `;

    const [result] = await db.query(sql, [
        page_id,
        cmpnt_type,
        cmpnt_json_key || null,
        cmpnt_action_type || "none",
        cmpnt_x || 0,
        cmpnt_y || 0,
        cmpnt_width || 0,
        cmpnt_height || 0,
        cmpnt_scroll_cnt || 0,
        cmpnt_scroll_interval || 500,
        cmpnt_scroll_amount || 120,
        cmpnt_must_done || 0,
        cmpnt_mod_shift || 0,
        cmpnt_mod_ctrl || 0,
        cmpnt_mod_alt || 0,
        cmpnt_focus_click === undefined ? 1 : cmpnt_focus_click,
        cmpnt_keys_seq || null,
        cmpnt_next_delay || 1500,
        cmpnt_text_data || null
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
        cmpnt_json_key,

        cmpnt_action_type,
        cmpnt_scroll_cnt,
        cmpnt_scroll_interval,
        cmpnt_scroll_amount,
        cmpnt_must_done,
        cmpnt_mod_shift,
        cmpnt_mod_ctrl,
        cmpnt_mod_alt,
        cmpnt_focus_click,
        cmpnt_keys_seq,
        cmpnt_next_delay,
        cmpnt_text_data
    }
) => {

    const sql = `
        UPDATE page_cmpnt
        SET
            p_id = ?,
            pc_type = ?,
            pc_json_key = ?,
            pc_action_type = ?,
            pc_x = ?,
            pc_y = ?,
            pc_width = ?,
            pc_height = ?,
            pc_scroll_cnt = ?,
            pc_scroll_interval = ?,
            pc_scroll_amount = ?,
            pc_must_done = ?,
            pc_mod_shift = ?,
            pc_mod_ctrl = ?,
            pc_mod_alt = ?,
            pc_focus_click = ?,
            pc_keys_seq = ?,
            pc_next_delay = ?,
            pc_text_data = ?
        WHERE pc_seq = ?
    `;

    const [result] = await db.query(sql, [
        page_id,
        cmpnt_type,
        cmpnt_json_key || null,
        cmpnt_action_type || "none",
        cmpnt_x || 0,
        cmpnt_y || 0,
        cmpnt_width || 0,
        cmpnt_height || 0,
        cmpnt_scroll_cnt || 0,
        cmpnt_scroll_interval || 500,
        cmpnt_scroll_amount || 120,
        cmpnt_must_done || 0,
        cmpnt_mod_shift || 0,
        cmpnt_mod_ctrl || 0,
        cmpnt_mod_alt || 0,
        cmpnt_focus_click === undefined ? 1 : cmpnt_focus_click,
        cmpnt_keys_seq || null,
        cmpnt_next_delay || 1500,
        cmpnt_text_data || null,
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
            pc_reg_dttm AS cmpnt_reg_dttm,

            pc_action_type AS cmpnt_action_type,
            pc_scroll_cnt AS cmpnt_scroll_cnt,
            pc_scroll_interval AS cmpnt_scroll_interval,
            pc_scroll_amount AS cmpnt_scroll_amount,
            pc_must_done AS cmpnt_must_done,
            pc_mod_shift AS cmpnt_mod_shift,
            pc_mod_ctrl AS cmpnt_mod_ctrl,
            pc_mod_alt AS cmpnt_mod_alt,
            pc_focus_click AS cmpnt_focus_click,
            pc_keys_seq AS cmpnt_keys_seq,
            pc_next_delay AS cmpnt_next_delay,
            pc_text_data AS cmpnt_text_data
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