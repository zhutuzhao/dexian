<template>
  <div class="ActivityInfo">
    <main-title title="活动详情" />
    <div class="details">
      <div class="backBefore" @click="backBefore">
        <img src="~assets/img/business/backBefore_1.png" alt="" />返回上一个页面
      </div>
      <div class="main_details">
        <img class="activity_pic" :src="mainInfo.posterImage" alt="" />
        <div class="items">
          <div>
            <span class="name">名称</span
            ><span class="value">{{ mainInfo.activityName }}</span>
          </div>
          <div>
            <span class="name">已报名人数</span
            ><span class="value">{{ mainInfo.registeredNumber }}</span>
          </div>
          <div>
            <span class="name">地点</span
            ><span class="value">{{ mainInfo.address }}</span>
          </div>
          <div>
            <span class="name">时间</span
            ><span class="value">{{ startDate }}</span>
          </div>
        </div>
      </div>
      <div class="introduct">
        <div class="title">活动简介</div>
        <div class="cotent">
          {{ mainInfo.lightSpot }}
        </div>
      </div>
    </div>
    <main-title title="活动信息" />
    <div class="infos">
      <div class="infoWrapper">
        <div class="view">
          <div>{{ mainInfo.clickRate }}</div>
          <div>浏览量</div>
        </div>
        <div class="apply">
          <div>{{ mainInfo.registeredNumber }}</div>
          <div>报名</div>
        </div>
        <div class="collect">
          <div>{{ mainInfo.attentionAmount }}</div>
          <div>收藏</div>
        </div>
      </div>
      <img class="collectPic" src="~assets/img/business/collect_1.png" alt="" />
      <div class="applyList">
        <div class="title">
          报名列表
          <div class="download" @click="download">
            <span>下载表格</span><img src="" alt="" />
          </div>
        </div>
        <div class="cotent">
          <table class="lists">
            <tr>
              <th>用户头像</th>
              <th>昵称</th>
              <th>姓名</th>
              <th>性别</th>
              <th>手机号</th>
              <th>票种名称</th>
              <th>金额（元）</th>
              <th>操作</th>
            </tr>
            <tr
              v-for="(item, index) in list"
              :key="index + Date.parse(new Date())"
            >
              <td class="image"><img :src="item[0].image" /></td>
              <td>
                <div class="nickname">
                  <span
                    v-for="(item_next, index) in item"
                    :key="index + Date.parse(new Date())"
                    >{{
                      item_next.nickname ? item_next.nickname : "关联者"
                    }}</span
                  >
                </div>
              </td>
              <td>
                <div class="name">
                  <span
                    v-for="(item_next, index) in item"
                    :key="index + Date.parse(new Date())"
                    >{{ item_next.name }}</span
                  >
                </div>
              </td>
              <td>
                <div class="gender">
                  <span
                    v-for="(item_next, index) in item"
                    :key="index + Date.parse(new Date())"
                    >{{ item_next.gender }}</span
                  >
                </div>
              </td>
              <td>
                <div class="phone">
                  <span
                    v-for="(item_next, index) in item"
                    :key="index + Date.parse(new Date())"
                    >{{ item_next.phone }}</span
                  >
                </div>
              </td>
              <td>
                <div class="ticketName">
                  <span
                    v-for="(item_next, index) in item"
                    :key="index + Date.parse(new Date())"
                    >{{ item_next.ticketName }}</span
                  >
                </div>
              </td>
              <td>
                <div class="ticketPrice">
                  <span
                    v-for="(item_next, index) in item"
                    :key="index + Date.parse(new Date())"
                    >{{ item_next.ticketPrice }}</span
                  >
                </div>
              </td>
              <td>
                <span class="checkTable">查看报名表</span
                ><span
                  class="backReply"
                  @click="registerCancel(item[0].mid, index)"
                  >退回报名</span
                >
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <!-- <to-page /> -->
    <to-page
      :pageTotal="pageTotal"
      :pageNow="pageNow"
      @toPageClick="toPage"
      @before="toPage"
      @after="toPage"
    />
  </div>
</template>

<script>
import {
  get_activity_details,
  register_cancel,
  downloadTable,
} from "network/business/business.js";
import MainTitle from "components/main_title/MainTitle.vue";
import ToPage from "components/toPage/ToPage.vue";
export default {
  name: "ActivityInfo",
  components: {
    MainTitle,
    ToPage,
  },
  data() {
    return {
      pageTotal: 1,
      pageNow: 1,
      id: "",
      mainInfo: {},
      list: [],
    };
  },
  methods: {
    backBefore() {
      console.log(this.$router);
      this.$router.back();
    },
    toPage(payload) {
      console.log(payload);
      this.pageNow = payload;
      this.getActivityDetails(this.id, payload);
    },
    getActivityDetails(id, page) {
      get_activity_details(id, page).then((res) => {
        console.log(res.data.data);
        this.mainInfo = res.data.data;
        this.list = res.data.data.formContentList.list;
        this.pageTotal = res.data.data.formContentList.pages;
      });
    },
    registerCancel(mid, index) {
      register_cancel(mid).then((res) => {
        console.log(res);
        if (res.data.data) {
          this.list.splice(index, 1);
        }
      });
    },
    downloadFile(resData) {
      const link = document.createElement("a");
      let blob = new Blob([resData], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
      });
      link.style.display = "none";
      link.href = URL.createObjectURL(blob);
      link.setAttribute("download", "下载文件.xlsx"); // 文件名可自定义
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    download() {
      downloadTable().then((res) => {
        // console.log(res);
        // // const b = new Blob([res.data]);
        // let b = new Blob([res.data], {
        //   type: "application/vnd.ms-excel;charset=utf-8",
        // });
        // const url = URL.createObjectURL(b);
        // const isFirefox =
        //   navigator.userAgent.toUpperCase().indexOf("FIREFOX") !== -1;
        // if (isFirefox) {
        //   window.open(url, "_blank");
        //   return null;
        // }
        // const link = document.createElement("a");
        // link.href = url;
        // link.download = `123.xls`;
        // link.style.display = "none";
        // document.body.appendChild(link);
        // link.click();
      });
    },
  },
  computed: {
    startDate() {
      let dateArr;
      if (this.mainInfo.startTime) {
        dateArr = this.mainInfo.startTime.split("-");
      } else {
        return;
      }
      return (
        dateArr[0] + "年" + dateArr[1] + "月" + dateArr[2].slice(0, 2) + "日"
      );
    },
  },
  mounted() {
    this.id = this.$route.params.activityId;
    this.getActivityDetails(this.id, 1);
  },
};
</script>

<style scoped>
.ActivityInfo {
  min-height: 1500px;
}
.details,
.infos {
  position: relative;
  padding-left: 50px;
}
.backBefore {
  display: flex;
  position: absolute;
  top: -20px;
  right: 20px;
  height: 30px;
  line-height: 30px;
  color: #ff8900;
  cursor: pointer;
}
.backBefore img {
  margin-right: 10px;
}
.activity_pic {
  margin-right: 100px;
  width: 214px;
  height: 134px;
}
.main_details {
  display: flex;
  align-items: center;
}
.main_details .items {
  display: flex;
  flex-direction: column;
  height: 192px;
}
.main_details .items > div {
  height: 50px;
  line-height: 50px;
}
.main_details .name {
  display: inline-block;
  width: 120px;
}
.introduct {
  margin-top: 80px;
}
.applyList .title,
.introduct .title {
  position: relative;
  font-size: 18px;
  color: #333333;
}
.applyList .title::before,
.introduct .title::before {
  position: relative;
  right: 9px;
  top: 18px;
  content: "";
  display: block;
  width: 4px;
  height: 16px;
  background: #ff8900;
  border-radius: 2px;
}
.introduct .cotent {
  margin-top: 30px;
  margin-bottom: 100px;
  width: 1024px;
}
.infoWrapper {
  height: 260px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.view,
.apply,
.collect {
  text-align: center;
}
.view > div:first-child,
.apply > div:first-child,
.collect > div:first-child {
  font-size: 42px;
  margin-bottom: 40px;
}
.collectPic {
  position: absolute;
  right: 40px;
  top: 5px;
}
.lists {
  width: 100%;
  text-align: center;
}
.lists tr {
  height: 90px;
}
.lists .image img {
  width: 76px;
  height: 76px;
  border-radius: 50%;
}
.lists .nickname span:not(:first-child) {
  font-size: 14px;
  color: #ff8900;
}

.lists .nickname,
.lists .name,
.lists .gender,
.lists .phone,
.lists .ticketName,
.lists .ticketPrice {
  height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  color: #666666;
}
.checkTable,
.backReply {
  cursor: pointer;
}
.checkTable {
  margin-right: 34px;
  font-size: 18px;
  color: #333333;
}
.backReply {
  font-size: 18px;
  color: #fa4040;
}
.download {
  position: absolute;
  right: 20px;
  top: 17px;
  color: #ff8e00;
  cursor: pointer;
}
</style>