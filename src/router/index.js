import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
const Business = () => import("views/business/Business.vue");
const Backstage = () => import("views/backstage/Backstage.vue");
const Login = () => import("views/login/Login.vue");
// business
const Consult_a = () =>
  import("views/business/childComponents/consult/Consult_a.vue");
const Manage_a = () =>
  import("views/business/childComponents/manage/Manage_a.vue");
const Manage_b = () =>
  import("views/business/childComponents/manage/Manage_b.vue");
const Settings_a = () =>
  import("views/business/childComponents/settings/Settings_a.vue");
const Statistics_a = () =>
  import("views/business/childComponents/statistics/Statistics_a.vue");
// backstage
const Aftermarket_a = () =>
  import("views/backstage/childComponents/aftermarket/Aftermarket_a.vue");
const Manage_a_ba = () =>
  import("views/backstage/childComponents/manage/Manage_a.vue");
const Manage_b_ba = () =>
  import("views/backstage/childComponents/manage/Manage_b.vue");
const Manage_c_ba = () =>
  import("views/backstage/childComponents/manage/Manage_c.vue");
const Manage_d_ba = () =>
  import("views/backstage/childComponents/manage/Manage_d.vue");
const Settings_a_ba = () =>
  import("views/backstage/childComponents/settings/Settings_a.vue");
const Statistics_a_ba = () =>
  import("views/backstage/childComponents/statistics/Statistics_a.vue");

const routes = [
  {
    path: "",
    redirect: "/Login",
  },
  {
    path: "/Login",
    component: Login,
  },
  {
    path: "/Business",
    name: "Business",
    component: Business,
    children: [
      {
        path: "Consult_a",
        name: "Consult_a",
        component: Consult_a,
      },
      {
        path: "Manage_a",
        name: "Manage_a",
        component: Manage_a,
      },
      {
        path: "Manage_b",
        name: "Manage_b",
        component: Manage_b,
      },
      {
        path: "Settings_a",
        name: "Settings_a",
        component: Settings_a,
      },
      {
        path: "Statistics_a",
        name: "Statistics_a",
        component: Statistics_a,
      },
    ],
  },
  {
    path: "/Backstage",
    name: "Backstage",
    component: Backstage,
    children: [
      {
        path: "Aftermarket_a",
        name: "Aftermarket_a",
        component: Aftermarket_a,
      },
      {
        path: "Manage_a_ba",
        name: "Manage_a_ba",
        component: Manage_a_ba,
      },
      {
        path: "Manage_b_ba",
        name: "Manage_b_ba",
        component: Manage_b_ba,
      },
      {
        path: "Manage_c_ba",
        name: "Manage_c_ba",
        component: Manage_c_ba,
      },
      {
        path: "Manage_d_ba",
        name: "Manage_d_ba",
        component: Manage_d_ba,
      },
      {
        path: "Settings_a_ba",
        name: "Settings_a_ba",
        component: Settings_a_ba,
      },
      {
        path: "Statistics_a_ba",
        name: "Statistics_a_ba",
        component: Statistics_a_ba,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  if (to.path === "/Login") {
    next();
  } else {
    let token = localStorage.getItem("Authorization");
    let role = localStorage.getItem("role");
    if (token === null || token === "") {
      next("/Login");
    } else {
      if (role == "1") {
        to.path.indexOf("/Business") == -1 ? next("/Business") : next();
      } else {
        to.path.indexOf("/Backstage") == -1 ? next("/Backstage") : next();
      }
    }
  }
});
export default router;
