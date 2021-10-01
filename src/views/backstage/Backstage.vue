<template>
  <div>
    <logo />
    <main-nav :navs="backstage_nav" />
    <router-view />
  </div>
</template>

<script>
import { requst } from "network/requst.js";
import Logo from "../../components/logo/Logo.vue";
import MainNav from "../../components/mainNav/MainNav.vue";
export default {
  name: "Backstage",
  components: { Logo, MainNav },
  data() {
    return {
      backstage_nav: [
        {
          img: "https://i.bmp.ovh/imgs/2021/10/cb3b3bae4197d6f4.png",
          title: "统计",
          items: ["订单分析"],
          paths: ["/Backstage/Statistics_a_ba"],
        },
        {
          img: "https://s3.bmp.ovh/imgs/2021/10/76814ffdc9cc15de.png",
          title: "管理",
          items: ["用户管理", "前台管理", "活动管理", "订单管理"],
          paths: [
            "/Backstage/Manage_a_ba",
            "/Backstage/Manage_b_ba",
            "/Backstage/Manage_c_ba",
            "/Backstage/Manage_d_ba",
          ],
        },
        {
          img: "https://s3.bmp.ovh/imgs/2021/10/5c2e5213636c6fd3.png",
          title: "售后",
          items: ["意见反馈"],
          paths: ["/Backstage/Aftermarket_a"],
        },
        {
          img: "https://s3.bmp.ovh/imgs/2021/10/d9d70304908e34f9.png",
          title: "设置",
          items: ["账号权限"],
          paths: ["/Backstage/Settings_a_ba"],
        },
      ],
    };
  },
  mounted() {
    console.log("组件创建成功");
    requst({
      url: "api/web/login/in",
      method:'POST',
      data: {
        account: "LCE",
        password: "123456",
        role: "1",
      },
      headers: { 'Content-Type': "application/x-www-form-urlencoded" },
      // headers: { 'Content-Type': "application/json" },
      // dataType: "jsonp",
    });
    // requst({
    //   url: "http://47.119.112.252:8089//web/login/in",
    //   method:'POST',
    //   data: {
    //     account: "LCE",
    //     password: "123456",
    //     role: "1",
    //   },
    //   headers: { 'Content-Type': "application/x-www-form-urlencoded" },
    //   // headers: { 'Content-Type': "application/json" },
    //   // dataType: "jsonp",
    // });
  },
};
</script>

<style scoped>
</style>