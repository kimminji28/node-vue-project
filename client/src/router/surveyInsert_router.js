export default [
  {
    //시스템관리자 조사지 생성 Router
    path: "/admin/surveyinsert",
    name: "adminSurveyInsert",
    component: () => import("../views/surveyInsert.vue"),
  },
];
