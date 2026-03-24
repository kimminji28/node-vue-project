<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import AuthorsTable from "./components/AuthorsMainTableTest.vue";

const listData = ref([]);

onMounted(async () => {
  try {
    // 기관 관리자 API 찌르기 (가짜 소속 기관 코드: INST0000)
    const response = await axios.get(
      "http://localhost:3000/main/general/INST0000",
    );
    listData.value = Array.isArray(response.data)
      ? response.data
      : [response.data];
  } catch (error) {
    console.error("기관 관리자 데이터 통신 에러:", error);
  }
});
</script>

<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <authors-table :surveyList="listData" userRole="ADMIN" />
      </div>
    </div>
  </div>
</template>
