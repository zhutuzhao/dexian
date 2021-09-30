import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
const Business  = ()=>import('../views/business/Business.vue')
const Backstage  = ()=>import('../views/backstage/Backstage.vue')
const Login  = ()=>import('../views/login/Login.vue')
const routes = [
  {
    path: "",
    // redirect: "/Login",
    redirect: "/Business",
  },
  {
    path:'/Login',
    component:Login
  },
  {
    path:'/Business',
    component:Business
  },
  {
    path:'/Backstage',
    component:Backstage
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
