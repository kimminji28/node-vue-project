<script setup>
import { computed } from "vue";

const props = defineProps({
  userName: String,
  regDate: String,
  sections: {
    type: Array,
    default: () => [],
  },
  answers: Array,
});

const flatAnswers = computed(() => {
  if (!props.answers?.length) return [];

  const merged = props.answers.flat(2).filter(Boolean).join(",");
  // console.log("merged:", merged);

  return merged ? merged.split(",") : [];
});

const getAnswer = (sIdx, subIdx, qIdx) => {
  let index = 0;

  for (let i = 0; i < sIdx; i++) {
    props.sections[i].subs?.forEach((sub) => {
      index += sub.questions?.length || 0;
    });
  }

  for (let j = 0; j < subIdx; j++) {
    index += props.sections[sIdx].subs[j].questions?.length || 0;
  }

  index += qIdx;

  return flatAnswers.value[index] || "";
};

const displayDate = computed(() => {
  if (!props.regDate) return "-";
  const date = new Date(props.regDate);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
});
</script>

<template>
  <div class="py-4 container-fluid survey-view-page">
    <div class="row justify-content-center">
      <div class="col-12 col-lg-11">
        <div class="survey-header-container shadow-sm mb-0">
          <div
            class="d-flex align-items-center p-3 px-4 text-white header-bg position-relative"
          >
            <h5 class="mb-0 font-weight-bolder text-white">
              {{ userName || "대상자" }}님 조사지 결과
            </h5>

            <div class="date-center">
              <span class="text-sm font-weight-bold opacity-9">
                등록일 : {{ displayDate }}
              </span>
            </div>

            <button
              class="btn-close btn-close-white ms-auto"
              @click="$router.back()"
            ></button>
          </div>
        </div>

        <div class="card shadow-lg border-radius-top-none mb-5">
          <div class="card-body p-4 pt-5">
            <template v-for="(section, sIdx) in sections" :key="sIdx">
              <div class="section-title-box mb-3" :class="{ 'mt-5': sIdx > 0 }">
                <div class="d-flex align-items-center">
                  <span class="dot-icon me-2">●</span>
                  <h6 class="mb-0 font-weight-bolder text-dark">
                    {{ section.title }}
                  </h6>
                </div>
              </div>

              <div class="table-responsive mb-4">
                <table
                  class="table align-items-center mb-0 custom-bordered-table"
                >
                  <thead>
                    <tr class="bg-gray-100">
                      <th
                        class="text-center text-secondary text-xxs"
                        style="width: 60px"
                      >
                        번호
                      </th>
                      <th class="text-start text-secondary text-xxs ps-4">
                        조사 문항
                      </th>
                      <th
                        class="text-center text-secondary text-xxs"
                        style="width: 80px"
                      >
                        예
                      </th>
                      <th
                        class="text-center text-secondary text-xxs"
                        style="width: 80px"
                      >
                        아니오
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    <template
                      v-for="(sub, subIdx) in section.subs"
                      :key="subIdx"
                    >
                      <tr class="sub-header-row bg-white">
                        <td class="text-center bg-gray-100">
                          {{ section.title }}
                        </td>
                        <td class="ps-4">
                          {{ sub.description || "상세 내역 확인" }}
                        </td>
                        <td colspan="2" class="bg-gray-100"></td>
                      </tr>

                      <tr v-for="(q, qIdx) in sub.questions" :key="qIdx">
                        <td class="text-center">{{ qIdx + 1 }}</td>

                        <td class="ps-4">
                          <div>{{ typeof q === "string" ? q : q.text }}</div>

                          <div v-if="q.hasExtraInput === false" class="mt-2">
                            <textarea
                              class="form-control bg-light"
                              rows="2"
                              :value="getAnswer(sIdx, subIdx, qIdx)"
                              readonly
                            ></textarea>
                          </div>
                        </td>

                        <td class="text-center">
                          <div
                            class="result-box mx-auto"
                            :class="{
                              'active-check':
                                getAnswer(sIdx, subIdx, qIdx) === '예',
                            }"
                          >
                            <span v-if="getAnswer(sIdx, subIdx, qIdx) === '예'"
                              >✔</span
                            >
                          </div>
                        </td>

                        <td class="text-center">
                          <div
                            class="result-box mx-auto"
                            :class="{
                              'active-check':
                                getAnswer(sIdx, subIdx, qIdx) === '아니오',
                            }"
                          >
                            <span
                              v-if="getAnswer(sIdx, subIdx, qIdx) === '아니오'"
                              >✔</span
                            >
                          </div>
                        </td>
                      </tr>
                    </template>
                  </tbody>
                </table>
              </div>
            </template>

            <div class="d-flex justify-content-center mt-5 mb-4">
              <button
                class="btn btn-list-back px-7 py-2-5 shadow-sm"
                @click="$router.back()"
              >
                목록으로
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 조회 페이지 스타일 (등록 페이지와 100% 동일하게 유지) */
.survey-view-page {
  font-family: "Noto Sans KR", sans-serif;
  color: #333;
}
.header-bg {
  background-color: #5dbe8a !important;
  border-radius: 12px 12px 0 0;
}
.date-center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.border-radius-top-none {
  border-top-left-radius: 0 !important;
  border-top-right-radius: 0 !important;
}
.dot-icon {
  color: #49d38a;
  font-size: 0.9rem;
}
.section-title-box {
  border-bottom: 2px solid #ebf1f5;
  padding-bottom: 8px;
}
.custom-bordered-table {
  border: 1px solid #dee2e6;
  border-collapse: collapse;
  width: 100%;
}
.sub-header-row {
  border-top: 2px solid #333;
}
.border-bottom-dark {
  border-bottom: 1px solid #333 !important;
}
.question-row {
  border-bottom: 1px solid #dee2e6;
}
.result-box {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border: 1px solid #c1c9d0;
  border-radius: 4px;
  background-color: #fff;
  color: transparent;
}
.active-check {
  background-color: #8e99a7 !important;
  border-color: #8e99a7 !important;
  color: white !important;
  font-size: 14px;
}
.bg-info-soft {
  background-color: #e8f9fd;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 10px;
}
.btn-list-back {
  background-color: #7a89a0;
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 700;
  padding: 0.7rem 4rem;
}
.text-wrap {
  word-break: keep-all;
  line-height: 1.6;
}
.border-end {
  border-right: 1px solid #dee2e6 !important;
}
.border-start {
  border-left: 1px solid #dee2e6 !important;
}
</style>
