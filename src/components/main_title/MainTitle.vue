<template>
  <div class="title">
    <img src="~assets/img/business/indice_1.png" alt="" />
    <span>{{ title }}</span>
  </div>
</template>

<script>
export default {
  name: "MainTitle",
  props: {
    title: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped>
.title {
  padding-top: 20px;
  padding-left: 20px;
  height: 46px;
}
.title span {
  position: relative;
  margin-left: 13px;
  top: -6px;
  font-size: 20px;
  font-weight: bold;
  color: #333333;
}
</style>