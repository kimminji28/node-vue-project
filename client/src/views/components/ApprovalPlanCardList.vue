<!-- D:\node-vue-project\client\src\views\components\ApprovalPlanCardList.vue -->
<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  planList: {
    type: Array,
    required: true,
    default: () => [],
  },
});

// 🌟 계획서 승인(대기) 목록 전용 파일 다운로드 함수
const downloadFile = (fileName) => {
  if (!fileName) return;

  // 🚨 [중요] 아래 주소는 유저님의 서버 설정에 따라 다를 수 있습니다!
  // 만약 404 에러가 난다면, 백엔드의 라우터 연결 주소를 꼭 확인해 보세요.
  // 예: server.js에서 app.use('/api/general/approval/plan', require('./routes/approval_plan_router')); 로 되어 있다면
  // 아래 url도 `/api/general/approval/plan/download/...` 로 맞춰주셔야 합니다.

  const url = `/api/approval/plan/download/${encodeURIComponent(fileName)}`;

  window.location.href = url;
};

// 💡 부모 컴포넌트로 이벤트(승인, 반려 클릭)를 전달하기 위한 설정
const emit = defineEmits(["onApprove", "onRejectClick"]);
</script>

<template>
  <div class="row">
    <div class="col-12">
      <div
        v-for="(item, index) in props.planList"
        :key="item.supportPlan_id || index"
        class="card mb-4 shadow-sm border-0"
      >
        <div class="card-body p-4">
          <div
            class="d-flex justify-content-between align-items-center mb-3 pb-3 border-bottom"
          >
            <div class="d-flex gap-4">
              <div>
                <span class="text-secondary text-xs">담당자</span>
                <span class="text-dark font-weight-bold ms-1">{{
                  item.managerName
                }}</span>
              </div>
              <div>
                <span class="text-secondary text-xs">보호자</span>
                <span class="text-dark font-weight-bold ms-1">{{
                  item.guardianName
                }}</span>
              </div>
              <div>
                <span class="text-secondary text-xs">지원자</span>
                <span class="text-dark font-weight-bold ms-1">{{
                  item.supportName
                }}</span>
              </div>
            </div>
            <div>
              <span class="text-secondary text-xs">장애유형</span>
              <span class="text-dark text-sm ms-1">{{
                item.disabilityType || "미지정"
              }}</span>
            </div>
          </div>

          <div class="row mb-4">
            <div class="col-md-6">
              <span class="text-secondary text-xs">지원 시작일</span>
              <p class="text-sm font-weight-bold mb-0">
                {{ item.support_startDate }}
              </p>
            </div>
            <div class="col-md-6">
              <span class="text-secondary text-xs">지원 종료일</span>
              <p class="text-sm font-weight-bold mb-0">
                {{ item.supprot_endDate }}
              </p>
            </div>
          </div>

          <div class="mb-3">
            <h6 class="text-dark text-sm mb-1">지원계획 목표</h6>
            <div
              class="p-3 bg-gray-100 border-radius-md text-sm text-secondary"
            >
              {{ item.purpose || "작성된 목표가 없습니다." }}
            </div>
          </div>
          <div class="mb-3">
            <h6 class="text-dark text-sm mb-1">지원계획 내용</h6>
            <div
              class="p-3 bg-gray-100 border-radius-md text-sm text-secondary"
              style="min-height: 80px"
            >
              {{ item.content || "작성된 내용이 없습니다." }}
            </div>
          </div>

          <div
            class="d-flex justify-content-between align-items-end mt-4 pt-3 border-top"
          >
            <div>
              <span class="text-dark text-sm font-weight-bold me-2"
                ><i class="fas fa-paperclip me-1"></i>첨부파일</span
              >

              <a
                v-if="item.file"
                href="#"
                @click.prevent="downloadFile(item.file)"
                class="text-primary text-sm me-3"
              >
                파일 1 다운로드
              </a>

              <a
                v-if="item.file2"
                href="#"
                @click.prevent="downloadFile(item.file2)"
                class="text-primary text-sm"
              >
                파일 2 다운로드
              </a>

              <span
                v-if="!item.file && !item.file2"
                class="text-secondary text-sm"
              >
                첨부파일 없음
              </span>
            </div>

            <div class="d-flex align-items-center gap-2">
              <span class="text-secondary text-xs me-2">작성자</span>
              <span class="badge bg-light text-dark border me-3">{{
                item.managerName
              }}</span>

              <button
                class="btn btn-primary btn-sm mb-0 px-4"
                @click="emit('onApprove', item.supportPlan_id)"
              >
                승인
              </button>

              <button
                class="btn btn-outline-danger btn-sm mb-0 px-4"
                @click="emit('onRejectClick', item.supportPlan_id)"
              >
                반려
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- <div v-if="props.planList.length === 0" class="text-center py-5">
        <p class="text-secondary mb-0">검토 대기 중인 지원계획서가 없습니다.</p>
      </div> -->
      <div
        v-if="props.planList.length === 0"
        class="empty-state-card d-flex flex-column justify-content-center align-items-center text-center bg-gray-100 border-radius-lg shadow-sm mb-4"
      >
        <i
          class="fas fa-clipboard-check text-secondary mb-3"
          style="font-size: 4rem"
        ></i>
        <h5 class="text-secondary fw-bold mb-2">
          검토 대기 중인 지원계획서가 없습니다.
        </h5>
        <p class="text-sm text-secondary mb-0">
          모든 지원계획서의 검토가 완료되었거나, 아직 새롭게 제출된 내역이
          없습니다.
        </p>
      </div>
    </div>
  </div>
</template>
<style scoped>
.empty-state-card {
  min-height: 50vh; /* 화면 높이의 절반 정도를 차지하게 해서 꽉 차 보이게 함 */
  background-color: #f8f9fa; /* 안정감 있는 아주 밝은 회색 */
  border: 2px dashed #dee2e6; /* 은은하고 세련된 점선 테두리 */
}
</style>
