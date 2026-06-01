const db = require("../config/db");

// RPA 작업 저장
exports.createJob = async ({
    document_no
}) => {

    const sql = `
        INSERT INTO rpa_job
        (
            d_no,
            rj_status,
            rj_reg_dttm
        )
        VALUES
        (
            ?,
            '00',
            NOW()
        )
    `;

    const [result] = await db.query(sql, [
        document_no
    ]);

    return result.insertId;
};

// RPA 작업 수정
exports.updateJob = async (
    job_seq,
    {
        job_status,
        job_err_msg
    }
) => {

    let sql = `
        UPDATE rpa_job
        SET
            rj_status = ?,
            rj_err_msg = ?
    `;

    const params = [
        job_status,
        job_err_msg || null
    ];

    // 진행중
    if (job_status === "01") {
        sql += `,
            rj_start_dttm = NOW()
        `;
    }

    // 완료 또는 오류
    if (
        job_status === "02" ||
        job_status === "99"
    ) {
        sql += `,
            rj_end_dttm = NOW()
        `;
    }

    sql += `
        WHERE rj_seq = ?
    `;

    params.push(job_seq);

    const [result] = await db.query(
        sql,
        params
    );

    return result.affectedRows > 0;
};

// RPA 작업 삭제
exports.deleteJob = async (
    job_seq
) => {

    const sql = `
        DELETE FROM rpa_job
        WHERE rj_seq = ?
    `;

    const [result] = await db.query(sql, [
        job_seq
    ]);

    return result.affectedRows > 0;
};

// RPA 작업 조회
exports.getJob = async ({
    document_no
}) => {

    let sql = `
        SELECT
            rj_seq AS job_seq,
            d_no AS document_no,
            rj_status AS job_status,
            rj_start_dttm AS job_start_dttm,
            rj_end_dttm AS job_end_dttm,
            rj_err_msg AS job_err_msg,
            rj_reg_dttm AS job_reg_dttm
        FROM rpa_job
    `;

    const params = [];

    if (document_no) {
        sql += `
            WHERE d_no = ?
        `;

        params.push(document_no);
    }

    sql += `
        ORDER BY rj_seq DESC
    `;

    const [rows] = await db.query(
        sql,
        params
    );

    return rows;
};
