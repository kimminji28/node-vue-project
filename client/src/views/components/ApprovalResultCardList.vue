<!-- D:\node-vue-project\client\src\views\components\ApprovalResultCardList.vue -->
<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  resultList: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const emit = defineEmits(["onApprove", "onRejectClick"]);

// 🌟 지원결과서 승인(대기) 목록 전용 파일 다운로드 함수
const downloadFile = (fileName) => {
  if (!fileName) return;

  // 🚨 [중요] 아래 URL은 서버(server.js/app.js)의 라우터 매핑 주소에 따라 달라집니다.
  // 예: app.use('/api/approval/result', require('./routes/approval_result_router'));
  // 위처럼 되어 있다면 아래 주소가 맞습니다!

  const url = `/api/approval/result/download/${encodeURIComponent(fileName)}`;

  window.location.href = url;
};
</script>

<template>
  <div class="row">
    <div class="col-12">
      <div
        v-for="(item, index) in props.resultList"
        :key="item.result_report || index"
        class="card mb-4 shadow-sm border-0"
      >
        <div class="card-body p-4">
          <div
            class="d-flex justify-content-between align-items-center mb-3 pb-3 border-bottom flex-wrap"
          >
            <div class="d-flex gap-4">
              <div>
                <span class="text-secondary text-xs">작성일</span
                ><span class="text-dark font-weight-bold ms-2">{{
                  item.created_at
                }}</span>
              </div>
              <div>
                <span class="text-secondary text-xs">담당자</span
                ><span class="text-dark font-weight-bold ms-2">{{
                  item.managerName
                }}</span>
              </div>
              <div>
                <span class="text-secondary text-xs">보호자</span
                ><span class="text-dark font-weight-bold ms-2">{{
                  item.guardianName
                }}</span>
              </div>
              <div>
                <span class="text-secondary text-xs">지원자</span
                ><span class="text-dark font-weight-bold ms-2">{{
                  item.supportName
                }}</span>
              </div>
            </div>
            <div>
              <span class="text-secondary text-xs">장애유형</span>
              <span class="text-dark text-sm ms-2">{{
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

          <div class="p-3 bg-light border-radius-md mb-4">
            <h6 class="text-secondary text-sm mb-2">
              <i class="fas fa-file-alt me-1"></i>지원계획
            </h6>
            <div class="mb-2">
              <span class="text-xs text-secondary">계획 목표:</span>
              <p class="text-sm text-dark mb-0">{{ item.planPurpose }}</p>
            </div>
            <div>
              <span class="text-xs text-secondary">계획 내용:</span>
              <p class="text-sm text-dark mb-0">{{ item.planContent }}</p>
            </div>
          </div>

          <div class="mb-3">
            <h6 class="text-dark text-sm mb-1 text-primary">
              <i class="fas fa-check-circle me-1"></i>지원결과 제목
            </h6>
            <div class="p-3 border border-radius-md text-sm text-dark">
              {{ item.resultTitle || "작성된 제목이 없습니다." }}
            </div>
          </div>
          <div class="mb-3">
            <h6 class="text-dark text-sm mb-1 text-primary">
              <i class="fas fa-check-circle me-1"></i>지원결과 내용
            </h6>
            <div
              class="p-3 border border-radius-md text-sm text-dark"
              style="min-height: 80px"
            >
              {{ item.resultContent || "작성된 내용이 없습니다." }}
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
                v-if="item.file1"
                href="#"
                @click.prevent="downloadFile(item.file1)"
                class="text-primary text-sm me-3"
              >
                {{ item.file1 }}
              </a>

              <a
                v-if="item.file2"
                href="#"
                @click.prevent="downloadFile(item.file2)"
                class="text-primary text-sm"
              >
                {{ item.file2 }}
              </a>

              <span
                v-if="!item.file1 && !item.file2"
                class="text-secondary text-sm"
              >
                첨부파일 없음
              </span>
            </div>

            <div class="d-flex align-items-center gap-2">
              <button
                class="btn btn-primary btn-sm mb-0 px-4"
                @click="emit('onApprove', item.result_report)"
              >
                승인
              </button>
              <button
                class="btn btn-outline-danger btn-sm mb-0 px-4"
                @click="emit('onRejectClick', item.result_report)"
              >
                반려
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="props.resultList.length === 0"
        class="empty-state-card d-flex flex-column justify-content-center align-items-center text-center bg-gray-100 border-radius-lg shadow-sm mb-4"
      >
        <i
          class="fas fa-clipboard-check text-secondary mb-3"
          style="font-size: 4rem"
        ></i>
        <h5 class="text-secondary fw-bold mb-2">
          검토 대기 중인 지원결과서가 없습니다.
        </h5>
        <p class="text-sm text-secondary mb-0">
          모든 지원결과서의 검토가 완료되었거나, 아직 새롭게 제출된 내역이
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
