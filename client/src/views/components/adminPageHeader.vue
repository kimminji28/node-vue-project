<script setup>
import { RouterLink } from "vue-router";
import { useRouter } from "vue-router";

const router = useRouter();

const logout = async () => {
  try {
    const result = await fetch("/api/admin/logout", {
      method: "POST",
      credentials: "include", 
    }).then((res) => res.json());

    if (result.status === "Success") {
      alert("로그아웃 완료");

      router.push("/admin/login");

    } else {
      alert("로그아웃 실패");
    }
  } catch (err) {
    console.log(err);
    alert("에러 발생");
  }
};
</script>

<template>
  <div class="container-fluid">
    <div class="page-header min-height-100">
      <span class="mask bg-gradient-success opacity-6"></span>
    </div>

    <div class="card shadow-lg mt-n6">
      <div class="card-body p-3 position-relative">
        <div class="row gx-4">
          <div class="col-auto">
            <div class="avatar avatar-xl position-relative">
              <img
                src="@/assets/img/team-1.jpg"
                alt="profile_image"
                class="shadow-sm w-100 border-radius-lg"
              />
            </div>
          </div>

          <div class="col-auto my-auto">
            <div class="h-100">
              <ul class="nav nav-pills custom-top-menu" role="tablist">
                <li class="nav-item">
                  <router-link
                    class="px-3 py-2 nav-link"
                    :to="{ name: 'adminSurveyInsert' }"
                    active-class="active"
                  >
                    조사지 버전등록
                  </router-link>
                </li>

                <li class="nav-item">
                  <router-link
                    class="px-3 py-2 nav-link"
                    :to="{ name: 'adminSurveyList' }"
                    active-class="active"
                  >
                    조사지 버전조회
                  </router-link>
                </li>
              </ul>
            </div>
          </div>

          <div
            class="position-absolute top-50 start-50 translate-middle text-center fw-bold"
          >
            admin 님 환영합니다
          </div>

          <div class="mx-auto mt-3 col-lg-4 col-md-6 my-sm-auto ms-sm-auto me-sm-0">
            <div class="nav-wrapper position-relative end-0">
              <ul class="p-1 bg-transparent nav nav-pills nav-fill" role="tablist">
                <li class="nav-item">
                  <a class="px-3 py-2 mb-0 nav-link" href="javascript:;" @click="logout()">
                    <span class="ms-1">Log Out</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
