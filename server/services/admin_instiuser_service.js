// D:\node-vue-project\server\services\admin_instiuser_service.js
const mapper = require("../database/mappers/admin_instiuser_mapper.js");

const getInstiUserList = async (name, isWaitOnly) => {
  try {
    const result = await mapper.getInstiUserList(name, isWaitOnly);
    return result;
  } catch (err) {
    console.error(`[시스템관리자] 기관소속원 목록 서비스 에러: ${err}`);
    throw err;
  }
};

const approveInstiUsers = async (ids) => {
  try {
    const result = await mapper.approveInstiUsers(ids);
    return result;
  } catch (err) {
    console.error(`[시스템관리자] 기관소속원 승인 서비스 에러: ${err}`);
    throw err;
  }
};

const deleteInstiUsers = async (ids) => {
  try {
    const result = await mapper.deleteInstiUsers(ids);
    return result;
  } catch (err) {
    console.error(`[시스템관리자] 기관소속원 삭제 서비스 에러: ${err}`);
    throw err;
  }
};

module.exports = {
  getInstiUserList,
  approveInstiUsers,
  deleteInstiUsers,
};
