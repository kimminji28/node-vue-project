// D:\node-vue-project\server\database\sql\admin_institution_sql.js
// 💡 1. 기관 목록 조회 (검색 필터 포함)
const selectInstitutionList = `
  SELECT 
    institution_id,
    institution_name as name,
    tel,
    zipCode,
    address,
    status
  FROM Institution_Tbl
  WHERE ( ? IS NULL OR name LIKE CONCAT('%', ?, '%') )
    AND ( ? IS NULL OR status = ? )
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
    status
  FROM Institution_Tbl WHERE institution_id = ?
`;

// 💡 3. 기관 직접 등록 (대기 없이 바로 등록)
const insertInstitution = `
  INSERT INTO Institution_Tbl (
    institution_id, institution_name, zipCode, address, tel, status
  ) VALUES (?, ?, ?, ?, ?, ?)
`;

// 💡 4. 기관 정보 수정 (상태 변경 포함)
const updateInstitution = `
  UPDATE Institution_Tbl 
  SET institution_name = ?, zipCode = ?, address = ?, tel = ?, status = ?
  WHERE institution_id = ?
`;

// 💡 5. 마지막 PK 조회 (ID 생성을 위해)
const selectMaxInstId = `
  SELECT institution_id FROM Institution_Tbl ORDER BY institution_id DESC LIMIT 1
`;

module.exports = {
  selectInstitutionList,
  selectInstitutionDetail,
  insertInstitution,
  updateInstitution,
  selectMaxInstId,
};
