<template>
  <div class="Activity_manage_bs main_item">
    <main-title title="活动管理" />
    <activity-list
      :showNow="showNow"
      :status="status"
      @deleteActivity="deleteActivity"
      @searchActivitys="searchActivitys"
    />
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
import MainTitle from "components/main_title/MainTitle.vue";
import ToPage from "components/toPage/ToPage.vue";
import ActivityList from "./activityChild/ActivityList.vue";

import {
  get_activity_list,
  search_by_name,
  search_by_time,
} from "network/business/business.js";

export default {
  name: "Activity_manage_bs",
  components: { MainTitle, ToPage, ActivityList },
  data() {
    return {
      status: 0,
      upActivity: [],
      downActivity: [],
      allActivity: [],
      searchActivity: [],
      pageNow: 1, //toPage的当前页
      pageTotal: 1, //toPage的总页数
      showNum: 5, //展示数量
      showNow: [], //展示的活动
      flag_get_up: 1, //获取所有活动的节流阀
      flag_get_down: 1, //获取所有活动的节流阀
      pageTotal_up: 1, //上架的总页数
      pageTotal_down: 1, //下架活动的总页数
      pageTotal_all: 1, //所有活动的总页数
      pageTotal_search: 1, //所有搜索活动的总页数
      isOnSearch: 0, //是否处于搜索的内容
      searchContent: "", //搜索的内容
      startTime: "",
      endTime: "",
    };
  },
  methods: {
    toPage(pageInput) {
      this.pageNow = pageInput;
      if (this.isOnSearch) {
        this.searchContent
          ? this.searchByName(
              pageInput,
              this.showNum,
              this.status,
              this.searchContent
            )
          : this.searchByTime(
              pageInput,
              this.showNum,
              this.status,
              this.startTime,
              this.endTime
            );
      } else {
        switch (parseInt(this.status)) {
          case 1:
            this.showNow = this.getShowList(this.upActivity);
            break;
          case -1:
            this.showNow = this.getShowList(this.downActivity);
            break;
          case 0:
            this.showNow = this.getShowList(this.allActivity);
            break;
          default:
            break;
        }
      }
    },
    getActivity() {
      return get_activity_list(this.status).then((res) => {
        switch (parseInt(this.status)) {
          case 0:
            this.allActivity = res.data.data.list;
            this.showNow = this.allActivity.slice(0, this.showNum);
            break;
          case 1:
            this.flag_get_up = 0;
            this.upActivity = res.data.data.list;
            this.showNow = this.upActivity.slice(0, this.showNum);
            break;
          case -1:
            this.flag_get_down = 0;
            this.downActivity = res.data.data.list;
            this.showNow = this.downActivity.slice(0, this.showNum);
            break;
          default:
            break;
        }
        return res.data.data.list;
      });
    },
    getShowList(arr) {
      return arr.slice(
        (this.pageNow - 1) * this.showNum,
        (this.pageNow - 1) * this.showNum - -this.showNum
      );
    },
    typeClick(type) {
      if (this.flag_get_up || this.flag_get_down) {
        this.getActivity().then((res) => {
          console.log(res);
          console.log("change");
          this.renewShowList(type, 1);
        });
      } else {
        this.renewShowList(type, 1);
      }
      this.pageNow = 1;
      this.isOnSearch = 0;
      this.searchContent = this.startTime = this.endTime = "";
    },
    renewShowList(type, page) {
      this.pageNow = page;
      if (type == 1) {
        this.pageTotal = Math.ceil(this.upActivity.length / this.showNum);
        this.showNow =
          this.pageTotal != this.pageNow
            ? this.upActivity.slice(
                (page - 1) * this.showNum,
                (page - 1) * this.showNum - -this.showNum
              )
            : this.upActivity.slice((page - 1) * this.showNum);
        //重置toPage
      } else if (type == -1) {
        this.pageTotal = Math.ceil(this.downActivity.length / this.showNum);
        this.showNow =
          this.pageTotal != this.pageNow
            ? this.downActivity.slice(
                (page - 1) * this.showNum,
                (page - 1) * this.showNum - -this.showNum
              )
            : this.downActivity.slice((page - 1) * this.showNum);
        //重置toPage
      } else if (type == 0) {
        this.pageTotal = Math.ceil(this.allActivity.length / this.showNum);
        this.showNow =
          this.pageTotal != this.pageNow
            ? this.allActivity.slice(
                (page - 1) * this.showNum,
                (page - 1) * this.showNum - -this.showNum
              )
            : this.allActivity.slice((page - 1) * this.showNum);
        //重置toPage
      }
      if (!this.showNow.length) {
        this.pageNow = this.pageTotal > 1 ? this.pageTotal : 1;
        this.renewShowList(this.status, this.pageNow);
      }
    },
    deleteActivity(id) {
      this.showNow = this.showNow.filter((item) => {
        return item.activityId == id ? false : true;
      });
      this.upActivity = this.upActivity.filter((item) => {
        // console.log("upActivity删除");
        return item.activityId == id ? false : true;
      });
      this.downActivity = this.downActivity.filter((item) => {
        // console.log("downActivity删除");
        return item.activityId == id ? false : true;
      });
      this.allActivity = this.allActivity.filter((item) => {
        // console.log("allActivity删除");
        return item.activityId == id ? false : true;
      });
      this.renewShowList(this.status, this.pageNow);
    },
    searchByName(pageNum, pageSize, status, content) {
      search_by_name(pageNum, pageSize, status, content).then((res) => {
        console.log(res.data.data);
        this.showNow = res.data.data.list;
        this.pageTotal = res.data.data.pages;
        this.pageNow = pageNum;
      });
    },
    searchByTime(pageNum, pageSize, status, startTime, endTime) {
      search_by_time(pageNum, pageSize, status, startTime, endTime).then(
        (res) => {
          console.log(res.data.data);
          this.showNow = res.data.data.list;
          this.pageTotal = res.data.data.pages;
          this.pageNow = pageNum;
        }
      );
    },
    searchActivitys(...payload) {
      // console.log(payload);

      // endRow: 3
      // hasNextPage: false
      // hasPreviousPage: false
      // isFirstPage: true
      // isLastPage: true
      // list: (3) [{…}, {…}, {…}]
      // navigateFirstPage: 1
      // navigateLastPage: 1
      // navigatePages: 8
      // navigatepageNums: [1]
      // nextPage: 0
      // pageNum: 1
      // pageSize: 5
      // pages: 1
      // prePage: 0
      // size: 3
      // startRow: 1
      // total: 3
      this.isOnSearch = 1;
      if (payload[0] == "name") {
        // console.log("name");
        // search_by_name(1, this.showNum, this.status, payload[1]).then((res) => {
        //   console.log(res.data.data);
        //   this.showNow = res.data.data.list;
        //   this.pageTotal = res.data.data.pages;
        //   this.pageNow = 1;
        //   //下一步做搜索的分页
        // });
        this.searchContent = payload[1];
        this.searchByName(1, this.showNum, this.status, payload[1]);
      } else if (payload[0] == "date") {
        // console.log("date");pageNum, pageSize, status, startTime, endTime
        this.startTime = payload[1];
        this.endTime = payload[2];
        this.searchByTime(1, this.showNum, this.status, payload[1], payload[2]);
      } else if (payload[0] == "both") {
        alert("暂不支持两个同时选择的情况");
        // this.searchContent = payload[1];
        // this.searchByName(1, this.showNum, this.status, payload[1]);
        // this.startTime = payload[2];
        // this.endTime = payload[3];
        // this.searchByTime(1, this.showNum, this.status, payload[2], payload[3]);
      } else {
        this.renewShowList(this.status, 1);
      }
    },
  },
  watch: {
    status(newval) {
      console.log(newval);
      this.typeClick(newval);
    },
    showNum(newval) {
      console.log(newval);
      this.renewShowList(this.status, 1);
    },
  },
  mounted() {
    this.getActivity().then((res) => {
      console.log(res);
      this.renewShowList(this.status, 1);
    });
  },
};
</script>

<style scoped>
.Activity_manage_bs {
  width: 1158px;
  min-height: 736px;
  background: #ffffff;
}
</style>