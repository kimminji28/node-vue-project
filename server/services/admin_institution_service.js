// D:\node-vue-project\server\services\admin_institution_service.js
const mapper = require("../database/mappers/admin_institution_mapper.js"); // 🚨 유저님의 실제 매퍼 경로에 맞게 수정하세요!

/**
 * 기관 등록 비즈니스 로직
 */
const registerInstitution = async (data) => {
  try {
    // 🌟 1. 가장 최근에 등록된 기관 ID 가져오기
    const maxIdRow = await mapper.getMaxInstId();

    let newInstId = "INST0001"; // 데이터가 하나도 없을 때의 기본값

    // 🌟 2. 새 ID 생성 (예: INST0015 -> INST0016)
    if (maxIdRow && maxIdRow.institution_id) {
      const currentIdStr = maxIdRow.institution_id;
      // "INST" 문자를 제거하고 숫자만 뽑아서 1 더하기
      const currentNum = parseInt(currentIdStr.replace("INST", ""), 10);
      const newNum = currentNum + 1;
      // 다시 "INST"를 붙이고 4자리 숫자로 맞추기 (padStart)
      newInstId = `INST${newNum.toString().padStart(4, "0")}`;
    }

    // 🌟 3. DB 저장을 위한 배열 데이터 만들기 (DB 컬럼 순서와 완벽 일치!)
    const instData = [
      newInstId, // institution_id
      data.name, // institution_name
      data.zipCode, // zipCode
      data.address, // address
      data.tel, // tel
      data.email, // 🌟 email 추가!
      "b001", // 🌟 DB 상태값에 맞춰 'b001' (운영) 로 고정!
    ];

    // 🌟 4. 매퍼 호출해서 DB에 INSERT!
    const result = await mapper.insertInstitution(instData);

    return { newInstId, result };
  } catch (err) {
    console.error(`[시스템관리자] 기관 등록 서비스 에러: ${err}`);
    throw err;
  }
};

const getInstitutionList = async (name, state) => {
  try {
    const result = await mapper.getInstitutionList(name, state);
    return result;
  } catch (err) {
    console.error(`[시스템관리자] 기관 목록 서비스 에러: ${err}`);
    throw err;
  }
};

const updateInstitution = async (id, data) => {
  try {
    // 🌟 배열 순서: [name, zipCode, address, tel, email, state, id]
    const instData = [
      data.name,
      data.zipCode,
      data.address,
      data.tel,
      data.email,
      data.state,
      id,
    ];
    const result = await mapper.updateInstitution(instData);
    return result;
  } catch (err) {
    console.error(`[시스템관리자] 기관 수정 서비스 에러: ${err}`);
    throw err;
  }
};

const getInstitutionDetail = async (instId) => {
  try {
    const result = await mapper.getInstitutionDetail(instId);
    return result;
  } catch (err) {
    console.error(`[시스템관리자] 기관 상세 조회 서비스 에러: ${err}`);
    throw err;
  }
};

const deleteInstitutions = async (ids) => {
  try {
    // 매퍼에서 이미 [ids]로 감쌌으므로, 서비스에서는 그냥 ids를 넘깁니다!
    const result = await mapper.deleteInstitutions(ids);
    return result;
  } catch (err) {
    console.error(`[시스템관리자] 기관 삭제 서비스 에러: ${err}`);
    throw err;
  }
};

module.exports = {
  registerInstitution,
  getInstitutionList,
  updateInstitution,
  getInstitutionDetail,
  deleteInstitutions,
};
