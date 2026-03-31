
export default [
  {
    path: "/manager/insertplan",
    name: "insertPlan",
    component: () => import("../views/supportPlanInsert.vue"),
  },
  {
    path : "/manager/planlist",
    name : "planList",
    component : () => import("../views/mngPlanList.vue"),
  }
];
