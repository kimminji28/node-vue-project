export default [
  {
    //기관담당자 상담기록 등록 router
    path: "/manager/consultadd",
    name: "managerConsultAdd",
    component: () => import("../views/consultInsert.vue"),
    meta: { hideNavbar: true, hideSidenav: true }, // 이 페이지에서만 고정 상단바/사이드바 취소
  },
];
