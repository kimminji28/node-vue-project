//회원 관련 service
const userMapper = require("../database/mappers/user_mapper");

const testSelect = () => {
  let list = userMapper.testSelect();
  return list;
};

//일반이용자 회원가입<김경환, mapper에 있는 함수를 라우터에 결과 전달>
const createUser = async (userObj) => {
  //객체를 배열로 변환
  const {
    name,
    id,
    password,
    tel,
    email,
    zipCode,
    address,
    document1,
    document2,
  } = userObj;
  //해당 값을 배열로 생성
  let insertData = [
    name,
    id,
    password,
    tel,
    email,
    zipCode,
    address,
    document1,
    document2,
  ];
  //Mapper 실행
  let result = await userMapper.insertUser(insertData);
  //결과 처리
  let resObj = {
    status: result.insertId > 0 ? "success" : "fail",
    G_UserId: result.insertId,
  };
  return resObj;
};

//기관이용자 회원가입<김경환, mapper에 있는 함수를 라우터에 결과 전달>
const createInstiUser = async (userObj) => {
  const { name, id, password, tel } = userObj;

  let insertData = [name, id, password, tel];

  let result = await userMapper.insertInstiUser(insertData);

  let resObj = {
    status: result.insertId > 0 ? "success" : "fail",
    I_UserId: result.insertId,
  };
  return resObj;
};
module.exports = {
  testSelect,
  createUser,
  createInstiUser,
};
