// // main_sql.js
// // 메인페이지 관련 sql문
// // 공통 쿼리 분리
// const baseSelect = `
// SELECT gu.name as generalName,
//       iu.name as instiName,
//       su.name as supportName,
//       DATE_FORMAT(sv.created_at, '%y-%m-%d') as registerDate,
//       sv.result as priorityCode,
//       sv.J_ID as surveyId,
//       (
//         (SELECT COUNT(*) FROM Plan_Tbl p WHERE p.J_ID = sv.J_ID AND (p.state IS NULL OR p.state NOT IN ('g001', 'g002'))) +
//         (SELECT COUNT(*) FROM PlanResult_Tbl r INNER JOIN Plan_Tbl p ON r.supportPlan_id = p.supportPlan_id WHERE p.J_ID = sv.J_ID AND (r.state IS NULL OR r.state NOT IN ('g001', 'g002')))
//       ) as reviewCount,
//       (SELECT COUNT(*) FROM Plan_Tbl p WHERE p.J_ID = sv.J_ID AND p.state = 'g001') as planCount,
//       (
//         (SELECT COUNT(*) FROM Plan_Tbl p WHERE p.J_ID = sv.J_ID AND p.state = 'g002') +
//         (SELECT COUNT(*) FROM PlanResult_Tbl r INNER JOIN Plan_Tbl p ON r.supportPlan_id = p.supportPlan_id WHERE p.J_ID = sv.J_ID AND r.state = 'g002')
//       ) as rejectCount,
//       (SELECT COUNT(*) FROM PlanResult_Tbl r INNER JOIN Plan_Tbl p ON r.supportPlan_id = p.supportPlan_id WHERE p.J_ID = sv.J_ID AND r.state = 'g001') as finishCount,
//       (SELECT COUNT(*) FROM Plan_Tbl p WHERE p.J_ID = sv.J_ID) as hasPlanCount,
//       (SELECT COUNT(*) FROM PlanResult_Tbl r INNER JOIN Plan_Tbl p ON r.supportPlan_id = p.supportPlan_id WHERE p.J_ID = sv.J_ID) as hasResultCount
// FROM GeneralUser_Tbl gu
// INNER JOIN InstiUser_Tbl iu ON gu.institution_id = iu.institution_id
// INNER JOIN Support_Tbl su ON gu.G_UserId = su.G_UserId
// INNER JOIN Survey_Tbl sv ON gu.G_UserId = sv.G_UserId
// `;

// // 페이징 sql
// const baseCount = `
// SELECT COUNT(DISTINCT sv.J_ID) as totalCount
// FROM GeneralUser_Tbl gu
// INNER JOIN InstiUser_Tbl iu ON gu.institution_id = iu.institution_id
// INNER JOIN Support_Tbl su ON gu.G_UserId = su.G_UserId
// INNER JOIN Survey_Tbl sv ON gu.G_UserId = sv.G_UserId
// `;

// const selectByUser =
//   baseSelect +
//   `
// WHERE gu.G_UserId = ? AND iu.roll IN ('a003')
// ORDER BY sv.created_at DESC
// LIMIT ? OFFSET ?
// `;

// const countByUser =
//   baseCount +
//   `
// WHERE gu.G_UserId = ? AND iu.roll IN ('a003')
// `;

// const selectByManager =
//   baseSelect +
//   `
// WHERE iu.I_UserId = ? AND iu.roll = 'a003'
// ORDER BY sv.created_at DESC
// LIMIT ? OFFSET ?
// `;

// const countByManager =
//   baseCount +
//   `
// WHERE iu.I_UserId = ? AND iu.roll = 'a003'
// `;

// const selectByGeneral =
//   baseSelect +
//   `
// WHERE gu.institution_id = ? AND iu.roll = 'a003'
// ORDER BY sv.created_at DESC
// LIMIT ? OFFSET ?
// `;

// const countByGeneral =
//   baseCount +
//   `
// WHERE gu.institution_id = ? AND iu.roll = 'a003'
// `;

// module.exports = {
//   selectByUser,
//   countByUser,
//   selectByManager,
//   countByManager,
//   selectByGeneral,
//   countByGeneral,
// };
// main_sql.js

const baseSelect = `
SELECT gu.name as generalName,
      iu.name as instiName,
      su.name as supportName,
      DATE_FORMAT(sv.created_at, '%y-%m-%d') as registerDate,
      sv.result as priorityCode,
      sv.J_ID as surveyId,
      (
        (SELECT COUNT(*) FROM Plan_Tbl p WHERE p.J_ID = sv.J_ID AND (p.state IS NULL OR p.state NOT IN ('g001', 'g002'))) + 
        (SELECT COUNT(*) FROM PlanResult_Tbl r INNER JOIN Plan_Tbl p ON r.supportPlan_id = p.supportPlan_id WHERE p.J_ID = sv.J_ID AND (r.state IS NULL OR r.state NOT IN ('g001', 'g002')))
      ) as reviewCount,
      (SELECT COUNT(*) FROM Plan_Tbl p WHERE p.J_ID = sv.J_ID AND p.state = 'g001') as planCount,
      (
        (SELECT COUNT(*) FROM Plan_Tbl p WHERE p.J_ID = sv.J_ID AND p.state = 'g002') + 
        (SELECT COUNT(*) FROM PlanResult_Tbl r INNER JOIN Plan_Tbl p ON r.supportPlan_id = p.supportPlan_id WHERE p.J_ID = sv.J_ID AND r.state = 'g002')
      ) as rejectCount,
      (SELECT COUNT(*) FROM PlanResult_Tbl r INNER JOIN Plan_Tbl p ON r.supportPlan_id = p.supportPlan_id WHERE p.J_ID = sv.J_ID AND r.state = 'g001') as finishCount,
      (SELECT COUNT(*) FROM Plan_Tbl p WHERE p.J_ID = sv.J_ID) as hasPlanCount,
      (SELECT COUNT(*) FROM PlanResult_Tbl r INNER JOIN Plan_Tbl p ON r.supportPlan_id = p.supportPlan_id WHERE p.J_ID = sv.J_ID) as hasResultCount
FROM GeneralUser_Tbl gu
INNER JOIN Support_Tbl su ON gu.G_UserId = su.G_UserId
INNER JOIN Survey_Tbl sv ON gu.G_UserId = sv.G_UserId
/* 💡 핵심 포인트: 기관으로 묶는 게 아니라, Support_Tbl에 적힌 진짜 담당자 ID(I_UserId1)랑 조인! */
/* 💡 LEFT JOIN을 써서 담당자가 NULL이어도 데이터가 안 날아가게 보호함! */
LEFT JOIN InstiUser_Tbl iu ON su.I_UserId1 = iu.I_UserId
`;

const baseCount = `
SELECT COUNT(DISTINCT sv.J_ID) as totalCount
FROM GeneralUser_Tbl gu
INNER JOIN Support_Tbl su ON gu.G_UserId = su.G_UserId
INNER JOIN Survey_Tbl sv ON gu.G_UserId = sv.G_UserId
LEFT JOIN InstiUser_Tbl iu ON su.I_UserId1 = iu.I_UserId
`;

// ==========================================
// 일반 이용자 (USER): 자기 것만 본다
// ==========================================
const selectByUser =
  baseSelect +
  `
WHERE gu.G_UserId = ? 
ORDER BY sv.created_at DESC
LIMIT ? OFFSET ?
`;

const countByUser =
  baseCount +
  `
WHERE gu.G_UserId = ?
`;

// ==========================================
// 기관 담당자 (MANAGER): "나에게 배정된 것"만 본다
// ==========================================
const selectByManager =
  baseSelect +
  `
WHERE su.I_UserId1 = ? 
ORDER BY sv.created_at DESC
LIMIT ? OFFSET ?
`;

const countByManager =
  baseCount +
  `
WHERE su.I_UserId1 = ?
`;

// ==========================================
// 기관 관리자 (GENERAL): 담당자 유무 상관없이 소속 기관 전체를 본다
// ==========================================
const selectByGeneral =
  baseSelect +
  `
WHERE gu.institution_id = ? 
ORDER BY sv.created_at DESC
LIMIT ? OFFSET ?
`;

const countByGeneral =
  baseCount +
  `
WHERE gu.institution_id = ?
`;

module.exports = {
  selectByUser,
  countByUser,
  selectByManager,
  countByManager,
  selectByGeneral,
  countByGeneral,
};
