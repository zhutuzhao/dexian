<template>
  <div class="history">
    <main-title :title="title" />
    <div class="date">
      <span>时间：</span><span>最近30天</span><span>最近7天</span>
      <el-date-picker
        v-model="value"
        type="daterange"
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
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
      value: "",
      title: "历史信息",
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
        disabledDate: (time) => {
          if (this.value[1]) {
            return time.getTime() > Date.now() || time.getTime() > this.value[1];
          } else {
            return time.getTime() > Date.now();
          }
        },
      },
    };
  },
  watch: {
    value(newvalue) {
      console.log(newvalue);
    },
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
</style>