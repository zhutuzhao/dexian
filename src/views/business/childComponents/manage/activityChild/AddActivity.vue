<template>
  <div class="AddActivity">
    <activity-main />
    <ticket />
    <base-info />
  </div>
  <!-- 
      "status": 1,
        "activityName": "CityWalk，行东山路，觅东山情",
        "startTime": 1644451200000,
        "registerDeadLine": 1644373200000,
        "endTime": 1644566400000,
        "address": "广州地铁1号线东山口站E出口",
        "videoUrl": "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
        "posterImg": "https://quyou-1304036964.cos.ap-guangzhou.myqcloud.com/yiqipati/yiqipati_1607936100127131674.jpg",
        "linkManCode": "https://quyou-1304036964.cos.ap-guangzhou.myqcloud.com/yiqipati/yiqipati_1607937770066685329.jpg",
        "groupCode": "https://quyou-1304036964.cos.ap-guangzhou.myqcloud.com/yiqipati/yiqipati_1607937665137302032.jpg",
        "announcement": "请即时进入微信活动群",
        "activityDetail": "<img src='https://quyou-1304036964.cos.ap-guangzhou.myqcloud.com/yiqipati/yiqipati_1607937549780919316.jpg'  />",
        "tickets": [{
            "ticketName": "早鸟票",
            "ticketNumber": 30,
            "ticketPrice": 1,
            "ticketRemainNumber": 7,
            "ticketInstruction": "数量有限，先到先得",
            "refundType": 2,
            "refundReason": "无",
            "tid": 93
        }, {
            "ticketName": "男生票",
            "ticketNumber": 30,
            "ticketPrice": 2,
            "ticketRemainNumber": 20,
            "ticketInstruction": "报名者仅限男生",
            "refundType": 2,
            "refundReason": "无",
            "tid": 94
        }, {
            "ticketName": "女生票",
            "ticketNumber": 30,
            "ticketPrice": 3,
            "ticketRemainNumber": 19,
            "ticketInstruction": "报名者仅限女生",
            "refundType": 2,
            "refundReason": "无",
            "tid": 95
        }],
        "aid": 89
   -->
</template>

<script>
import ActivityMain from "./childComponents/ActivityMain.vue";
import BaseInfo from "./childComponents/BaseInfo.vue";
import Ticket from "./childComponents/Ticket.vue";
export default {
  name: "AddActivity",
  components: { ActivityMain, Ticket, BaseInfo },
};
</script>

<style scoped>
.AddActivity {
  padding-top: 15px;
  padding-left: 10px;
}
</style>