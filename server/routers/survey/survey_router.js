//조사지 관련 router
const express = require("express");
const router = express.Router();
const surveyService = require("../../services/survey_service");

//조사지 전체조회 <김민지, 브라우저에 응답 결과 전달>
router.get("/user", async (req, res) => {
  let result = await surveyService.findAll();
  res.send(result);
});

//조사지 건별조회 <김민지, 브라우저에 응답 결과 전달>
router.get("/user/:no", async (req, res) => {
  let target = req.params.no;
  let result = await surveyService.fineInfoByNo(target);
  res.send(result);
});

//조사지 등록 <김민지, 브라우저에 응답 결과 전달>
router.post(`/user`, async (req, res) => {
  let target = req.body;
  let result = await surveyService.createInfo(target);
  res.send(result);
});

module.exports = router;
