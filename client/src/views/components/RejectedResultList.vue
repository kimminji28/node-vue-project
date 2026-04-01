<!-- D:\node-vue-project\client\src\views\components\RejectedResultList.vue -->
<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import GeneralResultCardList from "@/views/components/GeneralResultCardList.vue";
import { Modal } from "bootstrap";

const route = useRoute();

const resultList = ref([]);
const searchFilters = ref({
  managerName: "",
  guardianName: "",
  supportName: "",
});
let searchModalInstance = null;

// 현재 접속 경로를 통해 권한(role) 파악
const userRole = computed(() => {
  return route.path.includes("/manager/") ? "manager" : "general";
});

// 타이틀 동적 변경
const pageTitle = computed(() => {
  return userRole.value === "manager"
    ? "반려된 지원결과서 내역"
    : "기관 내 반려된 결과서 관리";
});

// 1. 반려 목록 불러오기 API 호출
const fetchRejectedResults = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/result/plan/rejected-list",
      {
        params: {
          page: 1,
          limit: 10,
          role: userRole.value,
          ...searchFilters.value,
        },
      },
    );
    resultList.value = response.data.data ? response.data.data : response.data;
  } catch (error) {
    console.error("반려 목록 로딩 실패:", error);
  }
};

// 검색 로직
const showSearchModal = () => {
  if (searchModalInstance) searchModalInstance.show();
};
const applySearch = () => {
  fetchRejectedResults();
  if (searchModalInstance) searchModalInstance.hide();
};
const resetSearch = () => {
  searchFilters.value = { managerName: "", guardianName: "", supportName: "" };
  fetchRejectedResults();
  if (searchModalInstance) searchModalInstance.hide();
};

onMounted(() => {
  fetchRejectedResults();
  const searchEl = document.getElementById("searchModal");
  if (searchEl) searchModalInstance = new Modal(searchEl);
});
</script>

<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-12">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h5 class="mb-0 text-danger">{{ pageTitle }}</h5>
          <button
            class="btn btn-outline-primary btn-sm mb-0"
            @click="showSearchModal"
          >
            <i class="fas fa-search me-2"></i>상세 검색
          </button>
        </div>

        <GeneralResultCardList :resultList="resultList" />
      </div>
    </div>
  </div>

  <div class="modal fade" id="searchModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered border-radius-xl">
      <div class="modal-content">
        <div class="modal-header border-bottom-0 pb-0">
          <h5 class="modal-title font-weight-bolder">반려 내역 상세 검색</h5>
          <button
            type="button"
            class="btn-close text-dark"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label class="form-label text-sm">담당자 이름</label
            ><input
              type="text"
              class="form-control"
              v-model="searchFilters.managerName"
            />
          </div>
          <div class="mb-3">
            <label class="form-label text-sm">보호자 이름</label
            ><input
              type="text"
              class="form-control"
              v-model="searchFilters.guardianName"
            />
          </div>
          <div class="mb-3">
            <label class="form-label text-sm">지원대상자 이름</label
            ><input
              type="text"
              class="form-control"
              v-model="searchFilters.supportName"
            />
          </div>
        </div>
        <div class="modal-footer border-top-0 pt-0">
          <button
            type="button"
            class="btn btn-link text-secondary mb-0"
            @click="resetSearch"
          >
            초기화
          </button>
          <button
            type="button"
            class="btn btn-primary mb-0"
            @click="applySearch"
          >
            검색 실행
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
