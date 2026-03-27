// priority_router.js 우선순위 요청
const express = require("express");
const router = express.Router();
const priorityService = require("../../services/priority_service.js");

router.get("/:id", async (req, res) => {
  try {
    const info = await priorityService.fetchSupportInfo(req.params.id);
    res.json(info);
  } catch (err) {
    console.error(`지원자 정보 조회 라우터 에러: ${err}`);
    res.status(500).json({ message: "서버 에러 발생" });
  }
});

router.post("/:id", async (req, res) => {
  try {
    const surveyId = req.params.id; // 파라미터에서 J_ID 뽑기
    const requestData = req.body; // 바디에서 우선순위랑 사유 뽑기

    const result = await priorityService.processPriorityRequest(
      surveyId,
      requestData,
    );

    if (result) {
      res.status(200).json({ message: "우선순위 승인 요청이 완료되었습니다!" });
    } else {
      res.status(500).json({ message: "DB 저장 중 오류가 발생했습니다." });
    }
  } catch (err) {
    console.error(`승인 요청 라우터 에러: ${err}`);
    res.status(500).json({ message: "서버 에러 발생" });
  }
});

module.exports = router;
