<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";

import AdminHeader from "./adminPageHeader.vue";
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonButton from "@/components/ArgonButton.vue";

const router = useRouter();
const route = useRoute(); // URL 파라미터(id)를 가져오기 위함
const instId = route.params.id; // 예: INST0001

// 주소 관련 상태
const zipCode = ref("");
const mainAddress = ref("");
const detailAddress = ref("");
const detailRef = ref(null);

// 기관 폼 데이터 (state 기본값은 '운영'인 b001)
const instInfo = reactive({
  name: "",
  tel: "",
  email: "",
  state: "b001",
});

// 🌟 1. 데이터 불러오기 (수정 페이지 진입 시)
const fetchDetail = async () => {
  try {
    const res = await axios.get(`/api/admin/institution/${instId}`);
    const data = res.data.data;

    instInfo.name = data.name;
    instInfo.tel = data.tel;
    instInfo.email = data.email;
    instInfo.state = data.state; // b001, b002, b003

    zipCode.value = data.zipCode;

    // 주소 분리 (기본주소와 상세주소를 띄어쓰기 기준으로 대략적으로 분리)
    // 완벽한 분리를 원하시면 DB 저장 시 기호(예: |)로 묶어서 저장하는 방식도 있습니다.
    const addrParts = data.address ? data.address.split(" ") : [];
    if (addrParts.length > 0) {
      // 마지막 부분이 호수/층 이라고 임의 가정
      detailAddress.value = addrParts.pop();
      mainAddress.value = addrParts.join(" ");
    }
  } catch (error) {
    console.error("데이터 불러오기 실패:", error);
    alert("데이터를 불러오지 못했습니다.");
  }
};

// 🌟 2. 다음 우편번호 검색
const openPostcode = () => {
  new window.daum.Postcode({
    oncomplete: (data) => {
      zipCode.value = data.zonecode;
      mainAddress.value = data.roadAddress;
      if (detailRef.value) detailRef.value.$el.querySelector("input").focus();
    },
  }).open();
};

// 🌟 3. 수정 요청 보내기
const updateInstitution = async () => {
  if (!instInfo.name || !zipCode.value)
    return alert("필수 항목을 입력해주세요.");

  const payload = {
    name: instInfo.name,
    zipCode: zipCode.value,
    address: `${mainAddress.value} ${detailAddress.value}`.trim(),
    tel: instInfo.tel,
    email: instInfo.email,
    state: instInfo.state, // 운영(b001), 휴업(b002), 폐업(b003)
  };

  try {
    await axios.put(`/api/admin/institution/${instId}`, payload);
    alert("기관 정보가 수정되었습니다.");
    router.push("/admin"); // 목록으로 돌아가기
  } catch (error) {
    console.error("수정 실패:", error);
    alert("수정에 실패했습니다.");
  }
};

onMounted(() => {
  fetchDetail();
});
</script>

<template>
  <div class="container-fluid py-4">
    <AdminHeader />
    <div class="row mt-4 justify-content-center">
      <div class="col-lg-8 col-md-10">
        <div class="card shadow-sm border-0">
          <div class="card-header bg-transparent border-bottom pt-4 pb-3">
            <h5 class="mb-0">기관 수정</h5>
          </div>

          <div class="card-body p-4">
            <form @submit.prevent="updateInstitution">
              <div class="row align-items-center mb-4">
                <div class="col-md-3">
                  <label class="form-control-label mb-0">기관명</label>
                </div>
                <div class="col-md-9">
                  <argon-input
                    type="text"
                    v-model="instInfo.name"
                    class="mb-0"
                  />
                </div>
              </div>

              <div class="row mb-4">
                <div class="col-md-3 pt-2">
                  <label class="form-control-label mb-0">주소</label>
                </div>
                <div class="col-md-9">
                  <div class="d-flex gap-2 mb-2">
                    <argon-input
                      type="text"
                      readonly
                      v-model="zipCode"
                      class="mb-0 w-50"
                    />
                    <argon-button
                      color="secondary"
                      size="sm"
                      class="mb-0 px-3"
                      @click.prevent="openPostcode"
                      >우편번호 검색</argon-button
                    >
                  </div>
                  <argon-input
                    type="text"
                    readonly
                    v-model="mainAddress"
                    class="mb-2"
                  />
                  <argon-input
                    type="text"
                    v-model="detailAddress"
                    ref="detailRef"
                    class="mb-0"
                  />
                </div>
              </div>

              <div class="row align-items-center mb-4">
                <div class="col-md-3">
                  <label class="form-control-label mb-0">대표번호</label>
                </div>
                <div class="col-md-9">
                  <argon-input type="tel" v-model="instInfo.tel" class="mb-0" />
                </div>
              </div>

              <div class="row align-items-center mb-4">
                <div class="col-md-3">
                  <label class="form-control-label mb-0">이메일</label>
                </div>
                <div class="col-md-9">
                  <argon-input
                    type="email"
                    v-model="instInfo.email"
                    class="mb-0"
                  />
                </div>
              </div>

              <div class="row align-items-center mb-5">
                <div class="col-md-3">
                  <label class="form-control-label mb-0">운영여부</label>
                </div>
                <div class="col-md-9 d-flex gap-4">
                  <div class="form-check mb-0">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="stateRadio"
                      id="stateOpen"
                      value="b001"
                      v-model="instInfo.state"
                    />
                    <label class="form-check-label text-sm mt-1" for="stateOpen"
                      >운영</label
                    >
                  </div>
                  <div class="form-check mb-0">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="stateRadio"
                      id="statePause"
                      value="b002"
                      v-model="instInfo.state"
                    />
                    <label
                      class="form-check-label text-sm mt-1"
                      for="statePause"
                      >휴업</label
                    >
                  </div>
                  <div class="form-check mb-0">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="stateRadio"
                      id="stateClose"
                      value="b003"
                      v-model="instInfo.state"
                    />
                    <label
                      class="form-check-label text-sm mt-1"
                      for="stateClose"
                      >폐업</label
                    >
                  </div>
                </div>
              </div>

              <div class="text-center">
                <argon-button color="warning" size="md" class="px-5"
                  >수정 완료</argon-button
                >
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-control-label {
  font-weight: 700;
  color: #344767;
}
</style>
