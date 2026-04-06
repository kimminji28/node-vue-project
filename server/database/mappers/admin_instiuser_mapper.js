// D:\node-vue-project\server\database\mapper\admin_instiuser_mapper.js
const { pool } = require("../DAO.js");
const sql = require("../sql/admin_instiuser_sql.js"); // 아까 만든 SQL 파일 연결

/**
 * 1. 소속원 목록 조회 (검색 및 토글 필터)
 */
const getInstiUserList = async (name, isWaitOnly) => {
  let conn = null;
  try {
    conn = await pool.getConnection();
    // SQL 쿼리의 물음표(?) 3개에 매칭: [이름, 이름, 토글상태문자열]
    const params = [name, name, String(isWaitOnly)];
    const rows = await conn.query(sql.selectInstiUserList, params);
    return rows;
  } catch (err) {
    console.error(`[시스템관리자] 기관소속원 목록 조회 매퍼 에러: ${err}`);
    throw err;
  } finally {
    if (conn) conn.release();
  }
};

/**
 * 2. 소속원 선택 승인 (대기 -> 승인)
 */
const approveInstiUsers = async (ids) => {
  let conn = null;
  try {
    conn = await pool.getConnection();
    // IN (?) 에 배열을 넣기 위해 [ids] 로 감싸서 전달
    const result = await conn.query(sql.approveInstiUsers, [ids]);
    return result;
  } catch (err) {
    console.error(`[시스템관리자] 기관소속원 승인 매퍼 에러: ${err}`);
    throw err;
  } finally {
    if (conn) conn.release();
  }
};

/**
 * 3. 소속원 선택 삭제
 */
const deleteInstiUsers = async (ids) => {
  let conn = null;
  try {
    conn = await pool.getConnection();
    const result = await conn.query(sql.deleteInstiUsers, [ids]);
    return result;
  } catch (err) {
    console.error(`[시스템관리자] 기관소속원 삭제 매퍼 에러: ${err}`);
    throw err;
  } finally {
    if (conn) conn.release();
  }
};

module.exports = {
  getInstiUserList,
  approveInstiUsers,
  deleteInstiUsers,
};
