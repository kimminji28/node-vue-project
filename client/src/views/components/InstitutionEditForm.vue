<script setup>
import { reactive, watch } from "vue";
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonButton from "@/components/ArgonButton.vue";

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["save", "cancel", "home"]);

const form = reactive({
  institution_id: "",
  institution_name: "",
  institution_tel: "",
  institution_zipCode: "",
  institution_address: "",
  institution_email: "",
  state: "",
  join_date: "",
});

watch(
  () => props.data,
  (newVal) => {
    form.institution_id = newVal?.institution_id || "";
    form.institution_name = newVal?.institution_name || "";
    form.institution_tel = newVal?.institution_tel || "";
    form.institution_zipCode = newVal?.institution_zipCode || "";
    form.institution_address = newVal?.institution_address || "";
    form.institution_email = newVal?.institution_email || "";
    form.state = newVal?.state || "";
    form.join_date = newVal?.join_date || "";
  },
  { immediate: true, deep: true }
);

const onSave = () => {
  emit("save", {
    institution_id: form.institution_id,
    institution_name: form.institution_name,
    institution_tel: form.institution_tel,
    institution_zipCode: form.institution_zipCode,
    institution_address: form.institution_address,
    institution_email: form.institution_email,
  });
};

const getStateText = (state) => {
  if (state === "b001") return "운영중";
  if (state === "b002") return "중지";
  return state || "-";
};

const formatDate = (dateStr) => {
  if (!dateStr) return "-";
  return String(dateStr).slice(0, 10);
};
</script>

<template>
  <div class="section-card card h-100 rounded-0 shadow-none border-0">
    <div class="card-header border-bottom bg-white">
      <div class="mb-2">
        <ArgonButton color="light" class="mb-0" @click="emit('home')">
          ← 돌아가기
        </ArgonButton>
      </div>
      <h4 class="mb-0 fw-bold">기관 정보 수정</h4>
    </div>

    <div class="card-body">
      <div class="row">
        <div class="col-12 mb-3">
          <label class="form-control-label">기관 ID</label>
          <div class="readonly-box">{{ form.institution_id || "-" }}</div>
        </div>

        <div class="col-12 mb-3">
          <label class="form-control-label">기관명</label>
          <ArgonInput type="text" v-model="form.institution_name" />
        </div>

        <div class="col-12 mb-3">
          <label class="form-control-label">기관 연락처</label>
          <ArgonInput type="text" v-model="form.institution_tel" />
        </div>

        <div class="col-12 mb-3">
          <label class="form-control-label">기관 이메일</label>
          <ArgonInput type="text" v-model="form.institution_email" />
        </div>

        <div class="col-12 mb-3">
          <label class="form-control-label">우편번호</label>
          <ArgonInput type="text" v-model="form.institution_zipCode" />
        </div>

        <div class="col-12 mb-3">
          <label class="form-control-label">주소</label>
          <ArgonInput type="text" v-model="form.institution_address" />
        </div>

        <div class="col-12 mb-3">
          <label class="form-control-label">상태</label>
          <div class="readonly-box">{{ getStateText(form.state) }}</div>
        </div>

        <div class="col-12 mb-3">
          <label class="form-control-label">가입일</label>
          <div class="readonly-box">{{ formatDate(form.join_date) }}</div>
        </div>

        <div class="col-md-6 mt-4">
          <ArgonButton color="success" class="w-100 mb-0" @click="onSave">
            저장
          </ArgonButton>
        </div>

        <div class="col-md-6 mt-4">
          <ArgonButton color="secondary" class="w-100 mb-0" @click="emit('cancel')">
            취소
          </ArgonButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.section-card {
  min-height: 640px;
}

.readonly-box {
  width: 100%;
  min-height: 42px;
  padding: 0.75rem 0.875rem;
  border: 1px solid #d2d6da;
  border-radius: 0.5rem;
  background-color: #f8f9fa;
  color: #344767;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  line-height: 1.4;
  word-break: break-all;
}

@media (max-width: 991px) {
  .section-card {
    min-height: auto;
  }
}
</style>
