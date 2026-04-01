// src/routes/notice_router.js
const express = require("express");
const router = express.Router();
const noticeService = require("../../services/notice_service.js");

// 💡 1. 공지사항 목록 조회 (GET /notice/list)
router.get("/list", async (req, res) => {
  try {
    const result = await noticeService.fetchNoticeList(req.query);
    res.status(200).json(result);
  } catch (err) {
    console.error("공지사항 목록 조회 실패:", err);
    res.status(500).json({ message: "서버 에러가 발생했습니다." });
  }
});

// 💡 2. 공지사항 상세 조회 (GET /notice/:id)
router.get("/:id", async (req, res) => {
  try {
    const result = await noticeService.fetchNoticeDetail(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "공지사항을 찾을 수 없습니다." });
    }
    res.status(200).json(result);
  } catch (err) {
    console.error("공지사항 상세 조회 실패:", err);
    res.status(500).json({ message: "서버 에러가 발생했습니다." });
  }
});

// 💡 3. 공지사항 등록 (POST /notice/write)
router.post("/write", async (req, res) => {
  try {
    const newNoticeId = await noticeService.addNotice(req.body);
    res
      .status(200)
      .json({
        message: "공지사항이 성공적으로 등록되었습니다.",
        noticeId: newNoticeId,
      });
  } catch (err) {
    console.error("공지사항 등록 실패:", err);
    res.status(500).json({ message: "공지사항 등록 중 오류가 발생했습니다." });
  }
});

// 💡 4. 공지사항 수정 (PUT /notice/:id)
router.put("/:id", async (req, res) => {
  try {
    await noticeService.modifyNotice(req.params.id, req.body);
    res.status(200).json({ message: "공지사항이 성공적으로 수정되었습니다." });
  } catch (err) {
    console.error("공지사항 수정 실패:", err);
    res.status(500).json({ message: "공지사항 수정 중 오류가 발생했습니다." });
  }
});

// 💡 5. 공지사항 삭제 (DELETE /notice/:id)
router.delete("/:id", async (req, res) => {
  try {
    await noticeService.removeNotice(req.params.id);
    res.status(200).json({ message: "공지사항이 삭제되었습니다." });
  } catch (err) {
    console.error("공지사항 삭제 실패:", err);
    res.status(500).json({ message: "공지사항 삭제 중 오류가 발생했습니다." });
  }
});

module.exports = router;
