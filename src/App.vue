<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
// import {requst} from "network/requst.js"
export default {
  name: "App",
  components: {},
  // mounted() {
  //   const xxdata = new FormData();
  //   xxdata.append("accountId", localStorage.getItem("id"));
  //   xxdata.append("startTime", "2019-12-02 00:00:00	");
  //   xxdata.append("endTime", "2021-12-02 00:00:00	");
  //   xxdata.append("pageNum", 1);
  //   xxdata.append("pageSize", 10);
  //   xxdata.append("status", 0);
  //   requst({
  //     url: `api/merchant/order/searchByTime`,
  //     method: "POST",
  //     data: xxdata,
  //   }).then((res) => {
  //     console.log(res);
  //     this.drawLine();
  //   });
  // },
};
</script>

<style>
@import "./assets/css/base.css";
/* 导入开发者自定义基础css */
#app {
  position: relative;
  width: 1440px;
  margin: 0 auto;
}
</style>
