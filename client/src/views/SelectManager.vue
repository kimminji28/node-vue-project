<template>
  <RoleHeader />
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="row mb-3">
          <div class="col-5">
            <select class="form-select" v-model="mainManager">
              <option value="">담당자 선택(정)</option>
              <option
                v-for="m in managers"
                :key="m.I_UserId"
                :value="m.I_UserId"
              >
                {{ m.name }} ({{ m.I_UserId }})
              </option>
            </select>
          </div>
          <div class="col-5">
            <select class="form-select" v-model="subManager">
              <option value="">담당자 선택(부)</option>
              <option
                v-for="m in managers"
                :key="m.I_UserId"
                :value="m.I_UserId"
              >
                {{ m.name }} ({{ m.I_UserId }})
              </option>
            </select>
          </div>
          <div class="col-2">
            <button class="btn btn-primary" @click="saveAssignment">
              배정 저장
            </button>
          </div>
        </div>
        <SelectCard
          v-if="allSections.length > 0"
          :sections="allSections"
          :answers="answerData"
          :userName="targetUserName"
          :regDate="targetRegDate"
          :extraInputs="extraInputs"
          :extraRequest="extraRequest"
          :managers="managers"
          v-model:selectedManager="selectedManager"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
// import surveyTop from "./components/surveyHeader.vue";
import RoleHeader from "./components/RoleHeader.vue";
import SelectCard from "./components/surveyManagerCard.vue";
import { useRoute } from "vue-router";

const route = useRoute();

const allSections = ref([]);
const answerData = ref([]);
const extraInputs = ref({});
const extraRequest = ref("");
const targetUserName = ref("");
const targetRegDate = ref("");
const managers = ref([]);
const mainManager = ref("");
const subManager = ref("");
const supportId = ref("");

onMounted(async () => {
  try {
    // const J_ID = Object.keys(route.query)[0];
    const J_ID = route.params.id;
    console.log(J_ID);
    // console.log("보내는 J_ID 값:", J_ID);
    const response = await fetch(`http://localhost:3000/survey/user/${J_ID}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const rawQuestions = await response.json();

    if (rawQuestions.length > 0) {
      targetUserName.value = rawQuestions[0].userName || "이름없음";
      targetRegDate.value = rawQuestions[0].created_at || "-";
      supportId.value = rawQuestions[0].support_id;
    }
    const allAnswers = rawQuestions.find((q) => q.answer)?.answer || "";
    const answerArray = allAnswers.split(",").map((a) => a.trim());

    const sectionsMap = {};

    rawQuestions.forEach((item, index) => {
      if (!sectionsMap[item.titleCode]) {
        sectionsMap[item.titleCode] = {
          title: item.titleCode,
          subs: [],
        };
      }

      let sub = sectionsMap[item.titleCode].subs.find(
        (s) => s.subTitle === item.titleCode,
      );

      if (!sub) {
        sub = {
          subTitle: item.titleCode,
          description: "상세 내역 확인",
          questions: [],
          tempAnswerList: [],
        };
        sectionsMap[item.titleCode].subs.push(sub);
      }

      sub.questions.push({
        text: item.question_text,
        question_id: item.question_id,
        hasExtraInput: item.answer_type === "e001",
        answer_type: item.answer_type,
      });

      sub.tempAnswerList.push(answerArray[index] || "");
    });

    const finalSections = Object.values(sectionsMap);
    //객체에서 값만 가지고와서 배열로 만듦
    allSections.value = finalSections;

    answerData.value = finalSections.map((sec) =>
      sec.subs.map((sub) => sub.tempAnswerList),
    );

    const instRes = await fetch(
      `http://localhost:3000/support/institution/${supportId.value}`,
    );

    const instData = await instRes.json();
    const institutionId = instData.institution_id;

    const managerRes = await fetch(
      `http://localhost:3000/user/instiUsers/a003/${institutionId}`,
    );

    if (managerRes.ok) {
      managers.value = await managerRes.json();
      console.log("담당자 목록:", managers.value);
    }
  } catch (err) {
    console.error("조사지 데이터 불러오기 실패:", err);
  }
});

const saveAssignment = async () => {
  if (!mainManager.value || !subManager.value) {
    alert("정/부 담당자를 모두 선택하세요.");
    return;
  }

  if (mainManager.value === subManager.value) {
    alert("정/부 담당자는 다르게 선택하세요.");
    return;
  }

  const payload = {
    support_id: supportId.value,
    I_UserId1: mainManager.value,
    I_UserId2: subManager.value,
  };

  try {
    const response = await fetch("http://localhost:3000/user/assign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.ok) alert("담당자 배정이 완료되었습니다.");
  } catch (err) {
    console.error("저장 실패:", err);
  }
};
</script>
