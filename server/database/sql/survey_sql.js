//조사지 관련 sql문

//조사지 전체조회 <김민지, 조사지 전체조회 쿼리 작성>
const selectSurveyAll = `
SELECT J_ID,
       Ver_Id,
       G_UserId,
       support_id,
       result,
       reason,
       created_at,
       updated_at
FROM Survey_Tbl
ORDER BY J_ID`;

//조사지 건별조회 <김민지, 조사지 건별조회 쿼리 작성>
const selectSurveyById = `
SELECT 
    s.J_ID,
    s.Ver_Id,
    s.G_UserId,
    s.support_id,
    s.result,
    s.reason,
    s.created_at,
    q.question_id,
    q.titleCode,
    q.subTitle,
    q.question_text,
    q.answer_type,
    q.isEmergency,
    a.answer_text,
    a.extra_input
FROM Survey_Tbl s
JOIN SurveyItem_Tbl q ON s.J_ID = q.J_ID
LEFT JOIN SurveyAnswer_Tbl a 
       ON q.question_id = a.question_id 
      AND a.user_id = s.G_UserId
WHERE s.Ver_Id = ?
ORDER BY q.question_no;
`;

//조사지 등록 <김민지, 조사지 등록 쿼리 작성>
const insertSurvey = `
INSERT INTO Survey_Tbl (
       J_ID,
       Ver_Id,
       G_UserId,
       support_id,
       result,
       reason,
       created_at,
       updated_at)
VALUES(?, ?, ?, ?, ?, ?, ?, ?)
`;

//일반이용자 조사지 등록 마지막 pk조회 sql문 (김민지 26.03.24 추가)
const lastJId = ` 
SELECT J_ID
FROM Survey_Tbl
ORDER BY J_ID DESC
LIMIT 1
    `;

// SurveyUserAnswer_Tbl에 답변 등록 <김민지, 조사지 답변 쿼리 26.03.24 추가>
const insertSurveyAnswer = `
INSERT INTO SurveyUserAnswer_Tbl (
  answer_id,
  J_ID,
  question_id,
  answer
) VALUES (?, ?, ?, ?)
`;

// 조사지 기본정보 + 문항 가져오기 <김민지, 2026.03.24>
const surveyQuestion = `
SELECT
  question_id,
  Ver_Id,
  titleCode,
  question_no,
  question_text,
  answer_type
FROM SurveyItem_Tbl
WHERE Ver_Id = ?
ORDER BY question_no;`;

module.exports = {
  selectSurveyAll,
  selectSurveyById,
  insertSurvey,
  lastJId,
  insertSurveyAnswer,
  surveyQuestion,
};
