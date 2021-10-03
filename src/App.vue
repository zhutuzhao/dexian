<template>
  <div id="app">
    <router-view />
    <!-- <Login/> -->
  </div>
</template>

<script>
// import Login from "./views/login/Login.vue";

export default {
  name:"App",
  components:{
    // Login,
  }
}
</script>

<style>
@import "./assets/css/base.css";
#app {
  position: relative;
  width: 1440px;
  margin: 0 auto;
}
</style>
