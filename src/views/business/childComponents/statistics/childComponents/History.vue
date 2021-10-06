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
  </div>
</template>

<script>
import MainTitle from "components/main_title/MainTitle.vue";
export default {
  name: "History",
  components: { MainTitle },
  data() {
    return {
      timeDefaultShow: [],
      value: "",
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
  },
  mounted() {},
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
.clickData {
  height: 17px;
  font-size: 16px;
  font-weight: bold;
  color: #333333;
}

.date span {
  margin-right: 17px;
  height: 16px;
  font-size: 16px;
  font-weight: 400;
  color: #666666;
}

.date span.active {
  color: #ff8900;
}
</style>
