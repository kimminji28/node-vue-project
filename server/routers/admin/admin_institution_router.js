// D:\node-vue-project\server\routes\admin_institution_router.js
const express = require("express");
const router = express.Router();
const service = require("../../services/admin_institution_service.js");

// 💡 시스템관리자 기관 등록 API
// POST /api/admin/institution/register (프론트에서 이 주소로 요청합니다!)
router.post("/register", async (req, res) => {
  try {
    // 🌟 [보안] 시스템 관리자인지 확인 (세션 정보에 맞게 수정 필요)
    // if (!req.session.loginSysAdmin) {
    //   return res.status(401).json({ message: "시스템 관리자 로그인이 필요합니다." });
    // }

    // 프론트엔드에서 보낸 데이터 꺼내기
    const { name, zipCode, address, tel, email, status } = req.body;

    // 🌟 1. 필수값 유효성 검사 (서버단 방어)
    if (!name || !zipCode || !address || !tel) {
      return res
        .status(400)
        .json({ message: "필수 항목(기관명, 주소, 연락처)이 누락되었습니다." });
    }

    // 🌟 2. 서비스 호출하여 DB 등록 수행
    const registeredData = await service.registerInstitution({
      name,
      zipCode,
      address,
      tel,
      email, // 🚨 전달은 하지만, Service에서 DB 쿼리에 포함되지 않음!
      status,
    });

    // 🌟 3. 성공 응답 보내기
    res.status(200).json({
      message: "기관이 성공적으로 등록되었습니다.",
      institution_id: registeredData.newInstId, // 새로 생성된 ID 반환
    });
  } catch (err) {
    console.error(`[시스템관리자] 기관 등록 라우터 에러: ${err}`);
    res.status(500).json({ message: "서버 에러가 발생했습니다." });
  }
});

router.get("/list", async (req, res) => {
  try {
    // 🌟 [보안 검사 로직 필요 시 추가]

    const searchName = req.query.name || null;
    const searchState = req.query.state || null;

    const list = await service.getInstitutionList(searchName, searchState);

    res.status(200).json({
      message: "기관 목록 조회 성공",
      data: list,
    });
  } catch (err) {
    console.error(`[시스템관리자] 기관 목록 조회 라우터 에러: ${err}`);
    res.status(500).json({ message: "서버 에러가 발생했습니다." });
  }
});

// 기관 상세 조회 API (수정 페이지에서 데이터 불러올 때 사용)
router.get("/:id", async (req, res) => {
  try {
    const detail = await service.getInstitutionDetail(req.params.id);
    if (!detail)
      return res.status(404).json({ message: "기관을 찾을 수 없습니다." });
    res.status(200).json({ data: detail });
  } catch (err) {
    console.error(`[시스템관리자] 기관 상세 조회 라우터 에러:`, err);
    res.status(500).json({ message: "조회 중 오류가 발생했습니다." });
  }
});

// 기관 정보 수정 API (수정 버튼 누를 때 사용)
router.put("/:id", async (req, res) => {
  try {
    await service.updateInstitution(req.params.id, req.body);
    res.status(200).json({ message: "성공적으로 수정되었습니다." });
  } catch (err) {
    res.status(500).json({ message: "수정 중 오류가 발생했습니다." });
  }
});

router.delete("/", async (req, res) => {
  try {
    const { ids } = req.body; // 프론트에서 배열 형태로 보냄 (예: ['INST0001', 'INST0002'])

    if (!ids || ids.length === 0) {
      return res.status(400).json({ message: "삭제할 기관이 없습니다." });
    }

    await service.deleteInstitutions(ids);
    res
      .status(200)
      .json({ message: "선택한 기관이 성공적으로 삭제되었습니다." });
  } catch (err) {
    console.error(`[시스템관리자] 기관 삭제 라우터 에러:`, err);
    res.status(500).json({ message: "삭제 중 오류가 발생했습니다." });
  }
});

module.exports = router;
