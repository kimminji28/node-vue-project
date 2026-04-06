const { pool } = require("../DAO.js");
const adminInstSql = require("../sql/admin_institution_sql.js");

/**
 * 1. 기관 목록 조회
 * @param {string} name - 검색할 기관명 (없으면 null)
 * @param {string} status - 운영 상태 코드 (b001, b002, b003 / 없으면 null)
 */
const getInstitutionList = async (name, status) => {
  let conn = null;
  try {
    conn = await pool.getConnection();
    // SQL의 ? IS NULL 패턴 때문에 [값, 값, 값, 값] 순서로 4개를 넘겨줍니다.
    const params = [name, name, status, status];
    const rows = await conn.query(adminInstSql.selectInstitutionList, params);
    return rows;
  } catch (err) {
    console.error(`[시스템관리자] 기관 목록 조회 매퍼 에러: ${err}`);
    throw err;
  } finally {
    if (conn) conn.release();
  }
};

/**
 * 2. 기관 상세 조회 (수정 폼 데이터 바인딩용)
 */
const getInstitutionDetail = async (instId) => {
  let conn = null;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(adminInstSql.selectInstitutionDetail, [
      instId,
    ]);
    return rows[0]; // 상세조회이므로 첫 번째 행만 반환
  } catch (err) {
    console.error(`[시스템관리자] 기관 상세 조회 매퍼 에러: ${err}`);
    throw err;
  } finally {
    if (conn) conn.release();
  }
};

/**
 * 3. 기관 직접 등록
 */
const insertInstitution = async (instData) => {
  let conn = null;
  try {
    conn = await pool.getConnection();
    // params: [id, name, zipCode, address, tel, status]
    const result = await conn.query(adminInstSql.insertInstitution, instData);
    return result;
  } catch (err) {
    console.error(`[시스템관리자] 기관 등록 매퍼 에러: ${err}`);
    throw err;
  } finally {
    if (conn) conn.release();
  }
};

/**
 * 4. 기관 정보 수정
 */
const updateInstitution = async (instData) => {
  let conn = null;
  try {
    conn = await pool.getConnection();
    // params: [name, zipCode, address, tel, status, id]
    const result = await conn.query(adminInstSql.updateInstitution, instData);
    return result;
  } catch (err) {
    console.error(`[시스템관리자] 기관 수정 매퍼 에러: ${err}`);
    throw err;
  } finally {
    if (conn) conn.release();
  }
};

/**
 * 5. 마지막 PK 조회 (ID 생성용)
 */
const getMaxInstId = async () => {
  let conn = null;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(adminInstSql.selectMaxInstId);
    return rows[0]; // { institution_id: 'INST0015' } 형태
  } catch (err) {
    console.error(`[시스템관리자] 마지막 기관 ID 조회 에러: ${err}`);
    throw err;
  } finally {
    if (conn) conn.release();
  }
};

/**
 * 6. 기관 선택 삭제
 * @param {Array} ids - 삭제할 기관 ID 배열 (예: ['INST0001', 'INST0002'])
 */
const deleteInstitutions = async (ids) => {
  let conn = null;
  try {
    conn = await pool.getConnection();
    // 🌟 IN (?) 절에 배열을 통째로 넣기 위해 [ids] 형태로 전달합니다.
    const result = await conn.query(adminInstSql.deleteInstitutions, [ids]);
    return result;
  } catch (err) {
    console.error(`[시스템관리자] 기관 삭제 매퍼 에러: ${err}`);
    throw err;
  } finally {
    if (conn) conn.release();
  }
};

module.exports = {
  getInstitutionList,
  getInstitutionDetail,
  insertInstitution,
  updateInstitution,
  getMaxInstId,
  deleteInstitutions,
};
