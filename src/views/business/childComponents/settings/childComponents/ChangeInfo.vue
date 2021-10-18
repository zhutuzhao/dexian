<template>
  <div v-if="isOnChangeInfo" class="wrapper">
    <div class="changeInfoBox">
      <div class="title">修改基础信息</div>
      <div class="content">
        <div class="clear-fix">
          <div class="left">
            <span>商家名称</span
            ><input
              placeholder="商家名称"
              type="text"
              v-model="newUserInfo.companyName"
            />
          </div>
          <div class="left">
            <span>联系人名</span
            ><input
              placeholder="联系人名"
              type="text"
              v-model="newUserInfo.linkman"
            />
          </div>
        </div>
        <div class="clear-fix">
          <div class="left">
            <span>商家电话</span
            ><input
              placeholder="商家电话"
              type="text"
              v-model="newUserInfo.companyPhone"
            />
          </div>
          <div class="left">
            <span>联系电话</span
            ><input
              placeholder="联系电话"
              type="text"
              v-model="newUserInfo.phone"
            />
          </div>
        </div>
        <div class="intro">
          <span>商家简介</span>
          <textarea
            placeholder="商家简介"
            v-model="newUserInfo.companyIntroduction"
          ></textarea>
        </div>
        <button @click="cancleChangeInfo">取消</button
        ><button @click="changeUserInfo">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChangeInfo",
  props: {
    isOnChangeInfo: Number,
    newUserInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    cancleChangeInfo() {
      this.$emit("cancleChangeInfo");
    },
    changeUserInfo() {
      this.$emit("changeUserInfo");
    },
  },
};
</script>

<style scoped>
@import "~assets/css/account.css";
.changeInfoBox {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 1006px;
  height: 528px;
  background: #ffffff;
  border: 2px solid #d7d7d7;
  box-shadow: 0px 3px 15px 3px rgba(0, 0, 0, 0.03);
  border-radius: 4px;
}
.changeInfoBox .content {
  margin-left: 109px;
}
.changeInfoBox .content .left:first-child input {
  margin-right: 110px;
}
.changeInfoBox .intro span {
  vertical-align: top;
}
.changeInfoBox .content textarea {
  margin-left: 6px;
  margin-bottom: 58px;
  padding-top: 10px;
  padding-left: 12px;
  width: 520px;
  height: 148px;
  border: 1px solid #999999;
  border-radius: 6px;
  resize: none;
  outline: none;
}
</style>