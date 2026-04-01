<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const waitUsers = ref([]);

// 승인 대기 사용자 조회
const loadWaitUsers = async () => {
  try {
    const [generalRes, instiRes] = await Promise.all([
      axios.get("/api/user/wait-users"),
      axios.get("/api/user/wait-insti-users"),
    ]);

    // 일반 사용자 + 기관 담당자 합치기
    waitUsers.value = [
      ...generalRes.data.data.map((u) => ({ ...u, type: "general" })),
      ...instiRes.data.data.map((u) => ({ ...u, type: "insti" })),
    ];
  } catch (err) {
    console.log(err);
  }
};

// 승인
const approveUser = async (user) => {
  if (!confirm("해당 사용자를 승인하시겠습니까?")) return;

  try {
    if (user.type === "general") {
      await axios.patch(`/api/user/approve/${user.G_UserId}`);
    } else {
      await axios.patch(`/api/user/approve-manager/${user.I_UserId}`);
    }

    alert("승인 완료");
    loadWaitUsers();
  } catch (err) {
    console.log(err);
  }
};
// 거절
const rejectUser = async (user) => {
  try {
    if (user.type === "general") {
      await axios.patch(`/api/user/reject/${user.G_UserId}`);
    } else {
      await axios.patch(`/api/user/reject-manager/${user.I_UserId}`);
    }

    alert("거절 완료");
    loadWaitUsers();
  } catch (err) {
    console.log(err);
  }
};
onMounted(() => {
  loadWaitUsers();
});
</script>

<template>
  <div class="card">
    <div class="card-header pb-0">
      <h6>사용자 가입 승인 관리</h6>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                이름
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                아이디
              </th>

              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                연락처
              </th>

              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                구분
              </th>

              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                승인
              </th>
            </tr>
          </thead>
          <tbody v-if="waitUsers.length > 0">
            <tr v-for="user in waitUsers" :key="user.G_UserId">
              <td class="text-center">{{ user.name }}</td>
              <td class="text-center">{{ user.id }}</td>
              <td class="text-center">{{ user.tel }}</td>
              <td class="text-center">
                {{ user.type === "general" ? "일반" : "기관" }}
              </td>

              <td class="text-center">
                <button
                  class="btn btn-success btn-sm me-2"
                  @click="approveUser(user)"
                >
                  승인
                </button>

                <button class="btn btn-danger btn-sm" @click="rejectUser(user)">
                  거절
                </button>
              </td>
            </tr>
          </tbody>

          <tbody v-else>
            <tr>
              <td colspan="5" class="text-center">
                승인 대기 사용자가 없습니다.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
