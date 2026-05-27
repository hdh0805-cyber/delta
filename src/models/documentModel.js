
const db = require("../config/db");

// 종이 송장 저장
exports.createDocument = async ({ document_img }) => {
    const sql = `
        INSERT INTO document
        (
            d_no,
            d_img,
            d_json,
            d_reg_dttm
        )
        VALUES
        (
            '',
            ?,
            '',
            NOW()
        )
    `;

    const [result] = await db.query(sql, [
        document_img
    ]);

    return result.insertId;
};

// 종이 송장 수정
exports.updateDocument = async (document_seq, {
    document_img,
    document_no,
    document_json
}) => {
    const sql = `
        UPDATE document
        SET
            d_img = ?,
            d_no = ?,
            d_json = ?,
            d_rec_dttm = NOW()
        WHERE d_seq = ?
    `;

    const [result] = await db.query(sql, [
        document_img || "",
        document_no || "",
        document_json || "",
        document_seq
    ]);

    return result.affectedRows > 0;
};

// 종이 송장 삭제
exports.deleteDocument = async (document_seq) => {
    const sql = `
        DELETE FROM document
        WHERE d_seq = ?
    `;

    const [result] = await db.query(sql, [
        document_seq
    ]);

    return result.affectedRows > 0;
};

// 종이 송장 조회
exports.getDocument = async ({
    document_seq,
    document_no
}) => {
    const where = [];
    const params = [];

    if (document_seq) {
        where.push("d_seq = ?");
        params.push(document_seq);
    }

    if (document_no) {
        where.push("d_no = ?");
        params.push(document_no);
    }

    let sql = `
        SELECT
            d_seq AS document_seq,
            d_no AS document_no,
            d_json AS document_json,
            d_img AS document_img,
            d_reg_dttm AS document_reg_dttm,
            d_rec_dttm AS document_rec_dttm
        FROM document
    `;

    if (where.length > 0) {
        sql += ` WHERE ${where.join(" AND ")}`;
    }

    sql += ` ORDER BY d_seq DESC`;

    const [rows] = await db.query(sql, params);

    return rows;
};