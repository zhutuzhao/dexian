<template>
  <div class="indice">
    <div class="title">
      <img src="~assets/img/Data_statistics/indice_1.png" alt="" />
      <span>核心指标</span>
    </div>
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
export default {
    name:'Indice'
};
</script>

<style scoped>
.indice {
  height: 242px;
  background: #fff;
}
.indice .title {
  padding-top: 20px;
  padding-left: 20px;
  height: 46px;
}

.indice .title span {
  position: relative;
  margin-left: 13px;
  top: -6px;
  font-size: 20px;

  font-weight: bold;
  color: #333333;
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