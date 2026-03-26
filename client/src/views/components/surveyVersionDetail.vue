<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card shadow-lg mb-4">
          <div class="card-header pb-0 p-4">
            <div class="d-flex justify-content-between align-items-center">
              <h6 class="mb-0 font-weight-bolder text-info">조사지 상세조회</h6>
              <div class="d-flex align-items-center">
                <span class="text-sm me-2 text-secondary font-weight-bold">작성일</span>
                <div class="date-display p-2 bg-light border-radius-md border">
                  <span class="text-xs font-weight-bold">{{ formatDate(createdAt) }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="card-body p-4">
            <div class="row mb-4">
              <div class="col-md-4">
                <label class="form-control-label text-sm">버전</label>
                <input type="text" class="form-control" v-model="version" readonly />
              </div>
            </div>

            <div class="mb-4">
              <label class="form-control-label text-sm">버전 상세설명</label>
              <textarea
                class="form-control"
                rows="3"
                v-model="versionDesc"
                readonly
              ></textarea>
            </div>

            <template v-for="(section, sIdx) in allSections" :key="sIdx">
              <div
                class="d-flex justify-content-between align-items-center mb-4 p-3 bg-gray-100 border-radius-lg"
                :class="{ 'mt-5': sIdx > 0 }"
              >
                <div class="d-flex align-items-center">
                  <span class="text-success me-2">●</span>
                  <span class="text-sm font-weight-bolder">{{ section.title }}</span>
                </div>
              </div>

              <div class="table-responsive">
                <table class="table align-items-center mb-0 border-top">
                  <thead>
                    <tr class="bg-light">
                      <th class="ps-4 text-sm font-weight-bolder">설문 항목</th>
                    </tr>
                  </thead>

                  <tbody>
                    <template v-for="(sub, subIdx) in section.subs" :key="subIdx">
                      <tr class="bg-gray-100">
                        <td
                          class="py-2 ps-4 text-xs font-weight-bold text-info text-uppercase"
                        >
                          <div>
                            {{ sub.subTitle }}
                            <span
                              v-if="sub.description"
                              class="ms-2 font-weight-normal text-secondary text-lowercase"
                            >
                              {{ sub.description }}
                            </span>
                          </div>

                          <div v-if="sub.inputs.length > 0" class="mt-3">
                            <div
                              v-for="(item, inputIdx) in sub.inputs"
                              :key="inputIdx"
                              class="mb-3 p-3 bg-white border border-radius-sm"
                            >
                              <div class="d-flex flex-column gap-3">
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="item.text"
                                  readonly
                                />

                                <div class="preview-box">
                                  <!-- e001 -->
                                  <div
                                    v-if="item.answerType === 'e001'"
                                    class="d-flex gap-4"
                                  >
                                    <div class="form-check">
                                      <input
                                        class="form-check-input"
                                        type="radio"
                                        disabled
                                      />
                                      <label class="form-check-label">예</label>
                                    </div>
                                    <div class="form-check">
                                      <input
                                        class="form-check-input"
                                        type="radio"
                                        disabled
                                      />
                                      <label class="form-check-label">아니오</label>
                                    </div>
                                  </div>

                                  <!-- e002 -->
                                  <div v-else-if="item.answerType === 'e002'">
                                    <textarea
                                      class="form-control"
                                      rows="3"
                                      placeholder="장문형 입력란"
                                      disabled
                                    ></textarea>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div v-else class="mt-3 text-secondary text-sm">
                            등록된 문항 없음
                          </div>
                        </td>
                      </tr>
                    </template>
                  </tbody>
                </table>
              </div>
            </template>

            <div class="mt-4">
              <h6 class="text-sm font-weight-bolder mb-2 text-secondary">
                <span class="text-success me-1">●</span> 추가 요청사항
              </h6>
              <textarea
                class="form-control"
                rows="4"
                v-model="extraRequest"
                readonly
              ></textarea>
            </div>

            <div class="d-flex justify-content-end mt-4">
              <button class="btn btn-outline-secondary" @click="goList">목록</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const verId = route.params.verId;

// 상단 정보
const version = ref("");
const versionDesc = ref("");
const createdAt = ref("");

const formatDate = (dateStr) => {
  const date = new Date(dateStr);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const allSections = ref([
  {
    title: "지원사유",
    subs: [
      {
        titleCode: "T010",
        subTitle: "긴급 지원 필요",
        description: "즉시 지원인식 및 서비스 필요",
        inputs: [],
      },
      {
        titleCode: "T011",
        subTitle: "중점 지원 필요",
        description: "즉시 지원인식 및 서비스 필요",
        inputs: [],
      },
      {
        titleCode: "T012",
        subTitle: "계획 수립 필요",
        description: "즉시 지원인식 및 서비스 필요",
        inputs: [],
      },
    ],
  },
  {
    title: "지원이 필요한 서비스",
    subs: [
      { titleCode: "T020", subTitle: "개인별 지원", inputs: [] },
      { titleCode: "T021", subTitle: "교통", inputs: [] },
    ],
  },
  {
    title: "이용중인 복지 서비스",
    subs: [
      { titleCode: "T030", subTitle: "생활안정", inputs: [] },
      { titleCode: "T031", subTitle: "고용", inputs: [] },
    ],
  },
]);

const bindDetailToSections = (rows) => {
  // 초기화
  allSections.value.forEach((section) => {
    section.subs.forEach((sub) => {
      sub.inputs = [];
    });
  });

  // 매핑
  rows.forEach((row) => {
    allSections.value.forEach((section) => {
      section.subs.forEach((sub) => {
        if (sub.titleCode === row.titleCode) {
          sub.inputs.push({
            text: row.question_text,
            answerType: row.answer_type,
            questionNo: row.question_no,
          });
        }
      });
    });
  });

  // 정렬
  allSections.value.forEach((section) => {
    section.subs.forEach((sub) => {
      sub.inputs.sort((a, b) => a.questionNo - b.questionNo);
    });
  });
};

const getDetail = async () => {
  const result = await fetch(`/api/admin/surveydetail/${verId}`)
    .then((resp) => resp.json())
    .catch((err) => console.log(err));

  console.log("상세조회:", result);

  if (result.status === "Success") {
    const rows = result.data;

    if (!rows || rows.length === 0) return;

    // 상단 정보
    version.value = rows[0].version;
    versionDesc.value = rows[0].description;
    createdAt.value = rows[0].created_at;
    bindDetailToSections(rows);
  }
};

onMounted(() => {
  getDetail();
});
</script>

<style scoped>
.table td,
.table th {
  padding: 0.75rem 0.5rem;
}

.bg-gray-100 {
  background-color: #f8f9fa !important;
}

.question-input {
  flex: 1;
  min-width: 260px;
}

.answer-select {
  width: 160px;
  min-width: 160px;
}

.preview-box {
  padding: 0.75rem;
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 0.5rem;
}

.border-radius-sm {
  border-radius: 4px;
}
</style>
