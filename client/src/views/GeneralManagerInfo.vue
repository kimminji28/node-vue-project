<script setup>
import { ref, reactive, onMounted, onBeforeMount, onBeforeUnmount } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import RoleHeader from "./components/RoleHeader.vue";
import ArgonButton from "@/components/ArgonButton.vue";

const store = useStore();
const route = useRoute();
const body = document.getElementsByTagName("body")[0];

const institutionId = ref("");
const managerList = ref([]);
const selectedManagerId = ref("");
const assignedSupportList = ref([]);
const showAssignedPanel = ref(false);

const selectedManager = reactive({
  I_UserId: "",
  name: "",
  id: "",
  tel: "",
  institution_id: "",
  institution_name: "",
  approval: "",
  roll: "",
  assigned_count: 0,
});

onBeforeMount(() => {
  store.state.imageLayout = "profile-overview";
  store.state.showNavbar = false;
  store.state.showFooter = false;
  store.state.hideConfigButton = true;
  store.state.showSidenav = false;
  body.classList.add("profile-overview");
});

onBeforeUnmount(() => {
  store.state.imageLayout = "default";
  store.state.showNavbar = true;
  store.state.showFooter = true;
  store.state.hideConfigButton = false;
  store.state.showSidenav = true;
  body.classList.remove("profile-overview");
});

onMounted(async () => {
  institutionId.value = route.query.institutionId || "";
  await getManagerList();
});

const getRoleText = (roll) => {
  if (roll === "a002") return "기관 관리자";
  if (roll === "a003") return "기관 담당자";
  return roll || "-";
};

const formatDate = (date) => {
  if (!date) return "-";

  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return "-";

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const getGenderText = (gender) => {
  if (gender === "c001") return "남자";
  if (gender === "c002") return "여자";
  return gender || "-";
};

const getAssignRoleText = (item) => {
  if (item.assign_role_name) return item.assign_role_name;

  if (item.I_UserId1 === selectedManager.I_UserId) return "정담당";
  if (item.I_UserId2 === selectedManager.I_UserId) return "부담당";
  return "-";
};

const resetSelectedManager = () => {
  selectedManager.I_UserId = "";
  selectedManager.name = "";
  selectedManager.id = "";
  selectedManager.tel = "";
  selectedManager.institution_id = "";
  selectedManager.institution_name = "";
  selectedManager.approval = "";
  selectedManager.roll = "";
  selectedManager.assigned_count = 0;
};

const setSelectedManager = (data) => {
  selectedManager.I_UserId = data?.I_UserId || "";
  selectedManager.name = data?.name || "";
  selectedManager.id = data?.id || "";
  selectedManager.tel = data?.tel || "";
  selectedManager.institution_id = data?.institution_id || "";
  selectedManager.institution_name = data?.institution_name || "";
  selectedManager.approval = data?.approval || "";
  selectedManager.roll = data?.roll || "";
  selectedManager.assigned_count = Number(data?.assigned_count || 0);
};

const getManagerList = async () => {
  try {
    if (!institutionId.value) {
      managerList.value = [];
      resetSelectedManager();
      return;
    }

    const result = await fetch(
      `/api/user/managerlist?institutionId=${encodeURIComponent(institutionId.value)}`,
      {
        method: "GET",
        credentials: "include",
      }
    ).then((res) => res.json());

    console.log("manager list result :", result);

    if (result.status === "Success") {
      managerList.value = result.data || [];

      if (managerList.value.length > 0) {
        const firstManager = managerList.value[0];
        selectedManagerId.value = firstManager.I_UserId;
        setSelectedManager(firstManager);
      } else {
        resetSelectedManager();
      }
    } else {
      managerList.value = [];
      resetSelectedManager();
    }
  } catch (err) {
    console.log("getManagerList error :", err);
    managerList.value = [];
    resetSelectedManager();
  }
};

const viewManager = (manager) => {
  selectedManagerId.value = manager.I_UserId;
  setSelectedManager(manager);
  assignedSupportList.value = [];
  showAssignedPanel.value = false;
};

const toggleAssignedSupport = async () => {
  try {
    if (!selectedManager.I_UserId) return;

    if (showAssignedPanel.value) {
      showAssignedPanel.value = false;
      assignedSupportList.value = [];
      return;
    }

    const result = await fetch(
      `/api/user/manager/assignedSupport?institutionId=${encodeURIComponent(
        institutionId.value
      )}&iUserId=${encodeURIComponent(selectedManager.I_UserId)}`,
      {
        method: "GET",
        credentials: "include",
      }
    ).then((res) => res.json());

    if (result.status === "Success") {
      assignedSupportList.value = result.data || [];
      showAssignedPanel.value = true;
    } else {
      alert(result.message || "배정현황 조회 실패");
    }
  } catch (err) {
    console.log("toggleAssignedSupport error :", err);
    alert("배정현황 조회 중 오류가 발생했습니다.");
  }
};
</script>

<template>
  <main class="general-page">
    <RoleHeader />

    <div class="content-wrap container-fluid py-4">
      <div class="general-layout">
        
        <!-- 좌측 -->
        <div class="left-panel">
          <div class="card h-100 shadow-sm border-0 manager-list-card">
            <div class="card-header pb-0">
              <h5 class="mb-0">기관 내 담당자</h5>
            </div>

            <div class="card-body">
              <div v-if="managerList.length === 0" class="text-muted">
                소속 담당자 정보가 없습니다.
              </div>

              <div
                v-for="manager in managerList"
                :key="manager.I_UserId"
                class="manager-item"
                :class="{ active: selectedManagerId === manager.I_UserId }"
              >
                <div class="manager-text">
                  <div class="manager-name">{{ manager.name || "-" }}</div>
                  <div class="manager-sub text-sm text-secondary">
                    {{ getRoleText(manager.roll) }}
                  </div>
                </div>

                <ArgonButton
                  color="success"
                  class="mb-0 px-3 py-2 btn-sm"
                  @click="viewManager(manager)"
                >
                  보기
                </ArgonButton>
              </div>
            </div>
          </div>
        </div>

        <!-- 우측 -->
        <div class="right-panel">
          <div class="card shadow-sm border-0 mb-3 manager-info-card">
            <div class="card-header pb-0">
              <h5 class="mb-0">기관 담당자 정보</h5>
            </div>

            <div class="card-body">
              <div v-if="!selectedManager.I_UserId" class="text-muted">
                담당자를 선택하세요.
              </div>

              <div v-else class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-control-label">이름</label>
                  <div class="form-control bg-light">
                    {{ selectedManager.name || "-" }}
                  </div>
                </div>

                <div class="col-md-6 mb-3">
                  <label class="form-control-label">아이디</label>
                  <div class="form-control bg-light">
                    {{ selectedManager.id || "-" }}
                  </div>
                </div>

                <div class="col-md-6 mb-3">
                  <label class="form-control-label">연락처</label>
                  <div class="form-control bg-light">
                    {{ selectedManager.tel || "-" }}
                  </div>
                </div>

                <div class="col-md-6 mb-3">
                  <label class="form-control-label">권한</label>
                  <div class="form-control bg-light">
                    {{ getRoleText(selectedManager.roll) }}
                  </div>
                </div>

                <div class="col-md-6 mb-3">
                  <label class="form-control-label">기관명</label>
                  <div class="form-control bg-light">
                    {{ selectedManager.institution_name || "-" }}
                  </div>
                </div>

                <div class="col-md-12 mb-3">
                  <label class="form-control-label">배정현황</label>
                  <div class="d-flex gap-2 align-items-stretch">
                    <div
                      class="form-control bg-light d-flex align-items-center justify-content-center assigned-count-box"
                    >
                      {{ selectedManager.assigned_count }}명
                    </div>

                    <ArgonButton
                      color="success"
                      class="mb-0 d-flex align-items-center justify-content-center assigned-view-btn"
                      @click="toggleAssignedSupport"
                    >
                      {{ showAssignedPanel ? "배정현황 닫기" : "배정현황 보기" }}
                    </ArgonButton>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 배정현황 -->
          <div v-if="showAssignedPanel" class="card shadow-sm border-0">
            <div class="card-header pb-0">
              <h5 class="mb-0">배정 지원대상자 목록</h5>
            </div>

            <div class="card-body">
              <div v-if="assignedSupportList.length === 0" class="text-muted">
                배정된 지원대상자가 없습니다.
              </div>

              <div v-else class="table-responsive">
                <table class="table align-items-center mb-0 text-center">
                  <thead>
                    <tr>
                      <th>이름</th>
                      <th>생년월일</th>
                      <th>성별</th>
                      <th>장애유형(대)</th>
                      <th>담당구분</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in assignedSupportList" :key="item.support_id">
                      <td>{{ item.name || "-" }}</td>
                      <td>{{ formatDate(item.born) }}</td>
                      <td>{{ getGenderText(item.gender) }}</td>
                      <td>{{ item.major_name || "-" }}</td>
                      <td>{{ getAssignRoleText(item) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.general-page {
  min-height: 100vh;
  background: linear-gradient(
    to bottom,
    #36d1a5 0,
    #36d1a5 220px,
    #f8f9fa 220px,
    #f8f9fa 100%
  );
}

.content-wrap {
  position: relative;
  z-index: 2;
}

/* 레이아웃 */
.general-layout {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

/* 좌측 */
.left-panel {
  width: 300px;
  flex-shrink: 0;
}

/* 우측 */
.right-panel {
  flex: 1;
}

/* 🔥 핵심: 높이 맞추기 */
.manager-info-card {
  height: 450px; /* ← 필요하면 440~460 사이 조절 */
}

/* 카드 */
.manager-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  margin-bottom: 12px;
  background: #fff;
}

.manager-item.active {
  border-color: #5e72e4;
  background: #f8f9ff;
}

.manager-name {
  font-weight: 700;
  color: #344767;
}

.form-control.bg-light {
  display: flex;
  align-items: center;
  min-height: 42px;
}

.assigned-count-box {
  width: 110px;
}

.assigned-view-btn {
  min-height: 42px;
}
</style>