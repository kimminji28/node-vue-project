<template>
  <surveyTop />
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <!-- allSections를 props로 넘김 -->
        <SelectCard :sections="allSections" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import SelectCard from "./components/surveySelectCard.vue";
import surveyTop from "./components/surveyHeader.vue";

//조사지 조회 함수
const allSections = ref([]); // 문항 데이터
const answers = ref([]); // 선택된 답변
const extraInputs = ref({}); // 추가 입력
const extraRequest = ref(""); // 추가 요청사항

onMounted(async () => {
  try {
    const Ver_Id = "FORM0004"; // 조회할 설문지 ID 정의

    const response = await fetch(`/api/survey/getQuestionsByJID/${Ver_Id}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    //결과가 ok 아니면 무조건 에러 발생시킴

    const rawQuestions = await response.json();
    console.log("DB에서 내려온 데이터:", rawQuestions);
    const sectionsMap = {};

    rawQuestions.forEach((q) => {
      const sectionKey = q.titleCode;

      if (!sectionsMap[sectionKey]) {
        sectionsMap[sectionKey] = {
          title: q.titleCode,
          questions: [],
        };
      }

      sectionsMap[sectionKey].questions.push({
        text: q.question_text,
        question_id: q.question_id,
        hasExtraInput: q.answer_type === "e001",
      });
    });

    allSections.value = Object.values(sectionsMap).map((s) => ({
      ...s,
      subs: s.subs.map((sub) => ({
        ...sub,
        questions: [...sub.questions],
      })),
    }));

    console.log("뷰용 구조:", [allSections.value]);

    //새로 불러온 문항에 맞춰 이전 입력값 모두 초기화
    answers.value = [];
    extraInputs.value = {};
    extraRequest.value = "";
  } catch (err) {
    console.error("조사지 데이터 불러오기 실패:", err);
  }
});
</script>
