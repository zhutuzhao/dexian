<template>
  <div class="history">
    <main-title :title="title" />
    <div class="date">
      <span>时间：</span><span>最近30天</span><span>最近7天</span>
      <input type="datetime-local" name="" id="">
    </div>
  </div>
</template>

<script>
import MainTitle from "components/main_title/MainTitle.vue";
export default {
  name: "History",
  components: { MainTitle },
  data() {
    return {
      title: "历史信息",
    };
  },
};
</script>

<style scoped>
.history {
  margin-top: 20px;
  width: 1158px;
  height: 1187px;
  background: #ffffff;
}
</style>