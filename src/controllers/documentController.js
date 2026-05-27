const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const documentService = require("../services/documentService");

const success = (res, data = {}) => {
    return res.json({
        result: "ok",
        code: "100",
        message: "success",
        data
    });
};

const fail = (res, status, code, message) => {
    return res.status(status).json({
        result: "fail",
        code,
        message,
        data: {}
    });
};

// BASE64 이미지 저장
const saveBase64Image = (base64Image) => {

    const base64Data = base64Image.replace(
        /^data:image\/\w+;base64,/,
        ""
    );

    const uploadDir = path.join(
        __dirname,
        "../../uploads/document"
    );

    // 폴더 생성
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, {
            recursive: true
        });
    }

    // 파일명 생성
    const fileName = `${uuidv4()}.png`;

    const filePath = path.join(
        uploadDir,
        fileName
    );

    // 파일 저장
    fs.writeFileSync(
        filePath,
        base64Data,
        "base64"
    );

    // DB 저장 경로
    return `/uploads/document/${fileName}`;
};

// 종이 송장 저장
// POST /api/document
exports.createDocument = async (req, res) => {
    try {

        const { document_img } = req.body;

        if (!document_img) {
            return fail(
                res,
                400,
                "400",
                "document_img 값이 없습니다."
            );
        }

        // 이미지 저장
        const savePath = saveBase64Image(
            document_img
        );

        // DB 저장
        const document_seq =
            await documentService.createDocument({
                document_img: savePath
            });

        return success(res, {
            document_seq
        });

    } catch (err) {

        console.error(err);

        return fail(
            res,
            500,
            "500",
            "종이 송장 저장 중 서버 오류"
        );

    }
};

// 종이 송장 수정
// PUT/PATCH /api/document/:document_seq
exports.updateDocument = async (req, res) => {
    try {

        const { document_seq } = req.params;

        const {
            document_img,
            document_no,
            document_json
        } = req.body;

        if (!document_seq) {
            return fail(
                res,
                400,
                "400",
                "document_seq 값이 없습니다."
            );
        }

        let savePath = "";

        // 이미지 있으면 저장
        if (document_img) {
            savePath = saveBase64Image(
                document_img
            );
        }

        const updated =
            await documentService.updateDocument(
                document_seq,
                {
                    document_img: savePath,
                    document_no,
                    document_json
                }
            );

        if (!updated) {
            return fail(
                res,
                404,
                "404",
                "수정할 종이 송장을 찾을 수 없습니다."
            );
        }

        return success(res);

    } catch (err) {

        console.error(err);

        return fail(
            res,
            500,
            "500",
            "종이 송장 수정 중 서버 오류"
        );

    }
};

// 종이 송장 삭제
// DELETE /api/document/:document_seq
exports.deleteDocument = async (req, res) => {
    try {

        const { document_seq } = req.params;

        if (!document_seq) {
            return fail(
                res,
                400,
                "400",
                "document_seq 값이 없습니다."
            );
        }

        const deleted =
            await documentService.deleteDocument(
                document_seq
            );

        if (!deleted) {
            return fail(
                res,
                404,
                "404",
                "삭제할 종이 송장을 찾을 수 없습니다."
            );
        }

        return success(res);

    } catch (err) {

        console.error(err);

        return fail(
            res,
            500,
            "500",
            "종이 송장 삭제 중 서버 오류"
        );

    }
};

// 종이 송장 조회
// GET /api/document
exports.getDocument = async (req, res) => {
    try {

        const {
            document_seq,
            document_no
        } = req.query;

        const document =
            await documentService.getDocument({
                document_seq,
                document_no
            });

        return success(res, {
            document
        });

    } catch (err) {

        console.error(err);

        return fail(
            res,
            500,
            "500",
            "종이 송장 조회 중 서버 오류"
        );

    }
};