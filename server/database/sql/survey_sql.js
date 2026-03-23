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
SELECT J_ID,
       Ver_Id,
       G_UserId,
       support_id,
       result,
       reason,
       created_at,
       updated_at
FROM Survey_Tbl
WHERE J_ID = ?
`;

//조사지 등록 <김민지, 조사지 등록 쿼리 작성>
const insertSurvey = `
INSERT INTO Survey_Tbl (J_ID,
       Ver_Id,
       G_UserId,
       support_id,
       result,
       reason,
       created_at,
       updated_at)
VALUES(?, ?, ?, ?, ?, ?, ?, ?)
`;

module.exports = { selectSurveyAll, selectSurveyById, insertSurvey };
