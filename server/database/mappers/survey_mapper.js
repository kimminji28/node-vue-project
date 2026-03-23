//조사서 관련 mapper
const { pool } = require("../DAO");
const surveySql = require("../sql/survey_sql");

//조사지 전체조회 <김민지, 디비에 있는 데이터 가져와서 전체조회>
const selectSurveyAll = async () => {
  let conn = null;
  conn = await pool.getConnection();
  try {
    let rows = await conn.query(surveySql.selectSurveyAll);
    return rows;
  } catch (err) {
    console.log(err);
  } finally {
    if (conn) conn.release();
  }
};

//조사지 건별조회 <김민지, 디비에 있는 데이터 가져와서 건별조회>
const selectSurveyById = async (no) => {
  let conn = null;
  conn = await pool.getConnection();
  try {
    let rows = await conn.query(surveySql.selectSurveyById, no);
    return rows[0];
  } catch (err) {
    console.log(err);
  } finally {
    if (conn) conn.release();
  }
};

//조사지 등록 <김민지>
const insertSurvey = async (surveyInfo) => {
  let conn = null; //아직 커넥션 안빌려왔으니 초기값을 null로 설정;
  try {
    conn = await pool.getConnection(); //커넥션 풀에서 사용 가능한 커넥션을 하나 가져옴(이미 만들어진 걸 재사용)
    let rows = await conn.query(surveySql.insertSurvey, surveyInfo);
    console.log(rows);
    //surveySql에서 등록 쿼리 가져오고, 파라미터에서 등록할 값을 전달
    return rows; //rows 값을 리턴해서 돌려줌
  } catch (err) {
    console.log(err); //콘솔에 에러 표시
  } finally {
    if (conn) conn.release(); //커넥션 반환
  }
};

module.exports = { selectSurveyAll, selectSurveyById, insertSurvey };
