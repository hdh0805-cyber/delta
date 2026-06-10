const db = require("../config/db");

// RPA 세부 작업 등록
exports.createAction = async ({
    job_seq,
    action
}) => {

    const conn = await db.getConnection();

    try {

        await conn.beginTransaction();

        for (const item of action) {

            const sql = `
                INSERT INTO rpa_action_item
                (
                    rj_seq,
                    p_id,
                    pc_seq,
                    rai_action_order,
                    rai_target_value,
                    rai_status
                )
                VALUES
                (
                    ?, ?, ?, ?, ?, '00'
                )
            `;

            await conn.query(sql, [
                job_seq,
                item.page_id,
                item.cmpnt_seq,
                item.action_order,
                item.action_target_value || null
            ]);
        }

        await conn.commit();

        return true;

    } catch (err) {

        await conn.rollback();
        throw err;

    } finally {

        conn.release();

    }
};

// RPA 세부 작업 수정
exports.updateAction = async (
    action_seq,
    {
        action_status,
        action_snapshot_img
    }
) => {

    const sql = `
        UPDATE rpa_action_item
        SET
            rai_status = ?,
            rai_snapshot_img = ?,
            rai_proc_dttm = NOW()
        WHERE rai_seq = ?
    `;

    const [result] = await db.query(sql, [
        action_status,
        action_snapshot_img,
        action_seq
    ]);

    return result.affectedRows > 0;
};

// RPA 세부 작업 삭제
exports.deleteAction = async (
    action_seq
) => {

    const sql = `
        DELETE FROM rpa_action_item
        WHERE rai_seq = ?
    `;

    const [result] = await db.query(sql, [
        action_seq
    ]);

    return result.affectedRows > 0;
};

// RPA 세부 작업 조회
exports.getAction = async ({
    job_seq
}) => {

    const sql = `
        SELECT
            ai.rai_seq AS action_seq,
            ai.p_id AS page_id,
            ai.rai_action_order AS action_order,
            ai.rai_target_value AS action_target_value,
            ai.rai_status AS action_status,
            ai.rai_proc_dttm AS action_proc_dttm,
            ai.rai_snapshot_img AS action_snapshot_img,

            pc.pc_seq AS cmpnt_seq,
            pc.pc_type AS cmpnt_type,
            pc.pc_x AS cmpnt_x,
            pc.pc_y AS cmpnt_y,
            pc.pc_width AS cmpnt_width,
            pc.pc_height AS cmpnt_height,
            pc.pc_json_key AS cmpnt_json_key,

            pc.pc_action_type AS cmpnt_action_type,
            pc.pc_scroll_cnt AS cmpnt_scroll_cnt,
            pc.pc_scroll_interval AS cmpnt_scroll_interval,
            pc.pc_scroll_amount AS cmpnt_scroll_amount,
            pc.pc_must_done AS cmpnt_must_done,
            pc.pc_mod_shift AS cmpnt_mod_shift,
            pc.pc_mod_ctrl AS cmpnt_mod_ctrl,
            pc.pc_mod_alt AS cmpnt_mod_alt,
            pc.pc_focus_click AS cmpnt_focus_click,
            pc.pc_keys_seq AS cmpnt_keys_seq,
            pc.pc_next_delay AS cmpnt_next_delay,
            pc.pc_text_data AS cmpnt_text_data

        FROM rpa_action_item ai
        INNER JOIN page_cmpnt pc
            ON ai.pc_seq = pc.pc_seq

        WHERE ai.rj_seq = ?

        ORDER BY
            ai.p_id ASC,
            ai.rai_action_order ASC
    `;

    const [rows] = await db.query(sql, [
        job_seq
    ]);

    return rows;
};