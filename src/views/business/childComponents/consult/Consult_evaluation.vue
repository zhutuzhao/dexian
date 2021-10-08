<template>
  <div class="Consult_evaluation main_item">
    <div class="type">
      <span
        @click="typeClick('noReply')"
        :class="{ active: isActive == 'noReply' }"
        >未回复咨询</span
      >
      <span
        @click="typeClick('allReply')"
        :class="{ active: isActive == 'allReply' }"
        >全部咨询</span
      >
    </div>
    <div class="searchConsult">
      <input placeholder="请输入活动名称或问题关键词" type="text" /><button>
        搜索
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: "Consult_evaluation",
  data() {
    return {
      isActive: "noReply",
    };
  },
  methods: {
    typeClick(type) {
      this.isActive = type;
    },
  },
};
</script>

<style scoped>
.Consult_evaluation {
  width: 1158px;
  height: 736px;
  background: #ffffff;
}
.type {
  margin-top: 20px;
  margin-left: 19px;
  margin-bottom: 42px;
}
.type span {
  margin-right: 41px;
  height: 18px;
  font-size: 18px;
  font-weight: 400;
  color: #666666;
  cursor: pointer;
}
.type span.active {
  position: relative;
  height: 20px;
  font-size: 20px;
  color: #ff8900;
}
.type span.active::after {
  content: "";
  display: block;
  position: absolute;
  bottom: -9px;
  left: 50%;
  transform: translateX(-50%);
  background: #ff8900;
  border-radius: 2px;
  width: 40px;
  height: 4px;
}
.searchConsult{
  margin-left: 20px;
  margin-top: 42px;
}
.searchConsult input {
  padding-left: 10px;
  margin-right: 20px;
  width: 271px;
  height: 34px;
  background: #f5f5f5;
  border: 1px solid #999999;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
}
.searchConsult button {
  width: 67px;
  height: 34px;
  background: #ff8900;
  border-radius: 4px;
  outline: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  font-weight: 400;
  color: #ffffff;
}
/* */
</style>