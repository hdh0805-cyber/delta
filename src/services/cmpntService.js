const cmpntModel = require("../models/cmpntModel");

// 델타웹 컴포넌트 저장
exports.createCmpnt = async (data) => {
    return await cmpntModel.createCmpnt(data);
};

// 델타웹 컴포넌트 수정
exports.updateCmpnt = async (cmpnt_seq, data) => {
    return await cmpntModel.updateCmpnt(cmpnt_seq, data);
};

// 델타웹 컴포넌트 삭제
exports.deleteCmpnt = async (cmpnt_seq) => {
    return await cmpntModel.deleteCmpnt(cmpnt_seq);
};

// 델타웹 컴포넌트 조회
exports.getCmpnt = async (params) => {
    return await cmpntModel.getCmpnt(params);
};