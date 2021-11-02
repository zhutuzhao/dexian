<template>
  <div class="ActivityList">
    <div class="header">
      <input
        class="searchByName"
        v-model="activityName"
        placeholder="请输入活动名称"
        type="text"
      />
      <el-date-picker
        class="selectDate"
        type="date"
        v-model="startvalue"
        :picker-options="pickerOptions"
        placeholder="请选择发起时间"
        format="yyyy年MM月dd日"
        value-format="yyyy-MM-dd HH:mm:ss"
      >
      </el-date-picker>
      <div class="status">
        <span>状态</span>
        <select v-model="status" name="" id="">
          <option value="0">全部</option>
          <option value="1">上架</option>
          <option value="-1">下架</option>
        </select>
      </div>
      <div class="showNum">
        <span>每页显示</span>
        <select v-model="showNum" name="" id="">
          <option value="5">5</option>
          <option value="10">10</option>
        </select>
      </div>
      <button @click="searchActivity">搜索</button
      ><button @click="addActivity">新增</button>
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
            @click="statusChange(item)"
          /><img
            v-else
            class="show"
            src="~assets/img/business/show_off_1.png"
            @click="statusChange(item)"
          />
        </td>
        <td class="option">
          <div class="clear-fix">
            <div class="left">
              <div class="change">修改</div>
              <div class="check" @click="checkDetail(item.activityId)">
                查看
              </div>
            </div>
            <div class="left">
              <div class="delete" @click="deleteActivity(item.activityId)">
                删除
              </div>
            </div>
          </div>
        </td>
      </tr>
      <tr></tr>
    </table>
  </div>
</template>

<script>
import {
  modify_activity_status,
  delete_activity,
} from "network/business/business.js";
export default {
  name: "ActivityList",
  data() {
    return {
      startvalue: "",
      endvalue: "",
      activityName: "",
      showNum: 5,
      pickerOptions: {
        disabledDate: (time) => {
          if (this.startvalue) {
            return (
              time.getTime() > Date.now() || time.getTime() > this.startvalue
            );
          } else {
            return time.getTime() > Date.now();
          }
        },
      },
      status: 0,
    };
  },
  props: {
    showNow: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    statusChange(item) {
      modify_activity_status(item.activityId).then((res) => {
        if (res.data.msg == "success") {
          item.status = item.status * -1;
        }
      });
    },
    deleteActivity(id) {
      // // console.log(id);
      // // delete_activity(id).then((res) => {
      // //   console.log(res);
      // // });
      delete_activity(id).then((res) => {
        console.log(res);
        // console.log(this);
        this.$emit("deleteActivity", id);
      });
    },
    searchActivity() {
      // // console.log(this.startvalue);
      // // console.log(this.activityName);
      // // this.$emit("searchActivity");
      // this.activityName
      //   ? this.$emit("searchActivitys", "name", this.activityName)
      //   : this.startvalue
      //   ? this.$emit("searchActivitys", "date", this.startvalue, this.endvalue)
      //   : console.log("none");
      // // this.activityName = this.startvalue = "";

      if (this.activityName && !this.startvalue) {
        this.$emit("searchActivitys", "name", this.activityName);
      } else if (!this.activityName && this.startvalue) {
        this.$emit("searchActivitys", "date", this.startvalue, this.endvalue);
      } else if (this.activityName && this.startvalue) {
        // console.log('both');
        this.$emit(
          "searchActivitys",
          "both",
          this.activityName,
          this.startvalue,
          this.endvalue
        );
      } else {
        console.log("none");
        this.$emit("searchActivitys", "none");
      }
      this.activityName = this.startvalue = "";
    },
    addActivity() {
      this.$router.push("/Business/Activity_manage_bs/Add_activity");
    },
    checkDetail(id) {
      // console.log(id);
      this.$router.push("/Business/Activity_manage_bs/Activity_info/" + id);
    },
  },
  watch: {
    status(newval) {
      this.$parent.status = newval;
    },
    showNum(newval) {
      this.$parent.showNum = newval;
    },
  },
  mounted() {
    this.endvalue = new Date().Format("yyyy-MM-dd 00:00:00");
  },
};
</script>

<style scoped>
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
  width: 170px;
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
</style>