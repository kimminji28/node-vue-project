<script setup>
import SurveyVersionTable from "./components/AdminSurveyList.vue";
import MyPageHeader from "./components/adminPageHeader.vue";
</script>
<template>
  <MyPageHeader />
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <SurveyVersionTable />
      </div>
    </div>
  </div>
</template>
