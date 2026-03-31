<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const waitUsers = ref([]);

// 승인 대기 사용자 조회
const loadWaitUsers = async () => {
  try {
    const res = await axios.get("/api/user/wait-users");
    waitUsers.value = res.data;
  } catch (err) {
    console.log(err);
  }
};

// 승인
const approveUser = async (id) => {
  try {
    await axios.patch(`/api/user/approve/${id}`);
    alert("승인 완료");
    loadWaitUsers(); // 다시 조회
  } catch (err) {
    console.log(err);
  }
};

// 거절
const rejectUser = async (id) => {
  try {
    await axios.patch(`/api/user/reject/${id}`);
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
      <h6>회원가입 신청내역</h6>
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
                이메일
              </th>

              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                승인
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in waitUsers" :key="user.G_UserId">
              <td>{{ user.name }}</td>
              <td>{{ user.id }}</td>
              <td>{{ user.tel }}</td>
              <td>{{ user.email }}</td>

              <td>
                <button
                  class="btn btn-success btn-sm me-2"
                  @click="approveUser(user.G_UserId)"
                >
                  승인
                </button>

                <button
                  class="btn btn-danger btn-sm"
                  @click="rejectUser(user.G_UserId)"
                >
                  거절
                </button>
              </td>
            </tr>
          </tbody>
          <div v-if="waitUsers.length === 0" class="text-center">
            승인 대기 사용자가 없습니다.
          </div>
        </table>
      </div>
    </div>
  </div>
</template>
