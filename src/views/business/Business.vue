<template>
  <div class="Business">
    <logo></logo>
    <main-nav :navs="business_nav" />
    <router-view />
  </div>
</template>

<script>
import Logo from "components/logo/Logo.vue";
import MainNav from "components/mainNav/MainNav.vue";
export default {
  name: "Business",
  components: {
    Logo,
    MainNav,
  },
  data() {
    return {
      business_nav: [//传入导航栏信息
        {
          img: "https://i.bmp.ovh/imgs/2021/10/cb3b3bae4197d6f4.png",
          title: "统计",
          items: ["数据分析"],
          paths: ["/Business/Statistics_a"],
        },
        {
          img: "https://s3.bmp.ovh/imgs/2021/10/76814ffdc9cc15de.png",
          title: "管理",
          items: ["财务管理", "活动管理"],
          paths: ["/Business/Manage_a", "/Business/Manage_b"],
        },
        {
          img: "https://s3.bmp.ovh/imgs/2021/10/5c2e5213636c6fd3.png",
          title: "咨询",
          items: ["咨询评价"],
          paths: ["/Business/Consult_a"],
        },
        {
          img: "https://s3.bmp.ovh/imgs/2021/10/d9d70304908e34f9.png",
          title: "设置",
          items: ["账号管理"],
          paths: ["/Business/Settings_a"],
        },
      ],
    };
  },
};
</script>

<style scoped>
/* .nav {
  position: absolute;
  background-color: #fff;
  height: 900px;
  width: 230px;
  left: 0;
}
.nav_title {
  height: 32px;
  line-height: 32px;
  margin-top: 54px;
  margin-left: 41px;
}
.nav_title span {
  display: inline-block;
  margin-left: 21px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #333333;
}
.nav_title img {
  vertical-align: middle;
  width: 32px;
}
.nav_item {
  margin-left: 94px;
  margin-top: 40px;
  width: 64px;
  height: 17px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #333333;
}
.nav_item.active {
  margin-left: 57px;
  margin-top: 18px;
  width: 173px;
  height: 47px;
  line-height: 47px;
  text-indent: 37px;
  background: #ff8900;
  border-radius: 24px 0px 0px 24px;
  font-size: 18px;
  color: #fffefe;
} */
</style>