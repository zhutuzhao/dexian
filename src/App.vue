<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name:"App",
  components:{
  }
}
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
