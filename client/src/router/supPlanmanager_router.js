
export default [
  {
    path: "/manager/insertplan",
    name: "insertPlan",
    component: () => import("../views/supportPlanInsert.vue"),
    meta: {
      hideNavbar: true,
      hideSidenav: true
    }
  },
  {
    path: "/manager/planlist",
    name: "planList",
    component: () => import("../views/mngPlanList.vue"),
    meta: {
      hideNavbar: true,
      hideSidenav: true
    }
  }
];
