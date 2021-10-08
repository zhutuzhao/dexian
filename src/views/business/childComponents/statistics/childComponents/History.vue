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
      <div id="myChart" :style="{ width: '1000px', height: '300px' }"></div>
    </div>
    <div class="detail">
      <div class="title">详细信息</div>
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

import { requst } from "network/requst.js";
import { get_activity_list, searchByTime } from "network/business/business.js";

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
      seriesData: [1, 2, 3],
      xAxisData: [10, 20, 30],
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
    //     this.drawLine();
    //   }
    // );
    get_activity_list().then((res) => {
      console.log(res);
    });
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
  margin-top: 66px;
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
  /* left: 11px; */
  left: 50%;
  transform: translateX(-50%);
  width: 18px;
  height: 3px;
  background: #ff8900;
  border-radius: 2px;
}
</style>
