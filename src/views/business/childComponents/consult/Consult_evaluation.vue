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
      <input
        ref="search_content"
        placeholder="请输入活动名称或问题关键词"
        type="text"
      /><button @click="searchClick">搜索</button>
    </div>
    <div class="consult">
      <div
        v-for="item in showNow"
        :key="item.id"
        class="consult-item"
        :consult_id="item.id"
        :index="item.index"
      >
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
            <span class="reply" @click="replyBoxShow(item.id, item.index)"
              >回复</span
            ><span class="delete" @click="delete_consult">删除</span>
          </div>
          <div class="show">
            <span>显示</span
            ><img
              v-if="item.show"
              src="~assets/img/business/show_on_1.png"
              alt=""
              @click="showClick"
            /><img
              v-else
              src="~assets/img/business/show_off_1.png"
              alt=""
              @click="showClick"
            />
          </div>
        </div>
      </div>
    </div>
    <to-page
      :pageTotal="pageTotal"
      :pageNow="pageNow"
      @toPageClick="toPage"
      @before="toPage"
      @after="toPage"
    />
    <div v-if="isOnReply" class="wrapper">
      <div class="reply_box">
        <div class="title">回复</div>
        <textarea ref="textBox" class="textBox" placeholder="请输入"></textarea>
        <button class="cancel" @click="isOnReply = 0">取消</button
        ><button class="determine" @click="replyConsult">确定</button>
      </div>
    </div>
  </div>
</template>
<script>
import ToPage from "components/toPage/ToPage.vue";

import {
  get_all,
  get_no_reply,
  show_consult,
  delete_consult,
  search_consult,
  reply_consult,
} from "network/business/business.js";

export default {
  components: { ToPage },
  name: "Consult_evaluation",
  data() {
    return {
      isActive: "noReply",
      no_reply_consult: [], //未回复咨询
      all_consult: [], //所有咨询
      search_consult: [], //所有搜索咨询
      pageNow: 1, //toPage的当前页
      pageTotal: 1, //toPage的总页数
      showNum: 2, //展示数量
      showNow: [], //展示的咨询
      flag_get_all: 1, //获取所有咨询的节流阀
      pageTotal_no_reply: 1, //未回复的总页数
      pageTotal_all: 1, //所有咨询的总页数
      pageTotal_search: 1, //所有搜索咨询的总页数
      isOnSearch: 0, //是否处于搜索的内容
      isOnReply: 0, //是否是处于回复状态
      reply_consult_id: -1, //回复评论的id
      reply_consult_index: -1, //回复评论的index
      isChange: 0, //数据是否已经发生改变
    };
  },
  methods: {
    typeClick(type) {
      //切换
      this.isActive = type;
      if (this.isChange) {
        console.log("数据已经发生改变");
        this.isChange = 0;
        if (type == "allReply") {
          this.flag_get_all = 0;
          this.getAllConsult();
        } else {
          this.getNoConsult();
        }
      }
      if (type == "allReply") {
        //所有咨询
        if (this.flag_get_all) {
          //所有咨询是否已经请求过了
          this.getAllConsult();
        } else {
          this.showNow = this.all_consult.slice(0, 2);
          this.pageTotal = this.pageTotal_all; //重置toPage
        }
      } else {
        //未回复咨询
        this.showNow = this.no_reply_consult.slice(0, 2);
        this.pageTotal = this.pageTotal_no_reply; //重置toPage
      }
      this.isOnSearch = 0;
      this.$refs.search_content.value = "";
      this.pageNow = 1; //重置toPage
    },
    toPage(pageInput) {
      this.pageNow = pageInput;
      this.showNow =
        this.isActive == "noReply"
          ? this.getShowList(this.no_reply_consult)
          : this.isOnSearch
          ? this.getShowList(this.search_consult)
          : this.getShowList(this.all_consult);
    },
    showClick(e) {
      //是否展示该条咨询
      let consult_id = e.path[3].attributes.consult_id.nodeValue;
      show_consult(consult_id).then((res) => {
        let index = e.path[3].attributes.index.nodeValue;
        if (this.isActive == "noReply") {
          this.no_reply_consult[index].show =
            this.no_reply_consult[index].show == 1 ? 0 : 1;
        } else {
          if (this.isOnSearch) {
            this.search_consult[index].show =
              this.search_consult[index].show == 1 ? 0 : 1;
          } else {
            this.all_consult[index].show =
              this.all_consult[index].show == 1 ? 0 : 1;
          }
        }
        this.isChange = 1;
      });
    },
    delete_consult(e) {
      let consult_id = e.path[3].attributes.consult_id.nodeValue;
      let index = e.path[3].attributes.index.nodeValue;
      delete_consult(consult_id).then((res) => {
        console.log(res);
        if (!res) return;
        if (this.isActive == "noReply") {
          this.no_reply_consult.splice(index, 1);
          this.toPage(this.pageNow);
          this.pageTotal_no_reply = this.pageTotal =
            this.no_reply_consult.length / this.showNum;
        } else {
          if (this.isOnSearch) {
            this.search_consult.splice(index, 1);
            this.toPage(this.pageNow);
            this.pageTotal_search = this.pageTotal =
              this.search_consult.length / this.showNum;
          } else {
            this.all_consult.splice(index, 1);
            this.toPage(this.pageNow);
            this.pageTotal_all = this.pageTotal =
              this.all_consult.length / this.showNum;
          }
        }
        this.isChange = 1;
      });
    },
    searchClick() {
      this.isOnSearch = 1;
      let value = this.$refs.search_content.value;
      if (value) {
        console.log(value);
        search_consult(value).then((res) => {
          console.log(res.data.data);
          this.search_consult = res.data.data.map((item, index) => {
            item.index = index;
            return item;
          });
          this.showNow = this.search_consult.slice(0, 2);
          this.pageNow = 1;
          this.pageTotal_search = this.pageTotal =
            this.search_consult.length / this.showNum;
        });
      }
      // this.$refs.search_content.value = "";
    },
    replyConsult() {
      reply_consult(this.reply_consult_id, this.$refs.textBox.value).then(
        (res) => {
          if (this.isActive == "noReply") {
            this.no_reply_consult[this.reply_consult_index].reply =
              this.$refs.textBox.value;
          } else {
            if (this.isOnSearch) {
              this.search_consult[this.reply_consult_index].reply =
                this.$refs.textBox.value;
            } else {
              this.all_consult[this.reply_consult_index].reply =
                this.$refs.textBox.value;
            }
          }
          this.isOnReply = 0;
          this.isChange = 1;
        }
      );
    },
    replyBoxShow(consult_id, index) {
      this.reply_consult_id = consult_id;
      this.reply_consult_index = index;
      this.isOnReply = 1;
    },
    getAllConsult() {
      get_all().then((res) => {
        //请求所有咨询
        this.all_consult = res.data.data.map((item, index) => {
          item.index = index;
          return item;
        });
        this.showNow = this.all_consult.slice(0, 2);
        this.pageTotal_all = this.pageTotal =
          this.all_consult.length / this.showNum;
        this.flag_get_all = 0;
      });
    },
    getNoConsult() {
      get_no_reply().then((res) => {
        //请求未回复的咨询
        this.no_reply_consult = res.data.data.map((item, index) => {
          item.index = index;
          return item;
        });
        this.showNow = this.no_reply_consult.slice(0, 2);
        this.pageTotal_no_reply = this.pageTotal =
          this.no_reply_consult.length / this.showNum;
      });
    },
    getShowList(arr) {
      return arr
        .map((item, index) => {
          item.index = index;
          return item;
        })
        .slice(
          (this.pageNow - 1) * this.showNum,
          (this.pageNow - 1) * this.showNum - -2
        );
    },
  },
  mounted() {
    this.isOnSearch = 0;
    this.getNoConsult();
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
.wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 99999;
}
.reply_box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding-left: 32px;
  width: 487px;
  height: 334px;
  background: #ffffff;
  border: 2px solid #d7d7d7;
  box-shadow: 0px 3px 15px 3px rgba(0, 0, 0, 0.03);
  border-radius: 4px;
}
.reply_box .title {
  margin: 22px 0 32px 0;
  height: 18px;
  font-size: 18px;
  font-weight: bold;
  color: #333333;
}
.reply_box .title::after {
  position: relative;
  top: 20px;
  left: -10px;
  content: "";
  display: block;
  width: 443px;
  height: 2px;
  background: #dddddd;
}
.reply_box .textBox {
  width: 423px;
  height: 166px;
  padding: 8px 10px;
  border: 1px solid #dddddd;
  resize: none;
  outline: none;
}
.reply_box button {
  margin-top: 32px;
  width: 62px;
  height: 29px;
  border: none;
  border-radius: 4px;
  font-size: 15px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #ffffff;
  outline: none;
  cursor: pointer;
}
.reply_box .cancel {
  margin-left: 117px;
  margin-right: 66px;
  background: #999999;
}
.reply_box .determine {
  background: #ff7000;
}
/*

      
 */
</style>