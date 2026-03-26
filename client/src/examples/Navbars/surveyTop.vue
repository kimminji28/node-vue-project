<template>
  <main>
    <!-- 상단 헤더 영역 -->
    <div class="container-fluid p-0">
      <div class="page-header min-height-50">
        <span class="mask bg-white"></span>
      </div>

      <div class="card shadow-none border-bottom rounded-0">
        <div class="card-body p-3">
          <div class="row align-items-center">
            <!-- 좌측: 프로필 + 메뉴 -->
            <div class="col-lg-4 col-md-5 d-flex align-items-center">
              <div class="avatar avatar-md me-3">
                <img
                  src="../Navbars/코코아.jpg"
                  alt="profile"
                  class="w-100 border-radius-lg"
                />
              </div>
              <ul class="nav nav-pills custom-top-menu" role="tablist">
                <li class="nav-item">
                  <RouterLink
                    class="nav-link text-xs p-2"
                    :to="{ name: 'userMain' }"
                    >첫 화면</RouterLink
                  >
                </li>
                <li class="nav-item">
                  <a class="nav-link text-xs p-2" href="#">공지사항</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link text-xs p-2" href="#">히스토리</a>
                </li>
              </ul>
            </div>

            <!-- 중앙: 환영 메시지 -->
            <div class="col-lg-4 text-center">
              <span class="fw-bold text-sm welcome-text"
                >홍길동님 환영합니다</span
              >
            </div>

            <!-- 우측: My Page / Log Out -->
            <div class="col-lg-4 col-md-7 mt-lg-0 mt-2">
              <ul class="nav nav-pills justify-content-end">
                <li class="nav-item">
                  <RouterLink
                    class="nav-link text-xs p-2"
                    :to="{ name: 'userSupport' }"
                    >My Page</RouterLink
                  >
                </li>
                <li class="nav-item">
                  <a class="nav-link text-xs p-2" href="#">Log Out</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
/* 공통 글자 스타일 */
.nav-link {
  font-size: 0.75rem !important;
  color: #67748e !important;
  transition: color 0.2s;
}
.nav-link:hover {
  color: #344767 !important;
}

/* 상단 여백 최소화 */
.min-height-50 {
  min-height: 10px !important;
}

/* 환영 텍스트 */
.welcome-text {
  font-size: 0.85rem;
  color: #344767;
  display: block;
}

/* 프로필 이미지 */
.avatar img {
  object-fit: cover;
  height: 40px;
  width: 40px;
}

/* 반응형 메뉴 여백 조정 */
@media (max-width: 768px) {
  .custom-top-menu {
    flex-wrap: wrap;
  }
  .welcome-text {
    font-size: 0.8rem;
  }
}
</style>
