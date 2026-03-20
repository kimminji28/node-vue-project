export default [
  {
    //일반 사용자 회원가입
    path: '/user/signup',
    name: 'userSignup',
    component: () => import('../views/Signup.vue') //해당 path로 이동 시 출력될 component
  },
  {
    //기관 사용자 회원가입
    path: '/insti/signup',
    name: 'instiSignup',
    component: () => import('../views/Signup.vue') //해당 path로 이동 시 출력될 component
  },
]