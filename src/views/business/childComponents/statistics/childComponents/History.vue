<template>
  <div class="history">
    <main-title :title="title" />
    <div class="date">
      <span class="clickData">时间：</span
      ><span
        ref="to30"
        :class="{
          active:
            this.value[0] == this.computeDate(30)[0] &&
            this.value[1] == this.computeDate(30)[1],
        }"
        @click="checkTo(30)"
        >最近30天</span
      ><span
        ref="to7"
        :class="{
          active:
            this.value[0] == this.computeDate(7)[0] &&
            this.value[1] == this.computeDate(7)[1],
        }"
        @click="checkTo(7)"
        >最近7天</span
      >
      <el-date-picker
        v-model="value"
        type="daterange"
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
        format="yyyy年MM月dd日"
        value-format="yyyy-MM-dd HH:mm:ss"
        :clearable="false"
        size="mini"
      >
      </el-date-picker>
    </div>
    <div class="trend">
      <div class="title">趋势图</div>
      <div class="type">
        <span>类型：</span
        ><span
          :class="{ active: isActive == 'ticket' }"
          @click="typeClick('ticket')"
          >票数</span
        ><span
          :class="{ active: isActive == 'view' }"
          @click="typeClick('view')"
          >访问数</span
        ><span
          :class="{ active: isActive == 'register' }"
          @click="typeClick('register')"
          >报名数</span
        >
      </div>
      <div
        id="myChart"
        :style="{ width: '1200px', height: '300px', marginLeft: '-90px' }"
      ></div>
    </div>
    <div class="detail">
      <div class="title">详细信息</div>
      <div>
        <table class="detail_table">
          <tr>
            <th>时间</th>
            <th>访问数</th>
            <th>报名数</th>
            <th>票数</th>
            <th></th>
          </tr>
          <tr v-for="i in 8" :key="i">
            <td>2021-10-31</td>
            <td>65</td>
            <td>65</td>
            <td>65</td>
            <td></td>
          </tr>
        </table>
        <div class="toPage">
          <div class="page">
            <span class="pageNow">1</span><span class="pageTotal">/10</span>
          </div>
          <input placeholder="输入页码" type="text" />
          <button>跳至</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入基本模板
let echarts = require("echarts/lib/echarts");

// 引入柱状图组件
require("echarts/lib/chart/bar");

// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");

import MainTitle from "components/main_title/MainTitle.vue";

// import { requst } from "network/requst.js";
// import { get_activity_list, searchByTime } from "network/business/business.js";

export default {
  name: "History",
  components: { MainTitle },
  data() {
    return {
      timeDefaultShow: [],
      value: [],
      title: "历史信息",
      pickerOptions: {
        shortcuts: [
          {
            text: "最近7天",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近30天",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
        disabledDate: (time) => {
          if (this.value[1]) {
            return (
              time.getTime() > Date.now() || time.getTime() > this.value[1]
            );
          } else {
            return time.getTime() > Date.now();
          }
        },
      },
      isActive: "ticket",
      seriesData: [43, 32, 54, 64],
      xAxisData: ["2021-10-31", "2021-10-31", "2021-10-31", "2021-10-31"],
    };
  },
  computed: {
    computeDate() {
      return function (days) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * days);
        return [this.dateFormat(start), this.dateFormat(end)];
      };
    },
  },
  methods: {
    dateFormat(date, format = "YYYY-MM-DD HH:mm:ss") {
      const config = {
        YYYY: date.getFullYear(),
        MM:
          date.getMonth() - -1 < 10
            ? "0" + (date.getMonth() - -1)
            : date.getMonth() - -1,
        DD: date.getDate() < 10 ? "0" + date.getDate() : date.getDate(),
        HH: "00",
        mm: "00",
        ss: "00",
      };
      for (const key in config) {
        format = format.replace(key, config[key]);
      }
      return format;
    },
    checkTo(value) {
      if (value == 30) {
        this.$refs.to7.className = "";
        this.value = this.computeDate(30);
      } else {
        this.$refs.to30.className = "";
        this.value = this.computeDate(7);
      }
    },
    typeClick(a) {
      // console.log(a);
      // console.log(this);
      this.isActive = a;
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        xAxis: {
          // data: ["A", "B", "C", "D", "E"],
          data: this.xAxisData,
          boundaryGap: false,
          axisLabel: {
            color: "#333", // x轴字体颜色
          },
        },
        yAxis: { type: "value" },
        series: [
          {
            // data: [25, 14, 23, 35, 10],
            data: this.seriesData,
            type: "line",
            // symbolOffset: [0, -10],
            smooth: true,
            lineStyle: {
              width: 4, //外边线宽度
              color: "#FF8900", //外边线颜色
            },
            showSymbol: false, //去除面积图节点圆
            areaStyle: {
              //区域填充渐变颜色
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#FF8900", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#FDBE6B", // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
              opacity: 1,
            },
          },
        ],
      });
    },
  },
  mounted() {
    // searchByTime(value[0], value[1], 1, 8, 0).then(res=>{
    //   console.log(res);
    //   this.drawLine();
    // });
    // searchByTime("2019-12-02 00:00:00	", "2020-12-02 00:00:00	", 1, 8, 0).then(
    //   (res) => {
    //     console.log(res);
    //     console.log(this);
    this.drawLine();
    //   }
    // );
    // get_activity_list().then((res) => {
    //   console.log(res);
    // });
  },
};
</script>

<style scoped>
.history {
  margin-top: 20px;
  width: 1158px;
  height: 1187px;
  background: #ffffff;
}
.date {
  margin-top: 40px;
  margin-left: 58px;
}

.date span {
  margin-right: 17px;
  height: 16px;
  font-size: 16px;
  font-weight: 400;
  color: #666666;
  cursor: pointer;
}
.date .clickData {
  height: 17px;
  font-size: 16px;
  font-weight: bold;
  color: #333333;
}
.date span.active {
  color: #ff8900;
}
.trend {
  margin-top: 42px;
  margin-left: 68px;
}
.detail {
  margin-left: 75px;
}
.trend .title,
.detail .title {
  position: relative;
  top: -17px;
  height: 17px;
  font-size: 16px;
  font-weight: bold;
  color: #333333;
}
.trend .title::before,
.detail .title::before {
  position: relative;
  top: 17px;
  right: 9px;
  content: "";
  display: block;
  width: 3px;
  height: 16px;
  background: #ff8900;
  border-radius: 1px;
}
.trend .type {
  margin-top: 32px;
  margin-left: 44px;
}
.trend .type span:first-child {
  margin-right: 12px;
  height: 18px;
  font-size: 18px;
  font-weight: 400;
  color: #333333;
}
.trend .type span:not(:first-child) {
  margin-right: 28px;
  height: 18px;
  font-size: 18px;
  font-weight: 400;
  color: #666666;
  cursor: pointer;
}
.trend .type span:not(:first-child).active {
  position: relative;
  height: 21px;
  font-size: 20px;
  font-weight: 400;
  color: #ff8900;
}
.trend .type span:not(:first-child).active::after {
  content: "";
  display: block;
  position: absolute;
  bottom: -3px;
  left: 50%;
  transform: translateX(-50%);
  width: 18px;
  height: 3px;
  background: #ff8900;
  border-radius: 2px;
}
.detail_table {
  margin-top: 34px;
  margin-left: 6px;
  width: 1012px;
  border-collapse: collapse;
}
.detail_table tr {
  height: 48px;
  width: 1012px;
}
.detail_table th {
  font-size: 16px;
  font-weight: bold;
  color: #333333;
  background: #f5f5f5;
}
.detail_table tr:nth-child(odd) {
  background: #f5f5f5;
}
.detail_table tr:nth-child(even) {
  background: #ffffff;
}
.detail_table td {
  text-align: center;
}
.detail_table td:last-child {
  width: 500px;
}
.toPage {
  position: absolute;
  margin-top: 44px;
  right: 67px;
}
.toPage .page {
  display: inline-block;
  /* width: 149px; */
}
.toPage .page::after,
.toPage .page::before {
  position: relative;
  content: "";
  display: block;
  width: 0;
  height: 0;
  border: 8px solid #333;
}
.toPage .page::before {
  top: 17px;
  right: 57px;
  border-color: transparent #333 transparent transparent;
}
.toPage .page::after {
  bottom: 17px;
  left: 76px;
  border-color: transparent transparent transparent #333;
}
.toPage input {
  margin-left: 82px;
  padding: 9px 13px 8px;
  width: 90px;
  height: 34px;
  background: #f5f5f5;
  border: 1px solid #999999;
  border-radius: 4px;
  outline: none;
  font-size: 15px;
  font-weight: 400;
}
.toPage button {
  margin-left: 16px;
  width: 67px;
  height: 34px;
  background: #ff8900;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 400;
  color: #ffffff;
  cursor: pointer;
}
</style>
