export default [
  {
    path: '/user/login',
    name: 'userLogin',
    component: () => import('../views/Signin.vue') //해당 path로 이동 시 출력될 component
  },
]