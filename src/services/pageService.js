const pageModel = require("../models/pageModel");

// 델타웹 페이지 조회
exports.getPage = async () => {

    return await pageModel.getPage();

};
