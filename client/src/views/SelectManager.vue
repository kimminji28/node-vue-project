<template>
  <RoleHeader />
  <div class="py-4 container-fluid" style="position: relative; z-index: 10">
    <div class="row">
      <div class="col-12">
        <div class="row mb-3">
          <div class="col-5">
            <select class="form-select" v-model="mainManager">
              <option value="">담당자 선택(정)</option>
              <option
                v-for="manager in managers"
                :key="manager.I_UserId"
                :value="manager.I_UserId"
              >
                {{ manager.name }} ({{ manager.I_UserId }})
              </option>
            </select>
          </div>
          <div class="col-5">
            <select class="form-select" v-model="subManager">
              <option value="">담당자 선택(부)</option>
              <option
                v-for="manager in managers"
                :key="manager.I_UserId"
                :value="manager.I_UserId"
              >
                {{ manager.name }} ({{ manager.I_UserId }})
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
    const J_ID = route.params.id;
    // URL 에서 J_ID 가져오기

    // 1. 조사지 조회
    const surveyRes = await fetch(`http://localhost:3000/survey/user/${J_ID}`);

    const rawQuestions = await surveyRes.json();
    console.log("rawQuestions[0]:", rawQuestions[0]);

    // 2. 일반 사용자 ID 확보
    const G_USER = route.query.userId || rawQuestions[0]?.G_UserId;

    // 3. support_id + institution_id 조회
    const supportRes = await fetch(
      `http://localhost:3000/user/support/by-jid/${G_USER}`,
    );

    const supportData = await supportRes.json();
    console.log("1. 지원 정보 데이터:", supportData);

    if (!supportData || supportData.length === 0) {
      console.error("지원 정보가 없어 기관 ID를 찾을 수 없습니다.");
      return;
    }

    const institutionId = supportData[0].institution_id;
    console.log("2. 추출된 기관 ID:", institutionId);

    const managerRes = await fetch(
      `http://localhost:3000/user/instiUsers/a003/${institutionId}`,
    );
    const managerData = await managerRes.json();

    console.log("3. 서버에서 받은 담당자 원본:", managerData);

    // 데이터가 배열인지 확인하고 할당
    managers.value = Array.isArray(managerData)
      ? managerData
      : managerData.data || [];
    console.log("4. 최종 할당된 managers:", managers.value);
    // ============================
    // 아래부터는 기존 조사지 UI 구성 로직
    // ============================

    if (rawQuestions.length > 0) {
      targetUserName.value = rawQuestions[0].userName || "이름없음";
      targetRegDate.value = rawQuestions[0].created_at || "-";
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

    allSections.value = finalSections;

    answerData.value = finalSections.map((sec) =>
      sec.subs.map((sub) => sub.tempAnswerList),
    );
  } catch (err) {
    console.error("조사지 데이터 불러오기 실패:", err);
  }
});

const saveAssignment = async () => {
  // 정/부 담당자 둘 다 선택했는지 확인
  if (!mainManager.value || !subManager.value) {
    alert("정/부 담당자를 모두 선택하세요.");
    return;
  }

  // 같은 사람 선택 방지
  if (mainManager.value === subManager.value) {
    alert("정/부 담당자는 다르게 선택하세요.");
    return;
  }

  // 배정 payload
  const payload = {
    support_id: supportId.value,
    I_UserId1: mainManager.value,
    I_UserId2: subManager.value,
  };

  try {
    // 담당자 배정 저장
    const response = await fetch("http://localhost:3000/user/assign", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      alert("담당자 배정이 완료되었습니다.");
    }
  } catch (err) {
    console.error("저장 실패:", err);
  }
};
</script>
