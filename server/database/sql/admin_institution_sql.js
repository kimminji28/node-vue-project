// D:\node-vue-project\server\database\sql\admin_institution_sql.js
// 💡 1. 기관 목록 조회 (검색 필터 포함)
const selectInstitutionList = `
  SELECT 
    institution_id,
    institution_name as name,
    tel,
    zipCode,
    address,
    email,
    state,
    DATE_FORMAT(join_date, '%Y.%m.%d') as join_date
  FROM Institution_Tbl
  WHERE ( ? IS NULL OR institution_name LIKE CONCAT('%', ?, '%') )
    AND ( ? IS NULL OR state = ? )
  ORDER BY institution_id DESC
`;

// 💡 2. 기관 상세 조회
const selectInstitutionDetail = `
  SELECT
    institution_id,
    institution_name as name,
    zipCode,
    address,
    tel,
    email,
    state
  FROM Institution_Tbl WHERE institution_id = ?
`;

// 💡 3. 기관 직접 등록 (email, state, join_date 추가 및 ? 갯수 7개로 맞춤!)
const insertInstitution = `
  INSERT INTO Institution_Tbl (
    institution_id, institution_name, zipCode, address, tel, email, state, join_date
  ) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())
`;

// 💡 4. 기관 정보 수정 (상태 변경 포함)
const updateInstitution = `
  UPDATE Institution_Tbl 
  SET institution_name = ?, zipCode = ?, address = ?, tel = ?, email = ?, state = ?
  WHERE institution_id = ?
`;

// 💡 5. 마지막 PK 조회 (ID 생성을 위해)
const selectMaxInstId = `
  SELECT institution_id FROM Institution_Tbl ORDER BY institution_id DESC LIMIT 1
`;

const deleteInstitutions = `
  DELETE FROM Institution_Tbl
  WHERE institution_id IN (?)
`;

module.exports = {
  selectInstitutionList,
  selectInstitutionDetail,
  insertInstitution,
  updateInstitution,
  selectMaxInstId,
  deleteInstitutions,
};
