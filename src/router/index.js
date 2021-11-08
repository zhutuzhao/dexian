import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
const Business = () => import("views/business/Business.vue");
const Backstage = () => import("views/backstage/Backstage.vue");
const Login = () => import("views/login/Login.vue");
// business
const Consult_evaluation = () =>
  import("views/business/childComponents/consult/Consult_evaluation.vue");
const Financial_manage = () =>
  import("views/business/childComponents/manage/Financial_manage.vue");
const Activity_manage_bs = () =>
  import("views/business/childComponents/manage/Activity_manage_bs.vue");
const Account_settings = () =>
  import("views/business/childComponents/settings/Account_settings.vue");
const Data_statistics = () =>
  import("views/business/childComponents/statistics/Data_statistics.vue");
const Add_activity = () =>
  import("views/business/childComponents/manage/activityChild/AddActivity.vue");
const Activity_info = () =>
  import(
    "views/business/childComponents/manage/activityChild/ActivityInfo.vue"
  );
// backstage
const Aftermarket_feedback = () =>
  import(
    "views/backstage/childComponents/aftermarket/Aftermarket_feedback.vue"
  );
const User_manage = () =>
  import("views/backstage/childComponents/manage/User_manage.vue");
const Front_manage = () =>
  import("views/backstage/childComponents/manage/Front_manage.vue");
const Activity_manage_ba = () =>
  import("views/backstage/childComponents/manage/Activity_manage_ba.vue");
const Order_manage = () =>
  import("views/backstage/childComponents/manage/Order_manage.vue");
const Settings_limits = () =>
  import("views/backstage/childComponents/settings/Settings_limits.vue");
const Order_statistics = () =>
  import("views/backstage/childComponents/statistics/Order_statistics.vue");

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
        path: "Consult_evaluation",
        name: "Consult_evaluation",
        component: Consult_evaluation,
      },
      {
        path: "Financial_manage",
        name: "Financial_manage",
        component: Financial_manage,
      },
      {
        path: "Activity_manage_bs",
        name: "Activity_manage_bs",
        component: Activity_manage_bs,
        children: [
          {
            path: "Update_activity/:activityId",
            name: "Update_activity",
            component: Add_activity,
          },
          {
            path: "Add_activity",
            name: "Add_activity",
            component: Add_activity,
          },
          {
            path: "Activity_info/:activityId",
            name: "Activity_info",
            component: Activity_info,
          },
        ],
      },
      {
        path: "Account_settings",
        name: "Account_settings",
        component: Account_settings,
      },
      {
        path: "Data_statistics",
        name: "Data_statistics",
        component: Data_statistics,
      },
      // {
      //   path: "Add_activity",
      //   name: "Add_activity",
      //   component: Add_activity,
      // },
    ],
  },
  {
    path: "/Backstage",
    name: "Backstage",
    component: Backstage,
    children: [
      {
        path: "Aftermarket_feedback",
        name: "Aftermarket_feedback",
        component: Aftermarket_feedback,
      },
      {
        path: "User_manage",
        name: "User_manage",
        component: User_manage,
      },
      {
        path: "Front_manage",
        name: "Front_manage",
        component: Front_manage,
      },
      {
        path: "Activity_manage_ba",
        name: "Activity_manage_ba",
        component: Activity_manage_ba,
      },
      {
        path: "Order_manage",
        name: "Order_manage",
        component: Order_manage,
      },
      {
        path: "Settings_limits",
        name: "Settings_limits",
        component: Settings_limits,
      },
      {
        path: "Order_statistics",
        name: "Order_statistics",
        component: Order_statistics,
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
        //判断登录者信息，如果商家就不能访问后台界面
        to.path.indexOf("/Business") == -1
          ? next("/Business/Data_statistics")
          : next();
      } else {
        to.path.indexOf("/Backstage") == -1
          ? next("/Backstage/Order_statistics")
          : next();
      }
    }
  }
});
export default router;
