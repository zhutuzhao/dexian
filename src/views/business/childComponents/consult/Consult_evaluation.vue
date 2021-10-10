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
    <div v-show="isActive == 'allReply'" class="searchConsult">
      <input placeholder="请输入活动名称或问题关键词" type="text" /><button>
        搜索
      </button>
    </div>
    <div class="consult">
      <div v-for="item in showNow" :key="item.id" class="consult-item">
        <div class="activity_name">
          <span>活动</span>
          <span>{{ item.activityName }}</span>
        </div>
        <div class="ask_answer">
          <div class="ask">
            <span>问</span>
            <span class="item">{{ item.question }}</span>
          </div>
          <div class="answer">
            <span>答</span>
            <span class="item">{{ item.reply }}</span>
          </div>
          <div class="option">
            <span class="reply">回复</span><span class="delete">删除</span>
          </div>
          <div class="show">
            <span>显示</span
            ><img
              v-if="item.show"
              src="~assets/img/business/show_on_1.png"
              alt=""
            /><img v-else src="~assets/img/business/show_off_1.png" alt="" />
          </div>
        </div>
      </div>
    </div>
    <to-page :pageTotal="pageTotal" :pageNow="pageNow" @toPageClick="toPage" />
  </div>
</template>
<script>
import ToPage from "components/toPage/ToPage.vue";

import { get_all, get_no_reply } from "network/business/business.js";

export default {
  components: { ToPage },
  name: "Consult_evaluation",
  data() {
    return {
      isActive: "noReply",
      no_reply_consult: [], //未回复咨询
      all_consult: [], //所有咨询
      pageNow: 1, //toPage的当前页
      pageTotal: 1, //toPage的总页数
      showNum: 2, //展示数量
      showNow: [], //展示的咨询
      flag_get_all: 1, //获取所有咨询的节流阀
      pageTotal_no_reply: 1, //未回复的总页数
      pageTotal_all: 1, //所有咨询的总页数
    };
  },
  methods: {
    typeClick(type) {
      //切换
      this.isActive = type;
      if (type == "allReply") {
        //所有咨询
        if (this.flag_get_all) {
          //所有咨询是否已经请求过了
          get_all().then((res) => {
            this.all_consult = res.data.data;
            this.showNow = this.all_consult.slice(0, 2);
            this.pageTotal_all = this.pageTotal =
              this.all_consult.length / this.showNum;
            this.flag_get_all = 0;
          });
        } else {
          this.showNow = this.all_consult.slice(0, 2);
          this.pageTotal = this.pageTotal_all; //重置toPage
        }
      } else {
        //未回复咨询
        this.showNow = this.no_reply_consult.slice(0, 2);
        this.pageTotal = this.pageTotal_no_reply; //重置toPage
      }
      this.pageNow = 1; //重置toPage
    },
    toPage(pageInput) {
      this.pageNow = pageInput;
      this.isActive == "noReply"
        ? (this.showNow = this.no_reply_consult.slice(
            (pageInput - 1) * this.showNum,
            (pageInput - 1) * this.showNum - -2
          ))
        : (this.showNow = this.all_consult.slice(
            (pageInput - 1) * this.showNum,
            (pageInput - 1) * this.showNum - -2
          ));
    },
  },
  mounted() {
    get_no_reply().then((res) => {
      //请求未回复的咨询
      this.no_reply_consult = res.data.data;
      this.showNow = this.no_reply_consult.slice(0, 2);
      this.pageTotal_no_reply = this.pageTotal =
        this.no_reply_consult.length / this.showNum;
    });
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
  cursor: pointer;
}
.ask_answer .option .reply {
  margin-right: 28px;
  color: #333333;
}
.ask_answer .option .delete {
  color: #fa4040;
}
.show {
  position: absolute;
  right: 0;
  top: 22px;
}
.show span {
  height: 16px;
  font-size: 16px;
  font-weight: 400;
  color: #333333;
}
.show img {
  margin-left: 13px;
  vertical-align: middle;
  cursor: pointer;
}
/* */
</style>