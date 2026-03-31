<!-- D:\node-vue-project\client\src\views\components\RejectedPlanList.vue -->
<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import GeneralPlanCardList from "@/views/components/GeneralPlanCardList.vue";
import { Modal } from "bootstrap";

const route = useRoute();
// 기관 관리자인지 담당자인지 Role 설정 (라우터 경로 기준)
const currentUserRole = ref(
  route.path.includes("/general") ? "GENERAL" : "MANAGER",
);

const planList = ref([]);
const searchFilters = ref({
  managerName: "",
  guardianName: "",
  supportName: "",
});
let searchModalInstance = null;

// 💡 어제 짠 반려 내역 전용 API 호출!
const fetchRejectedPlans = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/rejected/plan/list",
      {
        params: {
          role: currentUserRole.value,
          page: 1,
          limit: 10,
          ...searchFilters.value,
        },
      },
    );
    planList.value = response.data.data ? response.data.data : response.data;
  } catch (error) {
    console.error("반려내역 로딩 실패:", error);
  }
};

const showSearchModal = () => {
  if (searchModalInstance) searchModalInstance.show();
};
const applySearch = () => {
  fetchRejectedPlans();
  if (searchModalInstance) searchModalInstance.hide();
};
const resetSearch = () => {
  searchFilters.value = { managerName: "", guardianName: "", supportName: "" };
  fetchRejectedPlans();
  if (searchModalInstance) searchModalInstance.hide();
};

onMounted(() => {
  fetchRejectedPlans();
  const modalElement = document.getElementById("searchModal");
  if (modalElement) searchModalInstance = new Modal(modalElement);
});
</script>

<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-12">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h5 class="mb-0">지원계획서 반려 내역 조회</h5>
          <button
            class="btn btn-outline-primary btn-sm mb-0"
            @click="showSearchModal"
          >
            <i class="fas fa-search me-2"></i>상세 검색
          </button>
        </div>

        <GeneralPlanCardList
          :planList="planList"
          :userRole="currentUserRole"
          :isRejectedPage="true"
        />
      </div>
    </div>
  </div>
</template>
