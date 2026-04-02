<script setup>
import ArgonButton from "@/components/ArgonButton.vue";

defineProps({
  info: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["info", "edit", "institution-info", "institution-edit"]);
</script>

<template>
  <div class="general-card card h-100 rounded-0 shadow-none border-0">
    <div class="card-header border-bottom bg-white">
      <h5 class="mb-1 fw-bold">기관 관리자</h5>
      <p class="mb-0 text-sm text-secondary">관리자 기본 정보 / 기관 정보</p>
    </div>

    <div class="card-body p-0 d-flex flex-column">
      <div class="info-row">
        <div class="label">아이디</div>
        <div class="value">{{ info.userId || "-" }}</div>
      </div>

      <div class="info-row">
        <div class="label">연락처</div>
        <div class="value">{{ info.tel || "-" }}</div>
      </div>

      <div class="info-row">
        <div class="label">기관명</div>
        <div class="value text-break">{{ info.institution || "-" }}</div>
      </div>

      <div class="mt-auto p-3 d-grid gap-2">
        <ArgonButton color="info" class="mb-0" @click="emit('info')">
          내 정보 보기
        </ArgonButton>

        <ArgonButton color="secondary" class="mb-0" @click="emit('edit')">
          내 정보 수정
        </ArgonButton>

        <ArgonButton color="success" class="mb-0" @click="emit('institution-info')">
          기관 정보 보기
        </ArgonButton>

        <ArgonButton color="warning" class="mb-0" @click="emit('institution-edit')">
          기관 정보 수정
        </ArgonButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.general-card {
  min-height: 640px;
  border-right: 1px solid #dcdfe6 !important;
}

.info-row {
  padding: 18px 16px;
  border-bottom: 1px solid #e9ecef;
}

.label {
  font-size: 13px;
  color: #6c757d;
  margin-bottom: 6px;
}

.value {
  font-size: 15px;
  font-weight: 600;
  color: #344767;
}

@media (max-width: 991px) {
  .general-card {
    min-height: auto;
    border-right: none !important;
    border-bottom: 1px solid #dcdfe6 !important;
  }
}
</style>