// D:\node-vue-project\server\database\sql\admin_instiuser_sql.js

// 💡 1. 소속원 목록 조회 (검색어 + 대기상태 토글 필터 적용)
const selectInstiUserList = `
  SELECT 
    U.user_id,
    U.name,
    U.id,
    I.institution_name,
    U.tel,
    U.role,
    DATE_FORMAT(U.join_date, '%Y.%m.%d') as join_date,
    U.state
  FROM InstiUser_Tbl U
  LEFT JOIN Institution_Tbl I ON U.institution_id = I.institution_id
  WHERE (? IS NULL OR U.name LIKE CONCAT('%', ?, '%'))
    AND (? = 'false' OR U.state = '대기') -- 토글이 켜져있으면 '대기'만 검색 (DB 코드값에 맞춰 '대기'를 'b001' 등으로 수정 필요할 수 있음);
    AND (? IS NULL OR U.role = ?)
  ORDER BY U.join_date DESC
`;

// 💡 2. 소속원 선택 승인 (대기 -> 승인)
const approveInstiUsers = `
  UPDATE InstiUser_Tbl 
  SET state = '승인' 
  WHERE user_id IN (?)
`;

// 💡 3. 소속원 선택 삭제
const deleteInstiUsers = `
  DELETE FROM InstiUser_Tbl 
  WHERE user_id IN (?)
`;

module.exports = { selectInstiUserList, approveInstiUsers, deleteInstiUsers };
