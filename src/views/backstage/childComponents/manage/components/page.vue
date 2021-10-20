<template>
  <div class="pageBox">
    <i class="iconfont icon-zuojiantou" @click="up"></i>
    <span class="pageNum">{{ pageNum }}</span
    >/<span class="pages"> {{ pages }}</span>
    <i class="iconfont icon-youjiantou" @click="down"></i>
    <input
      type="text"
      placeholder="输入页码"
      class="pageChange"
      id="pageChange"
      @keyup="changePage2"
    />
    <button class="changeBtn" @click="changePage1">跳至</button>
  </div>
</template>

<script>
export default {
  name: 'pageBox',
  props: {
    pageNum: {
      type: Number,
      default: '',
    },
    pages: {
      type: Number,
      default: '',
    },
    pageSize: {
      type: Number,
      default: '',
    },
  },
  methods: {
    up() {
      if (this.pageNum > 1) this.pageNum--
      this.$parent.getAll(this.pageNum, this.pageSize)
    },
    down() {
      if (this.pageNum < this.pages) this.pageNum++
      this.$parent.getAll(this.pageNum, this.pageSize)
    },
    changePage1() {
      let pageChange = document.querySelector('#pageChange')
      this.pageNum = pageChange.value
      pageChange.value = ''
      this.$parent.getAll(this.pageNum, this.pageSize)
    },
    changePage2(e) {
      let key = null
      if (window.event === undefined) {
        key = e.keyCode
      } else {
        key = window.event.keyCode
      }
      if (key === 13) {
        this.changePage1()
      }
    },
  },
}
</script>
<style scoped>
.pageBox {
  position: absolute;
  bottom: 27px;
  right: 35px;
}
.pageNum {
  margin-left: 42px;
}
.pages {
  margin-right: 42px;
}
.pageChange {
  width: 80px;
  height: 34px;
  background-color: #f5f5f5;
  border: 1px solid #999999;
  color: #999999;
  border-radius: 4px;
  font-size: 16px;
  padding: 3px;
  margin-left: 41px;
  margin-right: 16px;
}
.changeBtn {
  width: 67px;
  height: 34px;
  background-color: #ff8900;
  border-radius: 4px;
  font-size: 16px;
  border: 0;
  color: #fff;
}</style
>>
