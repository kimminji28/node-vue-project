//조사지 관련 service
const surveyMapper = require("../database/mappers/survey_mapper");

//조사지 전체조회 <김민지, mapper에 있는 함수 가져와서 라우터에 결과 전달>
const findAll = async () => {
  let list = await surveyMapper.selectSurveyAll();
  return list;
};

//조사지 건별조회 <김민지, mapper에 있는 함수 가져와서 라우터에 결과 전달>
const fineInfoByNo = async (surveyNo) => {
  let detail = await surveyMapper.selectSurveyById(surveyNo);
  return detail;
};

//조사지 등록 <김민지, 26.03.24 수정 (오류 잡기, PK증가로직 추가)
const createInfo = async (surveyObj) => {
  //객체 구조분해
  const { Ver_Id, G_UserId, support_id, result, reason, updated_at } =
    surveyObj;

  const createDate = new Date().toISOString().slice(0, 19).replace("T", " ");
  const updateDate = new Date().toISOString().slice(0, 19).replace("T", " ");

  try {
    let J_ID;
    const lastJID = await surveyMapper.getLastJ_ID();
    if (!lastJID || lastJID.length === 0) {
      J_ID = "SUV0001";
    } else {
      const num = parseInt(lastJID[0].J_ID.substring(3), 10);
      J_ID = "SUV" + String(num + 1).padStart(4, "0");
    }

    // Ver_Id → FK 걸려있음 → 반드시 존재해야 함
    const safeVerId = Ver_Id && Ver_Id.trim() !== "" ? Ver_Id : "FORM0000";

    // G_UserId → 빈값이면 기본 사용자 넣기
    const safeUserId =
      G_UserId && G_UserId.trim() !== "" ? G_UserId : "GUSR0000";

    // support_id → 빈값이면 기본값
    const safeSupportId =
      support_id && support_id.trim() !== "" ? support_id : "SUP0000";

    //구조분해한 객체를 배열로 생성
    let insertData = [
      J_ID,
      safeVerId,
      safeUserId,
      safeSupportId,
      result,
      reason,
      createDate,
      updateDate,
    ];
    console.log("INSERT DATA:", insertData);

    //mapper에서 함수 가져와서 실행
    let outcome = await surveyMapper.insertSurvey(insertData);
    console.log("OUTCOME:", outcome);
    //outcome : 결과

    //결과 처리
    let outObj = {
      status: outcome.affectedRows > 0 ? "success" : "fail", //성공하면 success, 실패하면 fail
      //insertId에서 affectedRows로 변경 (insertId는 AUTO_INCREMENT일때만 의미가 있어서 변경함)
      J_ID: J_ID, //등록할 때 넣은 값 (예: SUV0001)
    };
    return outObj;
  } catch (err) {
    console.error("DB ERROR:", err);
    if (err.code !== "ER_DUP_ENTRY") {
      //"ER_DUP_ENTRY" 중복 값에 대한 mariadb 에러코드
      return { status: "Failed", message: err.message };
    }
    if (retry == 2) {
      return { status: "Failed", message: "PK 중복으로 인한 등록 실패" };
    }
  }
};

module.exports = { findAll, fineInfoByNo, createInfo };
