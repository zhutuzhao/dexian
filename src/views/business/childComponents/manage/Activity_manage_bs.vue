<template>
  <div class="Activity_manage_bs main_item">
    <main-title title="活动管理" />
    <div class="header">
      <input class="searchByName" placeholder="请输入活动名称" type="text" />
      <el-date-picker
        class="selectDate"
        type="date"
        placeholder="请选择发起时间"
        format="yyyy年MM月dd日"
        value-format="yyyy-MM-dd HH:mm:ss"
        :clearable="false"
      >
      </el-date-picker>
      <div class="status">
        <span>状态</span>
        <select name="" id="">
          <option value="0">全部</option>
          <option value="1">上架</option>
          <option value="-1">下架</option>
        </select>
      </div>
      <div class="showNum">
        <span>每页显示</span>
        <select name="" id="">
          <option value="5">5</option>
        </select>
      </div>
      <button>搜索</button><button>新增</button>
    </div>
    <table class="body">
      <tr>
        <th>序号</th>
        <th>活动名称</th>
        <th>缩略图</th>
        <th>已报名</th>
        <th>发布时间</th>
        <th>活动时间</th>
        <th>状态（上下架）</th>
        <th>操作</th>
      </tr>
      <tr v-for="item in showNow" :key="item.activityId">
        <td>{{ item.activityId }}</td>
        <td class="activityName">{{ item.activityName }}</td>
        <td>
          <img class="thumbnail" :src="item.posterImage" alt="" />
        </td>
        <td>{{ item.number }}</td>
        <td class="time">{{ item.releaseTime }}</td>
        <td class="time">{{ item.startTime }}</td>
        <td>
          <img
            v-if="item.status == 1"
            class="show"
            src="~assets/img/business/show_on_1.png"
            alt=""
          /><img
            v-else
            class="show"
            src="~assets/img/business/show_off_1.png"
            alt=""
          />
        </td>
        <td class="option">
          <div class="clear-fix">
            <div class="left">
              <div class="change">修改</div>
              <div class="check">查看</div>
            </div>
            <div class="left"><div class="delete">删除</div></div>
          </div>
        </td>
      </tr>
      <tr></tr>
    </table>
    <to-page />
  </div>
</template>
<script>
import MainTitle from "components/main_title/MainTitle.vue";
import ToPage from "components/toPage/ToPage.vue";

import { get_activity_list } from "network/business/business.js";

export default {
  name: "Activity_manage_bs",
  components: { MainTitle, ToPage },
  data() {
    return {
      // isShow: 1,
      status: 0,
      upActivity: [],
      downActivity: [],
      allActivity: [],
      pageNow: 1, //toPage的当前页
      pageTotal: 1, //toPage的总页数
      showNum: 5, //展示数量
      showNow: [
        {
          activityId: 89,
          activityName: "CityWalk，行东山路，觅东山情",
          organizer: "随便取如若",
          posterImage:
            "https://quyou-1304036964.cos.ap-guangzhou.myqcloud.com/yiqipati/yiqipati_1607936100127131674.jpg",
          number: "14/45",
          releaseTime: "2021-10-15 09:30:00",
          startTime: "2022-02-10 08:00:00",
          status: -2,
        },
        {
          activityId: 153,
          activityName: "请求",
          organizer: "随便取如若",
          posterImage:
            "https://quyou-1304036964.cos.ap-guangzhou.myqcloud.com/yiqipati/yiqipati_1620645758166960787.jpg",
          number: "0/300",
          releaseTime: "2021-05-10 12:01:23",
          startTime: "2021-05-13 00:00:00",
          status: 1,
        },
        {
          activityId: 154,
          activityName: "q",
          organizer: "随便取如若",
          posterImage:
            "http://www.xinhuanet.com/photo/titlepic/112740/1127402419_1619875420580_title0h.jpg",
          number: "0/100",
          releaseTime: "2021-05-10 12:49:54",
          startTime: "2021-05-09 08:00:00",
          status: 2,
        },
        {
          activityId: 155,
          activityName: "上世纪四十",
          organizer: "随便取如若",
          posterImage:
            "https://quyou-1304036964.cos.ap-guangzhou.myqcloud.com/yiqipati/yiqipati_1620909551818639440.jpg",
          number: "0/300",
          releaseTime: "2021-05-13 12:40:12",
          startTime: "2021-05-16 00:00:00",
          status: 1,
        },
        {
          activityId: 156,
          activityName: "q",
          organizer: "随便取如若",
          posterImage:
            "http://www.xinhuanet.com/photo/titlepic/112740/1127402419_1619875420580_title0h.jpg",
          number: "0/100",
          releaseTime: "2021-05-14 07:32:34",
          startTime: "2021-05-09 08:00:00",
          status: 1,
        },
      ], //展示的活动
      // flag_get_all: 1, //获取所有活动的节流阀
      pageTotal_up: 1, //上架的总页数
      pageTotal_down: 1, //下架活动的总页数
      pageTotal_all: 1, //所有活动的总页数
    };
  },
  mounted() {
    // get_activity_list(this.status).then((res) => {
    //   console.log(res.data.data.list);
    //   // this.
    //   switch (this.status) {
    //     case 0:
    //       this.allActivity = res.data.data.list;
    //       this.showNow = this.allActivity.splice(0, 5);
    //       break;
    //     case 1:
    //       this.upActivity = res.data.data.list;
    //       this.showNow = this.upActivity.splice(0, 5);
    //       break;
    //     case -1:
    //       this.downActivity = res.data.data.list;
    //       this.showNow = this.downActivity.splice(0, 5);
    //       break;
    //     default:
    //       break;
    //   }
    // });
  },
};
</script>

<style scoped>
.Activity_manage_bs {
  width: 1158px;
  min-height: 736px;
  background: #ffffff;
}
.header {
  position: relative;
  margin-top: 23px;
  margin-left: 59px;
}
.searchByName {
  margin-right: 40px;
  width: 154px;
  height: 36px;
  border: 1px solid #999999;
  border-radius: 6px;
  outline: none;
  font-size: 16px;
  font-weight: 400;
  text-indent: 9px;
}
.selectDate {
  width: 154px;
  height: 36px;
  background: #ffffff;
  border-radius: 6px;
  /* border: 1px solid #999999; */
  /* border-color: #999; */
}
.header span {
  margin-right: 10px;
  font-size: 16px;
  font-weight: 400;
  color: #333333;
}
.header select {
  margin-right: 10px;
  height: 36px;
  background: #ffffff;
  border: 1px solid #999999;
  border-radius: 6px;
  outline: none;
}
.status select {
  text-indent: 10px;
  width: 78px;
}
.showNum select {
  text-indent: 15px;
  width: 68px;
}
.status {
  position: absolute;
  top: 0;
  left: 428px;
}
.showNum {
  position: absolute;
  top: 0;
  left: 580px;
  margin-right: 31px;
}
.header button {
  margin-right: 24px;
  width: 81px;
  height: 36px;
  background: #ff8e00;
  border-radius: 6px;
  font-size: 18px;
  font-weight: bold;
  color: #ffffff;
  border: none;
  outline: none;
  cursor: pointer;
}
.header button:first-of-type {
  margin-left: 435px;
}
.body {
  text-align: center;
  width: 1118px;
  margin-left: 20px;
  padding-left: 30px;
  padding-top: 15px;
}
.body tr:first-child {
  height: 75px;
}
.body tr:not(:first-child) {
  /* padding: 100px; */
  position: relative;
  border-top: 1px solid #ddd;
  height: 120px;
}
.body tr:not(:first-child)::after {
  position: absolute;
  content: "";
  display: block;
  width: 1118px;
  height: 1px;
  background: #dddddd;
  /* top: 32px; */
  left: -20px;
}
.body tr .time {
  padding-left: 25px;
  width: 130px;
  text-align: left;
}
.thumbnail {
  width: 89px;
  height: 56px;
}
.activityName {
  width: 150px;
}
.show {
  cursor: pointer;
}
.option .clear-fix {
  /* padding-left: 50px; */
  /* text-align: right; */
  position: relative;
  left: 50px;
}
.option .change,
.option .check,
.option .delete {
  cursor: pointer;
}
.option .change {
  margin-bottom: 22px;
}
.option .delete {
  margin-left: 39px;
  margin-top: 20px;
  color: #fa4040;
}
/* 

 */
</style>