const lastFormId = `
SELECT Ver_Id
FROM SurveyForm_Tbl
ORDER BY Ver_Id DESC
LIMIT 1
`;


const lastItemId = `
SELECT question_id
FROM SurveyItem_Tbl
ORDER BY question_id DESC
LIMIT 1
`;




const SurveyFormInsert =
`
INSERT INTO SurveyForm_Tbl(Ver_Id, Sys_Id, version, description, created_at )
VALUES(?, ?, ?, ?, ?)
`;

const SurveyItemInsert =
`
INSERT INTO SurveyItem_Tbl(question_id, Ver_Id, titleCode, question_no, question_text, answer_type)
VALUES(?, ?, ?, ?, ?, ?)
`;


module.exports = {
  lastFormId,
  lastItemId,
  SurveyFormInsert,
  SurveyItemInsert
};