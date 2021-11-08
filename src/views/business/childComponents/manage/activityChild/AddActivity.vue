<template>
  <div class="AddActivity">
    <activity-main ref="activity_main" />
    <ticket ref="ticket" />
    <base-info ref="base_info" />
    <div class="bottom_btn">
      <button @click="addActivityDraft">存草稿</button
      ><button @click="addActivity">提交</button>
    </div>
  </div>
  <!-- 
{
  "accountId": "商家账户id",
  "activityName": "活动名字",
  "startTime": "活动开始时间",
  "endTime": "活动结束时间",
  "registrationDeadline": "活动报名截止时间",
  "label": "标签",
  "lightSpot": "活动介绍",
  "address": "地点",
  "posterImage": "海报url",
  "activityDetails": "活动详情，富文本",
  "announcement": "活动须知",
  "linkmanCode": "联系人二维码",
  "groupCode": "活动群二维",
  "ticketList": [{
      "ticketType": "票的种类，0为免费，1为付费",
      "ticketName": "票的名字",
      "ticketPrice": "票的价格",
      "ticketNumber": "票的数量",
      "ticketInstructions": "票种说明",
      "ticketRefundType": "退款设置，0代表不可退款，1代表委托平台退款，2代表无条件退款",
      "ticketRefundReason": "不可退款原因，不可退款时必填"
  }],
  "webFormList": [{
      "isOptional": "0为必填，1为选填",
      "property": "选项名",
      "content": "单选、多选的内容",
      "propertyType": "类型，0为单行文本框，1为多行文本框，2为单项选择框，3为多项选择框，4为图片"
  }],
  "linkGzh": "公众号的链接",
  "videoUrl": "上传的视频"
}
   -->
</template>


<script>
import {
  add_activity,
  get_actInfo,
  add_activity_draft,
} from "network/business/business.js";

import ActivityMain from "./childComponents/ActivityMain.vue";
import BaseInfo from "./childComponents/BaseInfo.vue";
import Ticket from "./childComponents/Ticket.vue";

export default {
  name: "AddActivity",
  components: { ActivityMain, Ticket, BaseInfo },
  data() {
    return {
      id: "",
      allInfo: {},
      // main_info: {},
      // ticket_info: {},
      // base_info: {},
      allInfo_get: {}, //修改活动获取的原来的信息
    };
  },
  methods: {
    addActivity() {
      console.log("addActivity");
      this.getAllInfo();
      add_activity(this.allInfo).then((res) => {
        console.log(res);
        if (res.data.code == 200) {
          this.$router.push("/Business/Activity_manage_bs");
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    getActInfo(id) {
      get_actInfo(id).then((res) => {
        console.log(res);
        this.allInfo_get = res.data.data;
        this.$refs.ticket.ticketList = this.allInfo_get.tickets;
        // {
        //     "status": 1,
        //     "activityName": "CityWalk，行东山路，觅东山情",
        //     "startTime": "2022-02-10 08:00:00",
        //     "registerDeadLine": "2022-02-10 10:20:00",
        //     "endTime": "2022-02-11 16:00:00",
        //     "address": "广州地铁1号线东山口站E出口",
        //     "videoUrl": "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
        //     "posterImg": "https://quyou-1304036964.cos.ap-guangzhou.myqcloud.com/yiqipati/yiqipati_1607936100127131674.jpg",
        //     "linkManCode": "superdododi",
        //     "groupCode": "superdododi",
        //     "announcement": "因为我还没写校验输入内容啊",
        //     "activityDetail": "<img src='https://quyou-1304036964.cos.ap-guangzhou.myqcloud.com/yiqipati/yiqipati_1607937549780919316.jpg'  />",
        //     "linkGzh": null,
        //     "tickets": [
        //         {
        //             "ticketName": "早鸟票",
        //             "ticketNumber": 2493,
        //             "ticketPrice": 1,
        //             "ticketRemainNumber": 7,
        //             "ticketInstruction": "数量有限，先到先得0",
        //             "status": null,
        //             "refundType": 2,
        //             "refundReason": "无",
        //             "tid": 93
        //         },
        //         {
        //             "ticketName": "男生票",
        //             "ticketNumber": 60,
        //             "ticketPrice": 2,
        //             "ticketRemainNumber": 20,
        //             "ticketInstruction": "报名者仅限男生",
        //             "status": null,
        //             "refundType": 2,
        //             "refundReason": "无",
        //             "tid": 94
        //         },
        //         {
        //             "ticketName": "女生票",
        //             "ticketNumber": 30,
        //             "ticketPrice": 3,
        //             "ticketRemainNumber": 19,
        //             "ticketInstruction": "报名者仅限女生",
        //             "status": null,
        //             "refundType": 2,
        //             "refundReason": "无",
        //             "tid": 95
        //         }
        //     ],
        //     "aid": 89
        // }
      });
    },
    addActivityDraft() {
      console.log("addActivityDraft");
      this.getAllInfo();
      add_activity_draft(this.allInfo).then((res) => {
        console.log(res);
        if (res.data.code == 200) {
          this.$router.push("/Business/Activity_manage_bs");
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    getAllInfo() {
      console.log(this.allInfo);
      let ticketList = this.$refs.ticket.ticketList;
      let webFormList = [
        ...this.$refs.base_info.singleLine,
        ...this.$refs.base_info.multiline,
        ...this.$refs.base_info.singleChoice,
        ...this.$refs.base_info.multiChoice,
      ];
      this.allInfo = { ticketList, webFormList };
      Object.assign(this.allInfo, this.$refs.activity_main.main_info);
      console.log(this.allInfo);
    },
  },
  mounted() {
    if (this.$route.params.activityId) {
      this.id = this.$route.params.activityId;
      this.getActInfo(this.id);
    }
  },
};
</script>

<style scoped>
.AddActivity {
  padding-top: 15px;
  padding-left: 10px;
}
.bottom_btn {
  width: calc(100% + 10px);
  margin-left: -10px;
  padding: 52px 0;
  background-color: #f9f9f9;
  text-align: center;
}
button {
  margin-right: 115px;
  width: 115px;
  height: 44px;
  background: #ff7000;
  border-radius: 10px;
  outline: none;
  border: none;
  color: #fff;
  font-size: 22px;
  cursor: pointer;
}
</style>