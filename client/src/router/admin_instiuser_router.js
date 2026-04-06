// D:\node-vue-project\client\src\router\admin_instiuser_router.js

export default [
  // 시스템 관리자 - 기관소속원(관리자/담당자) 목록 및 승인 페이지
  {
    path: "/admin/instiuser/list",
    name: "adminInstiUserList",
    // 🚨 파일 이름이 AdminInstiUserList.vue 라고 가정했습니다!
    component: () => import("../views/components/AdminInstiUserList.vue"),
    meta: { hideNavbar: true },
  },

  // (추후 소속원 상세/수정 페이지를 만든다면 여기에 추가)
  // {
  //   path: "/admin/instiuser/edit/:id",
  //   name: "adminInstiUserEdit",
  //   component: () => import("../views/components/AdminInstiUserEdit.vue"),
  //   meta: { hideNavbar: true },
  // }
];
