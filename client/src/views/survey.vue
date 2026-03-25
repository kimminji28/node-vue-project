<template>
  <div>
    <surveyTop />
  </div>
  <div class="py-4 container-fluid">
    <sidebar />
    <div class="row">
      <div class="col-12">
        <surveyCard @submit-survey="surveyInfo" />
        <!-- 자식 컴포넌트에서 surveyInfo 함수 가져와서 데이터 받음 -->
        <surveyAnswer />
      </div>
    </div>
  </div>
</template>

<script setup>
import surveyCard from "./components/surveyCard.vue"; //조사지 카드 컴포넌트 가져옴
import Sidebar from "../examples/Sidenav/SidenavList.vue"; //사이드바 컴포넌트 가져옴
import surveyTop from "../examples/Navbars/surveyTop.vue";
import { ref, reactive } from "vue";
import { useRouter } from "vue-router"; //페이지 이동(라우팅) 위해 사용
const router = useRouter(); //router 인스턴스 생성

////조사지 등록 함수
const info = reactive({
  //서버로 보낼 설문 데이터 객체
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
//디비에 등록하려고 하는 데이터가 출력이 되었는지 묻는 코드고, 기본값은 출력안됐는 의미

//자식 컴포넌트(surveyCard)가 보낸 데이터를 받기 위해 payload 파라미터 추가
const surveyInfo = async (payload) => {
  console.log("자식으로부터 받은 데이터:", payload);
  // 0. 전달받은 데이터를 전송 객체에 할당
  info.result = payload.extraInputs.result; // 우선순위 저장 (조사지 첫 등록건이라 우선순위 없음)
  info.reason = payload.extraInputs.reason; //반려사유 저장 (조사지 첫 등록건이라 반려사유 없음)
  info.created_at = new Date(); //현재 시간 저장

  let data = {
    //서버로 보낼 최종 데이터 객체 생성 => reactive에서 값 꺼내서 새 객체로 구성
    J_ID: info.J_ID,
    Ver_Id: info.Ver_Id,
    G_UserId: info.G_UserId,
    support_id: info.support_id,
    result: info.result,
    reason: info.reason,
    created_at: info.created_at,
    updated_at: info.updated_at,
  };

  data.answers = payload.answers; //surveyCard에 있는 answers 코드 안에 있는 예/아니오 데이터 가져옴

  try {
    let response = await fetch(`http://localhost:3000/survey/user`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    let result = await response.json();
    console.log(result);

    if (result && result.status == "success") {
      //👉 서버가 성공 응답했는지 체크
      alert("정상적으로 등록되었습니다.");
      router.push({ name: "userMain", params: { no: result.J_ID } });
      //여기서 등록 버튼을 클릭했을때 정상적으로 데이터가 넘어가면 일반이용자 조사지 메인페이지로 넘어감
      console.log(`등록되었습니다. 조사지번호 : ${result.J_ID}`);
    } else {
      isPrinted.value = true; //👉 실패 상태 ON
      alert("등록에 실패했습니다.");
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
