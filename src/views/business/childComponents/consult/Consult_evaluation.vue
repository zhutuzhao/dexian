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
    <div class="consult">
      <div class="consult-item">
        <div class="activity_name">
          <span>活动</span>
          <span>广工交友活动</span>
        </div>
        <div class="ask_answer">
          <div class="ask">
            <span>问</span>
            <span class="item">活动可以晚一点到吗</span>
          </div>
          <div class="answer">
            <span>答</span>
            <span class="item">可以的</span>
          </div>
          <div class="option">
            <span class="reply">回复</span><span class="delete">删除</span>
          </div>
        </div>
      </div>
      <div class="consult-item">
        <div class="activity_name">
          <span>活动</span>
          <span>广工交友活动</span>
        </div>
        <div class="ask_answer">
          <div class="ask">
            <span>问</span>
            <span class="item">活动可以晚一点到吗</span>
          </div>
          <div class="answer">
            <span>答</span>
            <span class="item">可以的</span>
          </div>
          <div class="option">
            <span class="reply">回复</span><span class="delete">删除</span>
          </div>
        </div>
      </div>
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
.searchConsult {
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
.consult {
  /* position: relative; */
  width: 1118px;
  margin-top: 15px;
  margin-left: 20px;
}
.consult .consult-item {
  position: relative;
  padding-top: 18px;
}
.consult .consult-item:first-child::before {
  position: absolute;
  top: 0;
  content: "";
  display: block;
  width: 1118px;
  height: 2px;
  background: #dddddd;
}
.consult .consult-item::after {
  content: "";
  display: block;
  width: 1118px;
  height: 2px;
  background: #dddddd;
}
.activity_name {
  margin-left: 30px;
}
.activity_name span {
  margin-right: 16px;
  margin-bottom: 36px;
  height: 16px;
  font-size: 16px;
  font-weight: 400;
  color: #333333;
  cursor: pointer;
}
.activity_name span:first-child {
  font-weight: bold;
}
.ask_answer {
  margin-top: 36px;
  margin-left: 78px;
}
.ask_answer .ask > span:first-child,
.ask_answer .answer > span:first-child {
  margin-right: 12px;
  margin-bottom: 24px;
  display: inline-block;
  width: 30px;
  height: 30px;
  line-height: 30px;
  background: linear-gradient(120deg, #ffa200, #ff6700);
  border-radius: 6px;
  font-size: 16px;
  font-weight: 400;
  color: #ffffff;
  text-align: center;
}
.ask_answer .answer > span:first-child {
  margin-bottom: 20px;
}
.ask_answer .answer > span:first-child {
  background: linear-gradient(120deg, #28eeaa, #3bf366);
}
.ask_answer .ask .item,
.ask_answer .answer .item {
  height: 16px;
  font-size: 16px;
  font-weight: 400;
  color: #333333;
}
.ask_answer .option {
  position: absolute;
  right: 135px;
  top: 81px;
}
.ask_answer .option span {
  height: 17px;
  font-size: 16px;
  font-weight: 400;
}
.ask_answer .option .reply {
  margin-right: 28px;
  color: #333333;
}
.ask_answer .option .delete {
  color: #fa4040;
}
/* */
</style>