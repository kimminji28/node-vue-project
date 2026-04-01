// src/services/result_plan_service.js
const mapper = require("../database/mappers/result_plan_mapper.js");

// 1. 조회
const fetchApprovedPlansForModal = async (managerId, filters, page, limit) => {
  const offset = (page - 1) * limit;
  const rawList = await mapper.getApprovedPlans(
    managerId,
    filters,
    limit,
    offset,
  );

  const formattedList = rawList.map((item) => {
    const formatDate = (dateStr) => {
      if (!dateStr) return "";
      const d = new Date(dateStr);
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    };

    return {
      ...item,
      support_startDate: formatDate(item.support_startDate),
      supprot_endDate: formatDate(item.supprot_endDate),
      wirte_at: formatDate(item.wirte_at),
    };
  });

  return { data: formattedList, totalCount: formattedList.length };
};

// 2. 등록
const savePlanResult = async (data) => {
  // 💡 정식 자동 채번(Auto Increment) 로직
  const maxIdRow = await mapper.getMaxResultId();

  let nextId = "REST0000"; // 기본값 (아무 데이터도 없을 때)

  if (maxIdRow && maxIdRow.length > 0 && maxIdRow[0].maxId) {
    const currentMaxId = maxIdRow[0].maxId; // 예: "REST0000" 또는 "REST0838"
    // "REST" 글자를 빈칸으로 바꾸고 숫자만 빼내서 숫자로 변환
    const currentNum = parseInt(currentMaxId.replace("REST", ""));
    const nextNum = currentNum + 1; // +1 증가!
    // 다시 4자리로 맞추고 "REST" 붙이기 (padStart로 0 채우기)
    nextId = `REST${String(nextNum).padStart(4, "0")}`;
  }

  // 생성된 순차 ID를 데이터에 쏙 넣기!
  data.result_report = nextId;

  await mapper.createPlanResult(data);
  return { success: true, id: data.result_report };
};

const fetchGeneralResultList = async (
  instiId,
  managerId,
  filters,
  page,
  limit,
) => {
  const offset = (page - 1) * limit;
  const rawList = await mapper.getGeneralResultList(
    instiId,
    managerId,
    filters,
    limit,
    offset,
  );

  const formattedList = rawList.map((item) => {
    const formatDate = (dateStr) => {
      if (!dateStr) return "";
      const d = new Date(dateStr);
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    };

    // 🌟 상태 코드 한글 매핑
    const stateMap = { g001: "승인 완료", g002: "반려", g003: "승인요청중" };

    return {
      ...item,
      support_startDate: formatDate(item.support_startDate),
      supprot_endDate: formatDate(item.supprot_endDate),
      created_at: formatDate(item.created_at),
      stateName: stateMap[item.state] || "대기",
    };
  });

  return { data: formattedList, totalCount: formattedList.length };
};

// 결과서 반려 목록 조회
const fetchRejectedResultList = async (
  instiId,
  managerId,
  filters,
  page,
  limit,
) => {
  const offset = (page - 1) * limit;
  const rawList = await mapper.getRejectedResultList(
    instiId,
    managerId,
    filters,
    limit,
    offset,
  );

  const formattedList = rawList.map((item) => {
    const formatDate = (dateStr) => {
      if (!dateStr) return "";
      const d = new Date(dateStr);
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    };

    return {
      ...item,
      support_startDate: formatDate(item.support_startDate),
      supprot_endDate: formatDate(item.supprot_endDate),
      created_at: formatDate(item.created_at),
      stateName: "반려", // 고정
    };
  });

  return { data: formattedList, totalCount: formattedList.length };
};

module.exports = {
  fetchApprovedPlansForModal,
  savePlanResult,
  fetchGeneralResultList,
  fetchRejectedResultList,
};
