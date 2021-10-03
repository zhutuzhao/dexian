<template>
  <div>
    <logo />
    <main-nav :navs="backstage_nav" />
    <router-view />
  </div>
</template>

<script>
import Logo from "components/logo/Logo.vue";
import MainNav from "components/mainNav/MainNav.vue";
export default {
  name: "Backstage",
  components: { Logo, MainNav },
  data() {
    return {
      backstage_nav: [//传入导航栏信息
        {
          img: "https://i.bmp.ovh/imgs/2021/10/cb3b3bae4197d6f4.png",
          title: "统计",
          items: ["订单分析"],
          paths: ["/Backstage/Order_statistics"],
        },
        {
          img: "https://s3.bmp.ovh/imgs/2021/10/76814ffdc9cc15de.png",
          title: "管理",
          items: ["用户管理", "前台管理", "活动管理", "订单管理"],
          paths: [
            "/Backstage/User_manage",
            "/Backstage/Front_manage",
            "/Backstage/Activity_manage_ba",
            "/Backstage/Order_manage",
          ],
        },
        {
          img: "https://s3.bmp.ovh/imgs/2021/10/5c2e5213636c6fd3.png",
          title: "售后",
          items: ["意见反馈"],
          paths: ["/Backstage/Aftermarket_feedback"],
        },
        {
          img: "https://s3.bmp.ovh/imgs/2021/10/d9d70304908e34f9.png",
          title: "设置",
          items: ["账号权限"],
          paths: ["/Backstage/Settings_limits"],
        },
      ],
    };
  },
  mounted() {},
};
</script>

<style scoped>
</style>