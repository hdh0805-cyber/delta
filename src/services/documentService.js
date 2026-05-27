const documentModel = require("../models/documentModel");

// 종이 송장 저장
exports.createDocument = async ({
    document_img
}) => {

    return await documentModel.createDocument({
        document_img
    });

};

// 종이 송장 수정
exports.updateDocument = async (
    document_seq,
    data
) => {

    return await documentModel.updateDocument(
        document_seq,
        data
    );

};

// 종이 송장 삭제
exports.deleteDocument = async (
    document_seq
) => {

    return await documentModel.deleteDocument(
        document_seq
    );

};

// 종이 송장 조회
exports.getDocument = async (params) => {

    return await documentModel.getDocument(
        params
    );

};