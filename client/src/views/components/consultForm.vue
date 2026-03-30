<template>
  <div class="container-fluid min-w-900 pb-5 bg-light min-vh-100">
    <div class="page-header min-height-100 border-radius-xl mt-4">
      <span class="mask bg-gradient-success opacity-6"></span>
    </div>

    <div class="card shadow-lg mt-n6 mx-3 mb-5">
      <div class="card-body p-3">
        <div
          class="d-flex align-items-center justify-content-between flex-row flex-nowrap w-100"
        >
          <div class="d-flex align-items-center">
            <h3 class="mb-0 fw-bold me-4" style="font-size: 1.1rem">
              발달장애인 지원 프로그램
            </h3>
            <ul
              class="nav nav-pills custom-horizontal-menu flex-row flex-nowrap"
            >
              <li class="nav-item">
                <RouterLink
                  class="px-3 py-2 nav-link d-flex align-items-center"
                  :to="{ name: 'managerMain' }"
                  active-class="active"
                >
                  <span class="me-1">🏠</span>
                  <span class="text-nowrap">첫 화면</span>
                </RouterLink>
              </li>
              <li class="nav-item ms-2">
                <RouterLink
                  class="px-3 py-2 nav-link d-flex align-items-center"
                  :to="{ name: 'userSurveyAdd' }"
                  active-class="active"
                >
                  <span class="me-1">📄</span>
                  <span class="text-nowrap">조사지신청</span>
                </RouterLink>
              </li>
            </ul>
          </div>
          <div class="text-center fw-bold color-primary flex-grow-1">
            예담지원센터, 미나리님!
          </div>
          <div class="d-flex gap-3 align-items-center text-nowrap">
            <span class="fw-bold text-sm cursor-pointer text-dark-hover"
              >마이페이지</span
            >
            <span class="text-secondary opacity-5">|</span>
            <span class="fw-bold text-sm cursor-pointer text-dark-hover"
              >로그아웃</span
            >
          </div>
        </div>
      </div>
    </div>

    <main
      class="max-w-6xl mx-auto bg-white p-6 border border-gray-300 shadow-sm"
    >
      <div class="text-center mb-5">
        <h2 class="text-3xl font-bold inline-flex items-center gap-2">
          📄 상담 기록
        </h2>
      </div>

      <div class="mb-5">
        <h4 class="text-lg font-bold mb-2">기본정보</h4>
        <table class="w-full border-collapse border-2 border-dark text-center">
          <tbody>
            <tr>
              <th
                class="border border-gray-400 bg-gray-100 p-2 w-32 text-sm relative"
              >
                <span
                  class="absolute -left-2 -top-2 bg-red-600 text-white w-5 h-5 flex items-center justify-center text-xs font-bold rounded-sm"
                  >1</span
                >
                상담일자 /<br />작성일자
              </th>
              <td class="border border-gray-400 p-1 w-48">
                <input
                  type="date"
                  v-model="form.consultDate"
                  class="custom-input"
                />
                <input
                  type="date"
                  v-model="form.consultDate"
                  class="custom-input"
                />
              </td>
              <th class="border border-gray-400 bg-gray-100 p-2 w-32 text-sm">
                시작시간 /<br />종료시간
              </th>
              <td class="border border-gray-400 p-1 w-48">
                <input
                  type="text"
                  v-model="form.timeRange"
                  class="custom-input"
                  placeholder="00:00~00:00"
                />
                <input
                  type="text"
                  v-model="form.timeRange"
                  class="custom-input"
                  placeholder="00:00~00:00"
                />
              </td>
              <th class="border border-gray-400 bg-gray-100 p-2 w-32 text-sm">
                장애유형
              </th>
              <td class="border border-gray-400 p-1 w-48">
                <input
                  type="text"
                  v-model="form.disabilityType"
                  class="custom-input"
                />
              </td>
              <th class="border border-gray-400 bg-gray-100 p-2 w-32 text-sm">
                상담장소
              </th>
              <td class="border border-gray-400 p-1">
                <input
                  type="text"
                  v-model="form.location"
                  class="custom-input"
                />
              </td>
            </tr>
            <tr>
              <th class="border border-gray-400 bg-gray-100 p-2 text-sm">
                지원대상자 /<br />보호자
              </th>
              <td class="border border-gray-400 p-1">
                <input
                  type="text"
                  v-model="form.targetName"
                  class="custom-input"
                />
              </td>
              <th class="border border-gray-400 bg-gray-100 p-2 text-sm">
                상담방법
              </th>
              <td class="border border-gray-400 p-1">
                <input type="text" v-model="form.method" class="custom-input" />
              </td>
              <th class="border border-gray-400 bg-gray-100 p-2 text-sm">
                지원자<br />회원번호
              </th>
              <td class="border border-gray-400 p-1">
                <input
                  type="text"
                  v-model="form.memberId"
                  class="custom-input"
                />
              </td>
              <th class="border border-gray-400 bg-gray-100 p-2 text-sm">
                담 당 자
              </th>
              <td class="border border-gray-400 p-1">
                <input
                  type="text"
                  v-model="form.manager"
                  class="custom-input"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="border-2 border-dark">
        <div
          class="bg-gray-100 p-2 border-b border-gray-400 text-sm font-bold px-3"
        >
          상담기록
        </div>
        <div
          v-for="(section, index) in detailSections"
          :key="index"
          class="border-b border-gray-400 last:border-b-0"
        >
          <div class="p-3 font-bold text-lg bg-white text-blue-800">
            {{ section.title }}
          </div>
          <div class="px-3 pb-3">
            <textarea
              v-model="form.details[section.key]"
              rows="6"
              class="custom-textarea"
              placeholder="내용을 상세히 입력하세요."
            ></textarea>
          </div>
        </div>
      </div>

      <footer class="mt-12 flex flex-row justify-center items-center gap-12">
        <div class="button-wrapper">
          <button @click="goBack" class="btn-round">이전</button>
        </div>
        <div class="button-wrapper">
          <button @click="submitForm" class="btn-round">등록</button>
        </div>
        <div class="button-wrapper">
          <button @click="cancelForm" class="btn-round">취소</button>
        </div>
      </footer>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const form = ref({
  consultDate: "",
  timeRange: "",
  disabilityType: "",
  location: "",
  targetName: "",
  method: "",
  memberId: "",
  manager: "미나리",
  details: {
    basicInfo: "",
    mainContent: "",
    serviceNeed: "",
    finalOpinion: "",
  },
});

const detailSections = [
  { title: "1. 기본 정보", key: "basicInfo" },
  { title: "2. 주요 상담 내용", key: "mainContent" },
  { title: "3. 서비스 욕구 및 지원 필요성", key: "serviceNeed" },
  { title: "4. 담당자 종합 의견", key: "finalOpinion" },
];

const goBack = () => router.go(-1);
const submitForm = () => {
  if (!form.value.consultDate || !form.value.targetName)
    return alert("필수 정보를 입력해주세요.");
  alert("정상적으로 등록되었습니다.");
  router.push({ name: "managerMain" });
};
const cancelForm = () => {
  if (confirm("작성 중인 내용이 사라집니다. 취소하시겠습니까?")) router.go(-1);
};
</script>

<style scoped>
/* 입력 필드 공통 */
.custom-input {
  width: 100%;
  border: 1px solid #ced4da;
  padding: 8px;
  font-size: 0.9rem;
  outline: none;
  border-radius: 2px;
  transition: all 0.2s;
}

.custom-input:focus,
.custom-textarea:focus {
  border-color: #5a8a65;
  background-color: #f8faf8;
  box-shadow: 0 0 0 2px rgba(90, 138, 101, 0.1);
}

.custom-textarea {
  width: 100%;
  border: 1px solid #ced4da;
  padding: 12px;
  font-size: 1rem; /* 텍스트 영역 글씨 크기 살짝 키움 */
  outline: none;
  resize: none;
  border-radius: 4px;
  transition: all 0.2s;
}

/* 버튼 관련 스타일 */
.button-wrapper {
  position: relative;
  display: inline-block;
}
.btn-round {
  background-color: #5a8a65;
  color: white;
  padding: 10px 50px;
  border-radius: 50px;
  font-weight: bold;
  font-size: 1.1rem;
  border: none;
  cursor: pointer;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  transition: all 0.2s;
}

.btn-round:hover {
  background-color: #4a7253;
  transform: translateY(-1px);
}

/* 버튼 중앙 정렬을 위한 래퍼 */
.button-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 표 스타일 강조 */
.border-2 {
  border-width: 2px !important;
}
.border-dark {
  border-color: #333 !important;
}

/* 유틸리티 */
.text-lg {
  font-size: 1.2rem !important;
}

/* [추가/수정됨] 보내주신 이미지 스타일 전용 CSS */
.button-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 이미지 배지 디테일 수정 (빨간색 번호표) */
.image-badge {
  position: absolute;
  /* 버튼 왼쪽 상단 모서리 외부에 위치하도록 조정 */
  left: -5px;
  top: -10px;
  background-color: #ff0000; /* 완전한 빨간색 */
  color: #ffffff;
  width: 26px; /* 이미지 크기와 비슷하게 확대 */
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px; /* 이미지 속 번호 크기 */
  font-weight: 900; /* 아주 굵게 */
  border-radius: 2px; /* 살짝 둥근 사각형 */
  z-index: 10;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3); /* 이미지의 엠보싱 느낌 살짝 추가 */
}

/* 이미지 속 버튼 스타일 구현 */
.btn-image-style {
  background-color: #4a7253; /* 이미지 속 짙은 초록색 */
  color: #ffffff;
  padding: 10px 45px; /* 이미지 비율 맞춤 */
  border-radius: 50px; /* 완전 라운드 */
  font-weight: bold;
  font-size: 1.15rem; /* 이미지 속 글씨 크기 */
  border: none;
  cursor: pointer;
  white-space: nowrap;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15); /* 하단 그림자 */
  transition: all 0.15s;
}

.btn-image-style:hover {
  background-color: #3f6046; /* 살짝 더 어두운 호버색 */
  transform: translateY(-1px);
}
</style>
