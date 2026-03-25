//sysAdmin 라우터

const express = require("express");
const router = express.Router();


//밥먹고와서수정해라
const adminService = require("../../services/admin_service.js");

router.post(`/surveyadd`, async (req, res) => {
  let body = req.body;
  let result = await adminService.SurveyInsert(body);
  res.send(result);
});

module.exports = router;
