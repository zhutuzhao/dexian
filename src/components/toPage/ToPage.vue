<template>
  <div class="toPage">
    <div class="page">
      <span class="pageNow">{{ pageNow }}</span
      ><span class="pageTotal">/{{ pageTotal }}</span>
    </div>
    <input ref="page_input" placeholder="输入页码" type="number" />
    <button @click="toPageClick">跳至</button>
  </div>
</template>

<script>
export default {
  name: "ToPage",
  props: {
    pageNow: {
      type: Number,
      default: 1,
    },
    pageTotal: {
      type: Number,
      default: 1,
    },
  },
  methods: {
    toPageClick() {
      let pageInput = Number.parseInt(this.$refs.page_input.value);
      if (
        pageInput &&
        pageInput > 0 &&
        pageInput != this.pageNow &&
        pageInput <= this.pageTotal
      ) {
        this.$emit("toPageClick", pageInput);
      }
      this.$refs.page_input.value = "";
    },
  },
};
</script>

<style scoped>
.toPage {
  position: absolute;
  right: 67px;
  bottom: 27px;
}
.toPage .page {
  display: inline-block;
}
.toPage .page::after,
.toPage .page::before {
  position: relative;
  content: "";
  display: block;
  width: 0;
  height: 0;
  border: 8px solid #333;
  cursor: pointer;
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
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type="number"] {
  -moz-appearance: textfield;
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