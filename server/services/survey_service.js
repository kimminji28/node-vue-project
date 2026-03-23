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

//조사지 등록 <김민지, mapper에 있는 함수 가져와서 라우터에 결과 전달>
const createInfo = async (surveyObj) => {
  //객체 구조분해
  const {
    J_ID,
    Ver_Id,
    G_UserId,
    support_id,
    result,
    reason,
    created_at,
    updated_at,
  } = surveyObj;

  //구조분해한 객체를 배열로 생성
  let insertData = [
    J_ID,
    Ver_Id,
    G_UserId,
    support_id,
    result,
    reason,
    created_at,
    updated_at,
  ];

  //mapper에서 함수 가져와서 실행
  let outcome = await surveyMapper.insertSurvey(insertData);
  //outcome : 결과

  //결과 처리
  let outObj = {
    status: outcome.affectedRows > 0 ? "success" : "fail", //성공하면 success, 실패하면 fail
    //insertId에서 affectedRows로 변경 (insertId는 AUTO_INCREMENT일때만 의미가 있어서 변경함)
    J_ID: outcome.surveyInfo, //등록할 때 넣은 값 (예: SUV0001)
  };
  return outObj; //결과 반환
};

module.exports = { findAll, fineInfoByNo, createInfo };
