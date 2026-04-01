<script setup>
import surveyTable from "./components/surveyVersionDetail.vue";
// import MyPageHeader from "./components/adminPageHeader.vue";
import RoleHeader from "./components/RoleHeader.vue";
</script>
<template>
  <RoleHeader />
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12"></div>
      <survey-table />
    </div>
  </div>
</template>
