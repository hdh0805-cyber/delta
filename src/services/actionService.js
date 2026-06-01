const actionModel = require("../models/actionModel");

// RPA 세부 작업 등록
exports.createAction = async (data) => {
    return await actionModel.createAction(data);
};

// RPA 세부 작업 수정
exports.updateAction = async (action_seq, data) => {
    return await actionModel.updateAction(action_seq, data);
};

// RPA 세부 작업 삭제
exports.deleteAction = async (action_seq) => {
    return await actionModel.deleteAction(action_seq);
};

// RPA 세부 작업 조회
exports.getAction = async (params) => {
    return await actionModel.getAction(params);
};
