<template>
  <div class="container-fluid min-w-900">
    <div class="page-header min-height-100 border-radius-xl mt-4">
      <span class="mask bg-gradient-success opacity-6"></span>
    </div>

    <div class="card shadow-lg mt-n6 mx-3">
      <div class="card-body p-3">
        <div
          class="d-flex align-items-center justify-content-between flex-row flex-nowrap w-100"
        >
          <div class="d-flex align-items-center">
            <h3 class="mb-0 text-nowrap fw-bold me-4" style="font-size: 1.1rem">
              발달장애인 지원 프로그램
            </h3>
          </div>

          <div class="d-flex align-items-center">
            <ul
              class="nav nav-pills custom-horizontal-menu flex-row flex-nowrap"
            >
              <li class="nav-item">
                <RouterLink
                  class="px-3 py-2 nav-link d-flex align-items-center"
                  :to="{ name: 'managerMain' }"
                  active-class="active"
                >
                  <span class="me-1">🏠</span>
                  <span class="text-nowrap">첫 화면</span>
                </RouterLink>
              </li>
              <li class="nav-item ms-2">
                <RouterLink
                  class="px-3 py-2 nav-link d-flex align-items-center"
                  :to="{ name: 'userSurveyAdd' }"
                  active-class="active"
                >
                  <span class="me-1">📄</span>
                  <span class="text-nowrap">조사지신청</span>
                </RouterLink>
              </li>
            </ul>
          </div>

          <div
            class="text-center fw-bold text-nowrap mx-3 flex-grow-1 color-primary"
          >
            예담지원센터, 미나리님!
          </div>

          <div class="d-flex align-items-center text-nowrap">
            <span class="mx-2 cursor-pointer fw-bold text-sm text-dark-hover"
              >마이페이지</span
            >
            <span class="text-secondary opacity-5">|</span>
            <span class="mx-2 cursor-pointer fw-bold text-sm text-dark-hover"
              >로그아웃</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.min-w-900 {
  min-width: 900px;
}
.color-primary {
  color: #344767;
}

.custom-horizontal-menu {
  display: flex !important;
  gap: 8px;
}

.nav-link {
  background-color: #ffffff !important;
  color: #344767 !important;
  border: 1px solid #e9ecef;
  border-radius: 8px !important;
  font-size: 0.85rem;
  font-weight: 600;
  transition: all 0.2s ease;
}

.nav-link.active {
  background-color: #2d6a4f !important;
  color: #ffffff !important;
  border-color: #2d6a4f !important;
  box-shadow: 0 4px 6px rgba(45, 106, 79, 0.2);
}

.nav-link:hover:not(.active) {
  background-color: #f8f9fa !important;
  transform: translateY(-1px);
}

.text-dark-hover:hover {
  color: #2d6a4f;
}
</style>
