<template>
  <div class="logo clear-fix">
    <div class="left logo_pinyin">Dexian</div>
    <div class="left">
      <div class="logo_chinese">得闲管理平台</div>
      <div class="out" @click="outClick">
        <img src="~assets/img/logo/logout_1.png" alt="" />
        <span>退出</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Logo",
  methods: {
    outClick() {
      localStorage.removeItem("Authorization");
      localStorage.removeItem("role");
      this.$router.push("/Login");
    },
  },
};
</script>
<style scoped>
.logo {
  position: relative;
  background-color: #fff;
  height: 112px;
  z-index: 999;
}
.logo .logo_pinyin {
  margin: 36px 41px 0 65px;
  width: 124px;
  font-size: 43px;
  font-family: Segoe UI Historic;
  font-weight: 400;
  color: #ff8900;
}

.logo .logo_pinyin::after {
  position: absolute;
  top: 112px;
  left: 40px;
  right: 19px;
  display: block;
  content: "";
  width: 171px;
  height: 1px;
  background: #dddddd;
  border-radius: 1px;
}
.logo .logo_chinese {
  margin: 41px 0 39px 26px;
  width: 193px;
  font-size: 32px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #333333;
}
.out {
  position: absolute;
  right: 40px;
  top: 48px;
  cursor: pointer;
}
.out img {
  width: 19px;
  height: 20px;
  vertical-align: middle;
}
.out span {
  padding: 2px 0px 2px 14px;
  width: 32px;
  height: 16px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #333333;
}
</style>