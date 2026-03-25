//admin mapper
const { pool } = require("../DAO");
const adminSql = require("../sql/admin_sql");



//조사지Form테이블 PK 생성용 마지막 row PK조회
const getLastSurveyFormId = async () => {
  let conn = null;
  try {
    conn = await pool.getConnection();
    let [rows, meta] = await conn.query(adminSql.lastFormId);
    return rows;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    if (conn) {
      conn.release();
    }
  }
};

//조사지Item테이블 pk생성용 마지막 row PK조회
const getLastSurveyItemId = async () => {
  let conn = null;
  try {
    conn = await pool.getConnection();
    let [rows, meta] = await conn.query(adminSql.lastItemId);
    return rows;
  } catch (err) {
    console.log(err);
    throw err;
  }
  finally {
    if (conn) {
      conn.release();
    }
  }
};

//조사지 Insert
const insertSurveyAll = async (formData, itemDataList) => {
  let conn = null;

  try {
    conn = await pool.getConnection();
    await conn.beginTransaction();

    const formResult = await conn.query(adminSql.SurveyFormInsert, formData);
    if (formResult.affectedRows <= 0) {
      throw new Error("SurveyForm Insert 실패");
    };

    for (const itemData of itemDataList) {
      const itemResult = await conn.query(adminSql.SurveyItemInsert, itemData);

      if (itemResult.affectedRows <= 0) {
        throw new Error("SurveyItem Insert 실패");
      };
    };

    await conn.commit();

    return { status: "Success" };

  } catch (err) {
    await conn.rollback();
    return {
      status: "Failed",
      message: err.message
    };

  } finally {
    if (conn) {
      conn.release();
    }
  }
};


module.exports = {
  getLastSurveyFormId,
  getLastSurveyItemId,
  insertSurveyAll
};
