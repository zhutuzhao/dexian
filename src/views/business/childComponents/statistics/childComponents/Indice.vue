<template>
  <div class="indice">
    <main-title :title="title" />
    <div class="item_list">
      <div class="item">
        <div class="item_title">订单数</div>
        <div class="item_num">311</div>
      </div>
      <div class="item">
        <div class="item_title">票数</div>
        <div class="item_num">113</div>
      </div>
      <div class="item">
        <div class="item_title">浏览量</div>
        <div class="item_num">123</div>
      </div>
    </div>
  </div>
</template>

<script>
import MainTitle from "components/main_title/MainTitle.vue";
export default {
  name: "Indice",
  components: { MainTitle },
  data() {
    return {
      title: "核心指标",
    };
  },
};
</script>

<style scoped>
.indice {
  height: 242px;
  background: #fff;
}
.item_list {
  display: flex;
  margin-top: 36px;
}
.item {
  flex: 1;
  text-align: center;
}
.item_title {
  height: 19px;
  font-size: 18px;
  font-weight: 400;
  color: #333333;
}
.item_num {
  margin-top: 34px;
  height: 36px;
  font-size: 44px;
  font-weight: bold;
  color: #333333;
}
</style>