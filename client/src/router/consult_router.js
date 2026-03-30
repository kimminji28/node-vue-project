export default [
  {
    //기관담당자 상담기록 리스트 조회 router
    path: "/manager/consult",
    name: "managerConsult",
    component: () => import("../views/consultRecord.vue"),
    meta: { hideNavbar: true, hideSidenav: true }, // 이 페이지에서만 고정 상단바/사이드바 취소
  },
];
