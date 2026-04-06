// src/router/admin_institution_router.js

export default [
  {
    path: "/admin",
    name: "adminInstitutionList",
    component: () => import("../views/components/AdminInstitutionList.vue"),
    meta: { hideNavbar: true },
  },
  // 시스템 관리자 - 기관 등록 페이지
  {
    path: "/admin/institution/register",
    name: "adminInstitutionRegister",
    // 🚨 views 폴더에 만든 실제 Vue 파일 이름으로 맞춰주세요!
    component: () => import("../views/components/AdminInstitutionRegister.vue"),
    // 관리자 페이지이므로 기존 코드처럼 네비게이션 바를 숨깁니다.
    meta: { hideNavbar: true },
  },
  {
    path: "/admin/institution/edit/:id",
    name: "adminInstitutionEdit",
    component: () => import("../views/components/AdminInstitutionEdit.vue"),
    meta: { hideNavbar: true },
  },
];
