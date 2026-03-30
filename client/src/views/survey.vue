<template>
  <surveyTop />
  <!-- <div class="py-4 container-fluid"> -->
  <!-- <sidebar /> -->
  <sidebar @select-support="loadSupportDetail" />
  <!-- <sidebar /> -->
  <div class="row">
    <!-- <div class="col-12">
      <surveyCard @submit-survey="surveyInfo" />
      자식 컴포넌트에서 surveyInfo 함수 가져와서 데이터 받음
      !-- <surveyAnswer /> -->
    <!-- </div> -->
    <surveyAnswer />
    <div class="col-12">
      <!-- <SurveyCard
        :selected-support="selectedSupport"
        @submit-survey="surveyInfo"
      /> -->
      <SurveyCard @submit-survey="surveyInfo" />
    </div>
  </div>
  <!-- </div> -->
</template>

<script setup>
import SurveyCard from "./components/surveyCard.vue"; //조사지 카드 컴포넌트 가져옴
import Sidebar from "../examples/Sidenav/SidenavList.vue"; //사이드바 컴포넌트 가져옴
import surveyTop from "./components/surveyHeader.vue";
import { ref, reactive, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router"; //페이지 이동(라우팅) 위해 사용
// import axios from "axios";

const router = useRouter(); //router 인스턴스 생성
const route = useRoute();

const selectedSupport = ref(null);

const loadSupportDetail = async (support_id) => {
  console.log("부모로 들어온 ID:", support_id);

  if (!support_id) {
    selectedSupport.value = null;
    info.support_id = "";
    return;
  }

  // 먼저 즉시 저장
  info.support_id = support_id;
  selectedSupport.value = { support_id };
  try {
    const response = await fetch(
      `http://localhost:3000/survey/support/${support_id}`,
    );
    if (!response.ok) {
      throw new Error(`HTTP 오류: ${response.status}`);
    }

    const data = await response.json();

    if (Array.isArray(data) && data.length > 0) {
      selectedSupport.value = data[0];
      info.support_id = data[0].support_id ?? "";
    } else if (data) {
      selectedSupport.value = data;
      info.support_id = data.support_id ?? "";
    } else {
      selectedSupport.value = null;
    }

    console.log("selectedSupport.value =", selectedSupport.value);
    console.log("info.support_id =", info.support_id);
  } catch (err) {
    console.error("대상자 정보를 불러오는데 실패했습니다.", err);
    selectedSupport.value = null;
  }
};

onMounted(() => {
  info.support_id = route.query.support_id;
});

//조사지 등록 함수
const info = reactive({
  J_ID: "",
  Ver_Id: "",
  G_UserId: "",
  support_id: "",
  result: null,
  reason: null,
  created_at: null,
  updated_at: null,
});

const isPrinted = ref(false);

const surveyInfo = async (payload) => {
  console.log("payload =", payload);
  console.log("selectedSupport.value =", selectedSupport.value);
  console.log("info.support_id =", info.support_id);

  const supportIdFromSelected =
    selectedSupport.value?.support_id ??
    selectedSupport.value?.supportId ??
    selectedSupport.value?.id ??
    null;

  const finalSupportId =
    payload?.support_id ??
    payload?.answers?.[0]?.support_id ??
    supportIdFromSelected ??
    info.support_id ??
    null;

  console.log("supportIdFromSelected =", supportIdFromSelected);
  console.log("finalSupportId =", finalSupportId);

  if (!finalSupportId) {
    alert("지원 대상자를 먼저 선택해주세요.");
    return;
  }

  if (!payload?.answers || payload.answers.length === 0) {
    alert("답변 데이터가 없습니다.");
    return;
  }

  const sendData = {
    ...payload,
    support_id: finalSupportId,
    answers: payload.answers.map((ans) => ({
      ...ans,
      support_id: ans.support_id ?? finalSupportId,
    })),
  };
  console.log("최종 전송 데이터 =", sendData);
  // sendData.answers = payload.answers; //surveyCard에 있는 answers 코드 안에 있는 예/아니오 데이터 가져옴

  try {
    const response = await fetch("http://localhost:3000/survey/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sendData),
    });

    const result = await response.json();
    console.log("서버 응답 =", result);

    if (response.ok && result?.status === "success") {
      alert("정상적으로 등록되었습니다.");
      console.log(`등록되었습니다. 조사지번호 : ${result.J_ID}`);
      router.push({
        name: "userMain",
        params: { no: result.J_ID },
      });
    } else {
      isPrinted.value = true;
      alert(result?.message || "등록에 실패했습니다.");
    }
  } catch (err) {
    console.error("통신 에러:", err);
    alert("서버 연결에 실패했습니다.");
  }
};
//조사지 답변 함수
// const answer = reactive({
//   J_ID: "",
//   Ver_Id: "",
//   G_UserId: "",
//   support_id: "",
//   result: null,
//   reason: null,
//   created_at: null,
//   updated_at: null,
// });

// const sPrinted = ref(false);

// const surveyResponse = async (payload) => {
//   console.log("자식으로부터 받은 데이터:", payload);
// };

// answer.result = JSON.stringify(payload.answer);

// answer.res
</script>
