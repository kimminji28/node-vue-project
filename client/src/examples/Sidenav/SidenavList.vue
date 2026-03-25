<!-- <김민지, 전체 코드 간략하게 수정중 26.03.25>  -->
<script setup>
import { computed, ref } from "vue"; //계산된 값과 변수를 반응형으로 만듦
// import {onMounted} from "vue"; //지원대상자 이름 가지고오는 함수 시도중
import { useRoute } from "vue-router"; //현재 URL 정보를 가져옴
const route = useRoute();

// 현재 경로가 설문 추가 페이지인지 확인 (라우트 이름 또는 경로 포함 여부 체크)
const isSurveyPage = computed(() => {
  return route.name === "userSurveyAdd" || route.path.includes("userSurveyAdd");
});
//route.name === "userSurveyAdd" 라우트 이름
//route.path.includes("userSurveyAdd") = URL에 해당 문자열 포함되어 있는지 확인
//includes : 문자열 안에 특정 글자가 포함되어 있는지 확인하는 함수
// || : 둘 중 하나라도 맞으면 true
//이 함수 없으면 템플릿에서 사용한 변수가 사라지는거라 렌더딩안됨

// 인풋 데이터 정의
const applicantName = ref("");
const largeCategory = ref("");
const mediumCategory = ref("");
const smallCategory = ref("");
const gender = ref("");
const birthDate = ref("");

//지원대상자명 선택하는 함수 시도중
// const users = ref([]);

// onMounted(async () => {
//   //페이지 로딩 시 자동 실행
//   const guserId = "GUSR0002"; //지원대상자 이름 실제값 반응형
//   const resp = await axios.get(`/main/support/supList/${guserId.value}`);
//   //axios : 프론트 + 백엔드 연결해주는 durgkf
//   users.value = resp.data;
//   console.log(resp);
// });
</script>

<template>
  <div
    class="collapse navbar-collapse w-auto h-auto h-100"
    id="sidenav-collapse-main"
  >
    <ul class="navbar-nav">
      <template v-if="isSurveyPage">
        <!-- isSurveyPage가 true일 때만 사이드바 내용 보여줌 -->
        <li class="nav-item ps-4 pt-4">
          <h5 class="font-weight-bolder text-dark mb-4">지원자 정보 입력</h5>

          <div class="mb-3 me-3">
            <!-- 이 부분 수정 (디비에서 데이터 가져오면 연동 가능 / 함수 시도중) -->
            <select
              v-model="applicantName"
              class="form-select border custom-input"
            >
              <option value="">선택하세요</option>
              <option v-for="user in users" :key="user.id" :value="user.name">
                {{ user.name }}
              </option>
            </select>
          </div>

          <hr class="horizontal dark mt-4 mb-4 me-3" />

          <div class="mb-3 me-3">
            <label
              class="form-label text-sm font-weight-bold text-secondary mb-2"
              >장애유형</label
            >
            <input
              type="text"
              v-model="largeCategory"
              class="form-control border custom-input mb-2"
              placeholder="대분류 입력"
            />
            <input
              type="text"
              v-model="mediumCategory"
              class="form-control border custom-input mb-2"
              placeholder="중분류 입력"
            />
            <input
              type="text"
              v-model="smallCategory"
              class="form-control border custom-input"
              placeholder="소분류 입력"
            />
          </div>

          <hr class="horizontal dark mt-4 mb-4 me-3" />

          <div class="d-flex mb-3 me-3">
            <div class="w-45 me-3">
              <label class="form-label text-sm font-weight-bold text-secondary"
                >성별</label
              >
              <input
                type="text"
                v-model="gender"
                class="form-control border custom-input text-center"
                placeholder="남/여"
              />
            </div>
            <div class="flex-fill">
              <label class="form-label text-sm font-weight-bold text-secondary"
                >생년월일</label
              >
              <input
                type="text"
                v-model="birthDate"
                class="form-control border custom-input text-center"
                placeholder="YY.MM.DD"
              />
            </div>
          </div>
        </li>
      </template>
    </ul>
  </div>
</template>

<style scoped>
/* 입력창이 확실히 보이도록 하는 스타일 */
.custom-input {
  display: block !important;
  width: 100% !important;
  background-color: #ffffff !important;
  border: 1px solid #d2d6da !important;
  border-radius: 8px !important;
  padding: 0.5rem 0.75rem !important;
  font-size: 0.875rem !important;
}

.custom-input:focus {
  border-color: #5e72e4 !important;
  box-shadow: 0 0 0 2px rgba(94, 114, 228, 0.2) !important;
  outline: none !important;
}

.text-center {
  text-align: center !important;
}

.w-45 {
  width: 45% !important;
}

.horizontal.dark {
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.2),
    rgba(0, 0, 0, 0)
  );
  height: 1px;
  border: 0;
  margin: 1rem 0;
}

/* 스크롤바 설정 */
.navbar-collapse {
  overflow-y: auto !important;
}
</style>
