<script setup>
import { reactive, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const MAX_TOTAL_FILE_SIZE = 50 * 1024 * 1024;

const planId = ref(route.query.id || "");

// 지원계획서 수정 정보
const planInfo = reactive({
  supportPlan_id: "",
  I_UserId: "",
  writer: "",
  J_ID: "",
  startDate: "",
  endDate: "",
  purpose: "",
  content: "",
  file1: null,
  file2: null,
  oldFile1: "",
  oldFile2: "",
});

// 상단 선택된 조사지 정보 표시용
const surveyInfo = reactive({
  supportName: "",
  generalName: "",
  waitingType: "",
  gender: "",
  birth: "",
  disabilityType: "",
});

// 모달 열림 여부
const surveyModalOpen = ref(false);
const surveyList = ref([]);

// 모달 열기
const openSurveyModal = async () => {
  surveyModalOpen.value = true;
  await loadSurveyList();
};

// 모달 닫기
const closeSurveyModal = () => {
  surveyModalOpen.value = false;
};

// 날짜 포맷
const formatDate = (dateStr) => {
  if (!dateStr) return "";

  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;

  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");

  return `${yyyy}. ${mm}. ${dd}.`;
};

// code -> 성별 변환
const convertGender = (code) => {
  if (code === "c001") return "남";
  if (code === "c002") return "여";
  return code || "";
};

// code -> 우선순위
const convertResult = (code) => {
  switch (code) {
    case "f001":
      return "계획";
    case "f002":
      return "중점";
    case "f003":
      return "긴급";
    case "f004":
      return "심사중";
    case "f005":
      return "반려";
    default:
      return "미정";
  }
};

// 화면 표시용 파일명
const getDisplayFileName = (fileName) => {
  if (!fileName) return "";
  return fileName.replace(/^\d+_/, "");
};

// 조사지 목록 불러오기
const loadSurveyList = async () => {
  try {
    const list = await fetch(`/api/manager/plan/getSurvey`, {
      method: "GET",
      credentials: "include",
    })
      .then((resp) => resp.json())
      .catch((err) => {
        console.log(err);
        return null;
      });

    if (list && list.status === "Success") {
      surveyList.value = list.data || [];
    } else {
      alert(list?.message || "조사지 목록 조회 실패");
      surveyList.value = [];
    }
  } catch (err) {
    console.log(err);
    alert("조사지 목록 조회 중 오류가 발생했습니다.");
    surveyList.value = [];
  }
};

// 모달에서 조사지 선택
const selectSurvey = (item) => {
  planInfo.J_ID = item.J_ID || "";

  surveyInfo.supportName = item.support_name || "";
  surveyInfo.generalName = item.general_name || "";
  surveyInfo.waitingType = convertResult(item.result) || "";
  surveyInfo.gender = convertGender(item.support_gender) || "";
  surveyInfo.birth = formatDate(item.support_born);
  surveyInfo.disabilityType = item.disname || "";

  closeSurveyModal();
};

// 기존 상세 조회
const loadPlanDetail = async () => {
  try {
    if (!planId.value) {
      alert("잘못된 접근입니다.");
      router.push("/manager/planlist");
      return;
    }

    const result = await fetch(`/api/manager/plan/detail/${planId.value}`, {
      method: "GET",
      credentials: "include",
    }).then((res) => res.json());

    if (result.status === "Success") {
      const item = result.data || {};

      planInfo.supportPlan_id = item.supportPlan_id || "";
      planInfo.I_UserId = item.I_UserId || "";
      planInfo.writer = item.writer_name || item.writer || "";
      planInfo.J_ID = item.J_ID || "";
      planInfo.startDate = item.support_startDate
        ? String(item.support_startDate).slice(0, 10)
        : "";
      planInfo.endDate = item.supprot_endDate
        ? String(item.supprot_endDate).slice(0, 10)
        : "";
      planInfo.purpose = item.purpose || "";
      planInfo.content = item.content || "";
      planInfo.oldFile1 = item.file || "";
      planInfo.oldFile2 = item.file2 || "";

      surveyInfo.supportName = item.support_name || "";
      surveyInfo.generalName = item.guardian_name || item.general_name || "";
      surveyInfo.waitingType = convertResult(item.result) || "";
      surveyInfo.gender = convertGender(item.support_gender) || "";
      surveyInfo.birth = formatDate(item.support_born);
      surveyInfo.disabilityType = item.disname || "";
    } else {
      alert(result.message || "상세 조회 실패");
      router.push("/manager/planlist");
    }
  } catch (err) {
    console.log("지원계획서 상세 조회 오류", err);
    alert("상세 조회 중 오류가 발생했습니다.");
    router.push("/manager/planlist");
  }
};

// 수정 버튼
const updatePlan = async () => {
  try {
    if (!planInfo.J_ID) {
      alert("조사지를 먼저 선택하세요.");
      return;
    }

    if (!planInfo.startDate) {
      alert("지원 시작일을 입력하세요.");
      return;
    }

    if (!planInfo.endDate) {
      alert("지원 종료일을 입력하세요.");
      return;
    }

    if (!planInfo.purpose) {
      alert("지원 목적을 입력하세요.");
      return;
    }

    if (!planInfo.content) {
      alert("지원 내용을 입력하세요.");
      return;
    }

    const totalFileSize =
      (planInfo.file1 ? planInfo.file1.size : 0) +
      (planInfo.file2 ? planInfo.file2.size : 0);

    if (totalFileSize > MAX_TOTAL_FILE_SIZE) {
      alert("첨부파일 총 용량은 50MB를 초과할 수 없습니다.");
      return;
    }

    const formData = new FormData();
    formData.append("supportPlan_id", planInfo.supportPlan_id);
    formData.append("writer", planInfo.writer);
    formData.append("I_UserId", planInfo.I_UserId);
    formData.append("J_ID", planInfo.J_ID);
    formData.append("startDate", planInfo.startDate);
    formData.append("endDate", planInfo.endDate);
    formData.append("purpose", planInfo.purpose);
    formData.append("content", planInfo.content);
    formData.append("oldFile1", planInfo.oldFile1);
    formData.append("oldFile2", planInfo.oldFile2);

    if (planInfo.file1) formData.append("file1", planInfo.file1);
    if (planInfo.file2) formData.append("file2", planInfo.file2);

    const response = await fetch(`/api/manager/plan/update/${planInfo.supportPlan_id}`, {
      method: "PUT",
      body: formData,
      credentials: "include",
    });

    const result = await response.json();

    if (result.status === "Success") {
      alert("지원계획서가 수정되었습니다.");
      router.push("/manager/planlist");
    } else {
      alert(result.message || "수정 실패");
    }
  } catch (err) {
    console.log("지원계획서 수정 오류", err);
    alert("수정 중 오류가 발생했습니다.");
  }
};

// 세션 확인 + 상세 조회
onMounted(async () => {
  try {
    const response = await fetch("/api/user/isession-check", {
      credentials: "include",
    });

    const result = await response.json();

    if (result.isLogin) {
      planInfo.I_UserId = result.user.I_UserId;
      if (!planInfo.writer) {
        planInfo.writer = result.user.name;
      }
    }
  } catch (err) {
    console.log("세션 확인 오류", err);
  }

  await loadPlanDetail();
});

// 파일 선택 처리
const handleFileChange = (e, target) => {
  const file = e.target.files[0] || null;

  if (target === "file1") {
    planInfo.file1 = file;
  } else if (target === "file2") {
    planInfo.file2 = file;
  }

  const totalFileSize =
    (planInfo.file1 ? planInfo.file1.size : 0) +
    (planInfo.file2 ? planInfo.file2.size : 0);

  if (totalFileSize > MAX_TOTAL_FILE_SIZE) {
    alert("첨부파일 총 용량은 50MB를 초과할 수 없습니다.");

    if (target === "file1") {
      planInfo.file1 = null;
    } else if (target === "file2") {
      planInfo.file2 = null;
    }

    e.target.value = "";
  }
};
</script>

<template>
  <div class="card shadow-lg border-0">
    <div class="card-header pb-0">
      <div class="d-flex justify-content-between align-items-center flex-wrap">
        <div>
          <h4 class="mb-1">지원계획서 수정</h4>
          <p class="text-sm mb-0 text-secondary">
            기존 지원계획 내용을 수정합니다.
          </p>
        </div>
      </div>
    </div>

    <div class="card-body">
      <!-- 조사지 선택 영역 -->
      <div class="mb-4">
        <div class="d-flex align-items-start gap-3 flex-wrap">
          <button
            type="button"
            class="btn bg-gradient-primary mb-0"
            @click="openSurveyModal()"
          >
            조사지 목록 불러오기
          </button>

          <div class="survey-info-box flex-grow-1">
            <div class="row mb-2">
              <div class="col-md-4">
                <span class="label-text">지원자</span>
                <strong class="value-text">{{ surveyInfo.supportName }}</strong>
              </div>

              <div class="col-md-4">
                <span class="label-text">보호자</span>
                <strong class="value-text">{{ surveyInfo.generalName }}</strong>
              </div>

              <div class="col-md-4">
                <span class="label-text">대기단계</span>
                <strong class="value-text">{{ surveyInfo.waitingType }}</strong>
              </div>
            </div>

            <div class="row">
              <div class="col-md-4">
                <span class="label-text">성별</span>
                <strong class="value-text">{{ surveyInfo.gender }}</strong>
              </div>

              <div class="col-md-4">
                <span class="label-text">생일</span>
                <strong class="value-text">{{ surveyInfo.birth }}</strong>
              </div>

              <div class="col-md-4">
                <span class="label-text">장애유형</span>
                <strong class="value-text">{{ surveyInfo.disabilityType }}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 기본 정보 -->
      <div class="mb-4">
        <h6 class="mb-3">기본 정보</h6>
        <div class="mb-3">
          <label class="form-control-label mb-2">작성자</label>
          <input type="text" class="form-control" :value="planInfo.writer" readonly />
        </div>
      </div>

      <!-- 지원 기간 -->
      <div class="mb-4">
        <h6 class="mb-3">지원 기간</h6>
        <div class="row">
          <div class="col-md-6 mb-3">
            <label class="form-control-label mb-2">지원 시작일</label>
            <input type="date" class="form-control" v-model="planInfo.startDate" />
          </div>

          <div class="col-md-6 mb-3">
            <label class="form-control-label mb-2">지원 종료일</label>
            <input type="date" class="form-control" v-model="planInfo.endDate" />
          </div>
        </div>
      </div>

      <!-- 지원 목적 -->
      <div class="mb-4">
        <label class="form-control-label mb-2">지원 목적</label>
        <input
          type="text"
          class="form-control"
          v-model="planInfo.purpose"
          placeholder="지원 목적을 입력하세요"
        />
      </div>

      <!-- 지원 내용 -->
      <div class="mb-4">
        <label class="form-control-label mb-2">지원 내용</label>
        <textarea
          rows="10"
          class="form-control"
          v-model="planInfo.content"
          placeholder="지원 계획 내용을 입력하세요"
        ></textarea>
      </div>

      <!-- 첨부 파일 -->
      <div class="mb-4">
        <h6 class="mb-3">첨부 파일</h6>

        <div class="mb-3">
          <div class="small text-muted">
            현재 파일 1 :
            <span class="fw-bold text-dark">
              {{ getDisplayFileName(planInfo.oldFile1) || "없음" }}
            </span>
          </div>
          <div class="small text-muted mt-1">
            현재 파일 2 :
            <span class="fw-bold text-dark">
              {{ getDisplayFileName(planInfo.oldFile2) || "없음" }}
            </span>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6 mb-3">
            <label class="form-control-label mb-2">파일 1</label>
            <input
              type="file"
              class="form-control"
              @change="handleFileChange($event, 'file1')"
            />
          </div>

          <div class="col-md-6 mb-3">
            <label class="form-control-label mb-2">파일 2</label>
            <input
              type="file"
              class="form-control"
              @change="handleFileChange($event, 'file2')"
            />
          </div>
        </div>
      </div>

      <div class="d-flex justify-content-end mt-4 gap-2">
        <button
          type="button"
          class="btn btn-outline-secondary mb-0"
          @click="router.push('/manager/planlist')"
        >
          취소
        </button>

        <button type="button" class="btn bg-gradient-dark mb-0" @click="updatePlan">
          수정
        </button>
      </div>
    </div>
  </div>

  <!-- 조사지 목록 모달 -->
  <div v-if="surveyModalOpen" class="custom-modal-backdrop" @click="closeSurveyModal">
    <div class="custom-modal-box" @click.stop>
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h5 class="mb-0">조사지 목록</h5>
        <button
          type="button"
          class="btn btn-sm btn-outline-secondary mb-0"
          @click="closeSurveyModal"
        >
          닫기
        </button>
      </div>

      <div class="table-responsive">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                조사지작성(수정)일자
              </th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                지원자
              </th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                보호자
              </th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                성별
              </th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                생년월일
              </th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                장애유형
              </th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-center">
                선택
              </th>
            </tr>
          </thead>

          <tbody>
            <tr v-if="surveyList.length === 0">
              <td colspan="7" class="text-center text-secondary py-4">
                조회된 조사지가 없습니다.
              </td>
            </tr>

            <tr v-for="item in surveyList" :key="item.J_ID">
              <td>{{ formatDate(item.survey_write_date) }}</td>
              <td>{{ item.support_name }}</td>
              <td>{{ item.general_name }}</td>
              <td>{{ convertGender(item.support_gender) }}</td>
              <td>{{ formatDate(item.support_born) }}</td>
              <td>{{ item.disname }}</td>
              <td class="text-center">
                <button
                  type="button"
                  class="btn btn-sm bg-gradient-primary mb-0"
                  @click="selectSurvey(item)"
                >
                  선택
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style>
.custom-modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  background-color: rgba(0, 0, 0, 0.45);

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 9999;
}

.custom-modal-box {
  width: 90%;
  max-width: 1000px;
  max-height: 80vh;
  overflow-y: auto;

  background: #ffffff;
  border-radius: 16px;
  padding: 24px;

  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
}

.survey-info-box {
  min-height: 90px;
  border: 1px solid #8c8c8c;
  border-radius: 16px;
  background-color: #f8f9fa;
  padding: 16px 20px;
}

.label-text {
  display: block;
  font-size: 12px;
  color: #6c757d;
  margin-bottom: 2px;
}

.value-text {
  font-size: 15px;
  font-weight: 600;
  color: #212529;
}
</style>