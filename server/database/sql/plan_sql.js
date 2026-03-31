//지원계획서 관련 sql문

const getLastPlanId = 
`
SELECT supportPlan_id
FROM Plan_Tbl
ORDER BY CAST(SUBSTRING(supportPlan_id,5) AS UNSIGNED) DESC
LIMIT 1
`;

const insertPlan = 
`
INSERT INTO Plan_Tbl(
  supportPlan_id, 
  J_ID, 
  I_UserId1, 
  I_UserId2, 
  support_startDate, 
  supprot_endDate, 
  purpose, 
  content, 
  file, 
  file2,
  state)  
VALUES (
  ?, ?, ?, NULL, ?, ?, ?, ?, ?, ?, "g003"
)
`;

const getSurveyListByInstUser =
`
SELECT
    s.J_ID,
    s.Ver_Id,
    s.G_UserId,
    s.support_id,
    s.result,
    s.reason,
    s.created_at,
    s.updated_at,

    sp.name AS support_name,
    sp.born AS support_born,
    sp.gender AS support_gender,
    sp.relation AS support_relation,
    sp.zipCode AS support_zipCode,
    sp.address AS support_address,
    sp.major AS support_major,
    ds.description as disname,
    sp.middle AS support_middle,
    sp.sub AS support_sub,
    sp.I_UserId1,
    sp.I_UserId2,

    g.name AS general_name,
    g.id AS general_login_id,
    g.tel AS general_tel,
    g.email AS general_email,
    g.zipCode AS general_zipCode,
    g.address AS general_address,
    g.institution_id
FROM Survey_Tbl s
INNER JOIN Support_Tbl sp
    ON s.support_id = sp.support_id
INNER JOIN GeneralUser_Tbl g
    ON s.G_UserId = g.G_UserId
LEFT JOIN DisMajor_Tbl ds
	ON sp.major = ds.b_Code
WHERE
    (sp.I_UserId1 = ? OR sp.I_UserId2 = ?)
ORDER BY s.created_at DESC
`;

const getSupportListByInstUser = 
`
SELECT
    p.supportPlan_id,
    p.J_ID,
    p.I_UserId1,
    p.I_UserId2,
    u.name AS writer_name,
    p.purpose,
    p.content,
    p.support_startDate,
    p.supprot_endDate,
    p.file,
    p.file2,
    p.wirte_at,
    p.state,
    p.reject_reason
FROM Plan_Tbl p
LEFT JOIN InstiUser_Tbl u
    ON p.I_UserId1 = u.I_UserId
WHERE p.I_UserId1 = ?
ORDER BY p.wirte_at DESC
`;

module.exports = {getLastPlanId, insertPlan, getSurveyListByInstUser, getSupportListByInstUser};
