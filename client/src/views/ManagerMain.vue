<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import AuthorsTable from "./components/AuthorsMainTableTest.vue";

const listData = ref([]);

onMounted(async () => {
  try {
    // 기관 담당자 API 찌르기 (가짜 ID: IUSR0000)
    const response = await axios.get(
      "http://localhost:3000/main/manager/IUSR0000",
    );
    listData.value = Array.isArray(response.data)
      ? response.data
      : [response.data];
  } catch (error) {
    console.error("기관 담당자 데이터 통신 에러:", error);
  }
});
</script>

<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <authors-table :surveyList="listData" userRole="MANAGER" />
      </div>
    </div>
  </div>
</template>
