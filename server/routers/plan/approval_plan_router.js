// src/routes/approval_plan_router.js
const express = require("express");
const router = express.Router();
const service = require("../../services/approval_plan_service.js");

// 1. 대기 목록 조회 API
router.get("/list", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const instiId = "INST0000"; // 🚨 임시 하드코딩 (관리자 소속 기관)

    const filters = {
      managerName: req.query.managerName || "",
      guardianName: req.query.guardianName || "",
      supportName: req.query.supportName || "",
    };

    const result = await service.fetchPendingList(
      instiId,
      filters,
      page,
      limit,
    );
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "조회 실패", error: err.message });
  }
});

// 2. 승인 API (PUT 요청)
router.put("/approve/:planId", async (req, res) => {
  try {
    const planId = req.params.planId;
    await service.handleApprove(planId);
    res.status(200).json({ message: "승인 완료" });
  } catch (err) {
    res.status(500).json({ message: "승인 처리 실패", error: err.message });
  }
});

// 3. 반려 API (PUT 요청 - body에 반려 사유 포함)
router.put("/reject/:planId", async (req, res) => {
  try {
    const planId = req.params.planId;
    const { rejectReason } = req.body; // 프론트 모달창에서 적은 사유
    await service.handleReject(planId, rejectReason);
    res.status(200).json({ message: "반려 완료" });
  } catch (err) {
    res.status(500).json({ message: "반려 처리 실패", error: err.message });
  }
});

module.exports = router;
