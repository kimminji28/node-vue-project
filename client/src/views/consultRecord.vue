<template>
  <consultTop />
  <div class="consultation-container">
    <div class="table-title-box">
      <h5 class="table-title">📄 상담 기록 리스트</h5>
    </div>
    <section class="search-filter-box">
      <div class="filter-row">
        <div class="input-item">
          <label>기관담당자 :</label>
          <select v-model="filters.type" class="form-select">
            <option value="all">전체</option>
            <option value="minari">미나리</option>
            <option value="gosari">고사리</option>
            <option value="si">시금치</option>
          </select>
        </div>

        <div class="input-item">
          <label>상담유형 :</label>
          <select v-model="filters.type" class="form-select">
            <option value="all">전체</option>
            <option value="phone">전화상담</option>
            <option value="face">센터방문</option>
            <option value="face">가정방문</option>
          </select>
        </div>

        <div class="input-item">
          <label>기간 :</label>
          <div class="date-group">
            <input
              type="date"
              v-model="filters.startDate"
              class="form-input date"
            />
            <span class="date-separator">~</span>
            <input
              type="date"
              v-model="filters.endDate"
              class="form-input date"
            />
          </div>
        </div>

        <div class="search-group ms-auto">
          <input
            type="text"
            v-model="filters.userName"
            placeholder="지원대상자 이름 검색"
            class="form-input search-input"
          />
          <button class="btn-search">검색</button>
        </div>
      </div>
    </section>

    <section class="table-container">
      <table class="consultation-table">
        <thead>
          <tr>
            <th width="60">번호</th>
            <th width="120">지원대상자명</th>
            <th width="180">상담일시</th>
            <th width="100">상담유형</th>
            <th width="100">상담장소</th>
            <th>상담내용</th>
            <th width="140">기관 담당자</th>
            <th width="120">수정/삭제</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in paginatedList" :key="item.id">
            <td>{{ item.id }}</td>
            <td class="fw-bold">{{ item.targetName }}</td>
            <td class="text-secondary">{{ item.date }}</td>
            <td>{{ item.type }}</td>
            <td>{{ item.location }}</td>
            <td class="content-cell text-start">{{ item.content }}</td>
            <td class="manager-cell">
              <div>정 : {{ item.managerMain }}</div>
              <div class="text-muted">부 : {{ item.managerSub }}</div>
            </td>
            <td>
              <div class="action-buttons">
                <button class="btn-outline-edit">수정</button>
                <button class="btn-outline-delete">삭제</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <footer class="list-footer">
      <div class="pagination">
        <span
          class="page-nav"
          @click="changePage(currentPage - 1)"
          :class="{ disabled: currentPage === 1 }"
          >◀</span
        >

        <span
          v-for="page in displayedPages"
          :key="page"
          class="page-num"
          :class="{ active: currentPage === page }"
          @click="changePage(page)"
        >
          {{ page }}
        </span>

        <span
          class="page-nav"
          @click="changePage(currentPage + 1)"
          :class="{ disabled: currentPage === totalPages }"
          >▶</span
        >
      </div>
      <router-link
        :to="{ name: 'managerConsultAdd' }"
        custom
        v-slot="{ navigate }"
      >
        <button class="btn-register" @click="navigate" role="link">등록</button>
      </router-link>
    </footer>
  </div>
</template>

<script setup>
import consultTop from "./components/consult.vue";
import { ref, computed } from "vue";

// 검색 필터 데이터
const filters = ref({
  manager: "",
  type: "all",
  startDate: "2026-02-01",
  endDate: "2026-03-17",
  userName: "",
});

const consultationList = ref([
  {
    id: 7,
    targetName: "홍길동",
    date: "2026.03.16. am 11:00",
    type: "전화상담",
    location: "센터",
    content:
      "초기 상담 및 가계도 작성. 모야모야병 진단 시기 및 현재 치료 상태 확인...",
    managerMain: "미나리",
    managerSub: "노란색",
  },
  {
    id: 6,
    targetName: "호빵맨",
    date: "2026.02.23. am 10:00",
    type: "대면상담",
    location: "센터",
    content:
      "돌발 행동 시 대처 방안(ABC 분석) 교육. 상담 과정에서의 변화 피드백...",
    managerMain: "시금치",
    managerSub: "주황색",
  },
]);

//페이징
const currentPage = ref(1);
const itemsPerPage = 10;
const pageGroupSize = 5;

const paginatedList = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return consultationList.value.slice(start, end);
});

const totalPages = computed(() => {
  const total = Math.ceil(consultationList.value.length / itemsPerPage);
  return total > 0 ? total : 1;
});

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const displayedPages = computed(() => {
  const startPage =
    Math.floor((currentPage.value - 1) / pageGroupSize) * pageGroupSize + 1;
  const endPage = Math.min(startPage + pageGroupSize - 1, totalPages.value);

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  return pages;
});
</script>

<style scoped>
.consultation-container {
  padding: 20px;
  background-color: #f8f9fa;
  min-width: 1000px;
  text-align: center;
}

/* 검색 필터 박스 가로 정렬 */
.search-filter-box {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  margin-bottom: 30px;
}

.filter-row {
  display: flex;
  align-items: center;
  gap: 25px; /* 항목 간 간격 */
  flex-wrap: nowrap;
}

.input-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.input-item label {
  font-weight: bold;
  font-size: 0.9rem;
  color: #344767;
  white-space: nowrap;
}

.date-group {
  display: flex;
  align-items: center;
  gap: 5px;
}

/* 입력창 공통 스타일 */
.form-input,
.form-select {
  border: 1px solid #d2d6da;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 0.85rem;
  min-width: 100px;
}

.small {
  width: 100px;
}
.date {
  width: 140px;
}
.search-input {
  width: 200px;
}

/* 검색 버튼 */
.btn-search {
  background-color: #1a681ad1;
  color: white;
  border: none;
  padding: 6px 16px;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
}

.ms-auto {
  margin-left: auto;
}

/* 테이블 스타일 */
.table-title-box {
  text-align: center;
  /* margin: 20px; */
  padding: 20px;
}

.table-title {
  font-weight: bold;
  color: #2d6a4f;
  font-size: 30px;
}

.consultation-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
}

.consultation-table th {
  background-color: #1a681ad1;
  color: white;
  padding: 12px;
  font-size: 0.9rem;
}

.consultation-table td {
  padding: 12px;
  border-bottom: 1px solid #eee;
  text-align: center;
  font-size: 0.85rem;
}

/* 수정/삭제 버튼 */
.action-buttons {
  display: flex !important;
  flex-direction: row !important;
  justify-content: center;
  align-items: center;
  gap: 8px;
  width: 100%;
}

.btn-outline-edit,
.btn-outline-delete {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  background: white;
  border: 1px solid #d2d6da;
  cursor: pointer;
  white-space: nowrap;
  min-width: 50px;
}

.btn-outline-edit:hover {
  border-color: #2d6a4f;
  color: #2d6a4f;
}
.btn-outline-delete:hover {
  border-color: #d9534f;
  color: #d9534f;
}

/* 등록 버튼 */
.btn-register {
  background: white;
  border: 2px solid #333;
  padding: 8px 25px;
  border-radius: 25px;
  font-weight: bold;
  cursor: pointer;
}

.list-footer {
  display: flex;
  justify-content: center; /* 페이징 번호를 가로 중앙으로 */
  align-items: center; /* 세로 중앙 정렬 */
  position: relative; /* 버튼 위치 고정을 위한 기준점 */
  width: 100%;
  margin-top: 30px;
  padding: 10px 0;
}

.pagination {
  display: flex;
  gap: 8px; /* 번호 사이 간격 */
  align-items: center;
}

.btn-register {
  position: absolute; /* 페이징 순서에서 빠져나와 공중부양 */
  right: 0; /* 오른쪽 끝에 딱 붙임 */
  background: white;
  border: 2px solid #333;
  padding: 8px 25px;
  border-radius: 25px;
  font-weight: bold;
  cursor: pointer;
}

/* 페이징 번호 디자인 살짝 추가 */
.page-num,
.page-nav {
  cursor: pointer;
  padding: 5px 12px;
  font-size: 0.9rem;
}

.page-num.active {
  background-color: #287b28;
  color: white;
  border-radius: 4px;
  font-weight: bold;
}
</style>
