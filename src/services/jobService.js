const jobModel = require("../models/jobModel");

// RPA 작업 저장
exports.createJob = async (data) => {
    return await jobModel.createJob(data);
};

// RPA 작업 수정
exports.updateJob = async (job_seq, data) => {
    return await jobModel.updateJob(job_seq, data);
};

// RPA 작업 삭제
exports.deleteJob = async (job_seq) => {
    return await jobModel.deleteJob(job_seq);
};

// RPA 작업 조회
exports.getJob = async (params) => {
    return await jobModel.getJob(params);
};