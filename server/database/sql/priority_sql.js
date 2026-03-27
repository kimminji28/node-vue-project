// priority_sql.js 우선순위 요청

// 지원자 정보
const selectSupportInfo = `
SELECT sp.name as supportName,
    gu.name as generalName,
    sp.born as birthDate,
    sp.gender as genderCode,
    dm.description as disMajorName
FROM Survey_Tbl sv
JOIN Support_Tbl sp ON sv.support_id = sp.support_id
JOIN GeneralUser_Tbl gu ON sv.G_UserId = gu.G_UserId
LEFT JOIN DisMajor_Tbl dm ON sp.major = dm.b_Code
WHERE sv.J_ID = ?;
`;

const insertApprovalWait = `
INSERT INTO ApprovalWait_Tbl (approval_Id, J_ID, appr_type, appr_reason) 
VALUES (?, ?, ?, ?);
`;

const updateSurveyStatus = `
UPDATE Survey_Tbl 
SET result = 'f004' 
WHERE J_ID = ?;
`;

const selectLastApprovalId = `
SELECT approval_Id FROM ApprovalWait_Tbl ORDER BY approval_Id DESC LIMIT 1;
`;

module.exports = {
  selectSupportInfo,
  insertApprovalWait,
  updateSurveyStatus,
  selectLastApprovalId,
};
