<template>
  <div class="Front_manage">
    <!-- 标题 -->
    <div class="Front_title">
      <i class="icon-outer"> <i class="icon-inner"></i></i>
      <h3 class="title_title">banner信息</h3>
    </div>

    <div class="Front_form">
      <el-form :inline="true" class="form">
        <el-form-item>
          <el-input
            placeholder="输入名称查询"
            v-model="content"
            class=" content"
            height="36"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            type="date"
            placeholder="输入起始时间查询"
            v-model="time"
            class=" time"
            id="time"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="每页显示">
          <el-select
            placeholder="每页显示"
            v-model="pageSize"
            class=" page"
            @change="changePages"
          >
            <el-option label="5" value="5"></el-option>
            <el-option label="10" value="10"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch" class=" search"
            >搜索</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onAdd" class="add">新增</el-button>
        </el-form-item>
      </el-form>
      <el-table
        :data="list"
        style="width: 100%"
        class="order_table"
        :header-cell-style="{ color: '#333333', fontSize: '16px' }"
      >
        <el-table-column type="index" label="序号" width="70">
        </el-table-column>
        <el-table-column prop="activityName" label="标题" width="120">
        </el-table-column>
        <el-table-column label="缩略图" width="180">
          <template slot-scope="scope">
            <img
              :src="scope.row.posterImage"
              class="pic"
              width="151"
              height="56"
            />
          </template>
        </el-table-column>
        <el-table-column prop="url" label="地址" width="400"> </el-table-column>
        <el-table-column label="状态" width="100" prop="status">
        </el-table-column>
        <el-table-column prop="createTime" label="上线时间" width="100">
        </el-table-column>
        <el-table-column prop="operation" label="操作">
          <template slot-scope="scope">
            <el-link
              type="info"
              class="edit"
              @click="edit(scope.row.recommendId)"
              v-model="scope.row.recommendId"
            >
              编辑</el-link
            >
            <el-link
              type="danger"
              @click="del(scope.row.recommendId)"
              v-model="scope.row.recommendId"
            >
              删除</el-link
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 页码框 -->
      <page-box
        :pageNum="pageNum"
        :pages="pages"
        :pageSize="pageSize"
      ></page-box>
    </div>
  </div>
</template>
<script>
import { frontList } from '../../../../network/backstage/Front_manage/front_list'
import pageBox from './components/page.vue'
import { contentSearch } from '../../../../network/backstage/Front_manage/content_search'
import { timeSearch } from '../../../../network/backstage/Front_manage/time_search'
export default {
  name: 'Front_manage',
  components: { pageBox },
  data() {
    return {
      content: '',
      time: '',
      status: '0',
      list: [
        {
          recommendId: 'dvaskj',
          activityName: '广工交友',
          organizer: '南亭酒吧',
          posterImage:
            'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fdpic.tiankong.com%2Ft1%2F8j%2FQJ7189988823.jpg&refer=http%3A%2F%2Fdpic.tiankong.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1636594483&t=65c671755b322026878cea966de3a07b',
          number: '98/100',
          releaseTime: '2020-12-12 12:30',
          startTime: '2021-09-05 12:00:00',
          status: 1,
        },
        {
          recommendId: 't*3c4O&',
          activityName: '1p38',
          url: 'ZEEyx',
          image: 'yT)02$',
          createTime: 'uPiuxc',
          status: 5081460780538860,
        },
        {
          recommendId: 'dKs',
          activityName: '4&5)g@',
          url: '$o#SS',
          image: 'Ow3W',
          createTime: '^Mex7V(',
          status: -5969114419318740,
        },
      ],
      pageNum: 1,
      pageSize: 5,
      pages: 5,
    }
  },
  methods: {
    onSearch() {
      if (this.content != '') {
        this.F_contentSearch()
      } else {
        this.F_timeSearch()
      }
    },
    onAdd() {
      console.log(2)
      //   新增接口
    },
    unixToDate(unixTime) {
      let time = new Date((parseInt(unixTime / 1000) + 8 * 60 * 60) * 1000)
      let ymdhis = ''
      ymdhis += time.getUTCFullYear() + '-'
      ymdhis += time.getUTCMonth() + 1 + '-'
      ymdhis += time.getUTCDate()
      ymdhis += ' ' + time.getUTCHours() + ':'
      ymdhis += time.getUTCMinutes() + ':'
      ymdhis += time.getUTCSeconds()
      return ymdhis
    },
    changePages() {
      this.getAll()
      console.log(1)
    },
    edit(recommendId) {
      console.log(recommendId)
      //   编辑端口
    },
    del(recommendId) {
      console.log(recommendId)
      //   删除端口
    },
    async getAll(pageNum, pageSize) {
      this.res = await frontList(pageNum, pageSize)
      this.$data.list = this.res.data.data.list
      this.$data.pages = this.res.data.data.pages
      console.log('getAll success')
    },
    async F_contentSearch() {
      this.res = await contentSearch(this.pageNum, this.pageSize, this.content)
      this.$data.list = this.res.data.data.list
      console.log('contentsearch success')
      this.content = ''
    },
    async F_timeSearch() {
      let pageChange = document.querySelector('#time')
      this.time = pageChange.value + ' 00:00:00'
      var data = new Date().getTime()
      var date = this.unixToDate(data)
      this.res = await timeSearch(this.pageNum, this.pageSize, this.time, date)
      this.$data.list = this.res.data.data.list
      console.log('time search success')
      pageChange.value = ''
    },
  },
  created: async function() {
    this.res = await frontList(this.pageNum, this.pageSize)
    this.$data.list = this.res.data.data.list
    this.$data.pages = this.res.data.data.pages
    console.log('getAll success')
  },
}
</script>

<style scoped>
.Front_manage {
  position: relative;
  height: 742px;
  width: 1158px;
  background-color: #fff;
  margin: 26px 20px 20px 256px;
  padding: 20px;
}
.Front_title {
  height: 26px;
  line-height: 26px;
}
.icon-outer,
.title_title {
  float: left;
}
.icon-outer {
  width: 26px;
  height: 26px;
  background-color: #ff8e09;
  border-radius: 50%;
  position: relative;
}
.icon-inner {
  width: 14px;
  height: 14px;
  background-color: #ff8e09;
  border: 1.7px solid #fff;
  border-radius: 50%;
  position: absolute;
  left: 6px;
  top: 6px;
}
.title_title {
  margin-left: 13px;
}
.form {
  margin: 23px 0px 0px 39px;
}
.content {
  height: 36px;
  width: 222px;
  margin-right: 32px;
}
.time {
  width: 180px;
  margin-right: 31px;
}
.page {
  width: 68px;
  margin-right: 36px;
}
.search {
  width: 82px;
  font-size: 18px;
  font-weight: 700;
  background-color: #ff8e00;
  border: 0;
  margin-right: 24px;
}
.edit {
  margin-right: 10px;
}
.switch {
  height: 30px;
}
</style>
