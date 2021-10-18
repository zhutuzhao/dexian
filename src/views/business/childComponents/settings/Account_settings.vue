<template>
  <div class="Account_settings main_item">
    <main-title title="修改账号" />
    <div class="userInfo">
      <div class="accountName">账户名称：{{ userInfo.account }}</div>
      <div class="changePsw" @click="openChangePsw">修改密码</div>
      <div class="wrapper">
        <div class="userLogo">
          <div class="title">商家LOGO</div>
          <img ref="userLogo" :src="userImg" alt="" />
          <input
            type="file"
            accept="image/*"
            ref="updateImg"
            style="display: none"
          />
          <span class="updateLogo" @click="uploadClick">点击上传图片</span>
        </div>
        <div class="clear-fix">
          <div class="left leftItem">
            <div class="shopName">商家名称：{{ userInfo.companyName }}</div>
            <div class="shopPhone">商家电话：{{ userInfo.companyPhone }}</div>
            <div class="shopIntro">
              商家简介：
              <div class="infoContent">
                {{ userInfo.companyIntroduction }}
              </div>
            </div>
          </div>
          <div class="left rightItem">
            <div class="contactName">联系人名称：{{ userInfo.linkman }}</div>
            <div class="contactType">联系方式：{{ userInfo.phone }}</div>
            <div class="changeInfo" @click="isOnChangeInfo = 1">
              修改基础信息
            </div>
          </div>
        </div>
      </div>
    </div>
    <change-psw ref="changePsw" />
    <change-info
      :isOnChangeInfo="isOnChangeInfo"
      :newUserInfo="newUserInfo"
      @cancleChangeInfo="cancleChangeInfo"
      @changeUserInfo="changeUserInfo"
    />
    <!-- <change-info/> -->
  </div>
</template>
<script>
import MainTitle from "components/main_title/MainTitle.vue";
import ChangeInfo from "./childComponents/ChangeInfo.vue";
import ChangePsw from "./childComponents/ChangePsw.vue";

import {
  get_user_info,
  change_user_info,
  upload_picture,
} from "network/business/business.js";

import { debounce } from "common/utils.js";

export default {
  name: "Account_settings",
  components: { MainTitle, ChangeInfo, ChangePsw },
  data() {
    return {
      userImg: "",
      userInfo: {},
      newUserInfo: {},
      isOnChangeInfo: 0,
    };
  },
  methods: {
    changeUserInfo() {
      if (this.userInfo.account) {
        console.log(this.newUserInfo);
        change_user_info(this.newUserInfo).then((res) => {
          console.log(res);
          this.isOnChangeInfo = 0;
          this.userInfo = Object.assign(this.userInfo, this.newUserInfo);
        });
      }
    },
    cancleChangeInfo() {
      this.isOnChangeInfo = 0;
      this.newUserInfo = Object.assign(this.newUserInfo, this.userInfo);
    },
    uploadClick() {
      this.$refs.updateImg.click();
    },
    openChangePsw() {
      this.$refs.changePsw.isOnChangePsw = 1;
    },
  },
  mounted() {
    let _this = this;
    this.$refs.updateImg.addEventListener(
      "change",
      debounce(function (e) {
        const file = e.target.files[0];
        console.log(file);
        upload_picture(file).then((res) => {
          _this.userImg = res.data.data + "?time=" + new Date().getTime();
        });
      }, 100)
    );
    get_user_info().then((res) => {
      let { companyPhone, companyName, companyIntroduction, linkman, phone } =
        res.data.data;
      this.newUserInfo = {
        companyPhone,
        companyName,
        companyIntroduction,
        linkman,
        phone,
      };
      this.userInfo = res.data.data;
      this.userImg = this.userInfo.image;
    });
  },
};
</script>

<style scoped>
.Account_settings {
  width: 1158px;
  background: #ffffff;
}
.userInfo {
  position: relative;
  margin-top: 50px;
  margin-left: 59px;
}
.wrapper {
  margin-top: 40px;
  margin-left: 75px;
}
.Account_settings .accountName {
  margin-bottom: 40px;
  height: 19px;
  font-size: 18px;
  font-weight: 400;
  color: #333333;
}
.Account_settings .changePsw {
  position: absolute;
  top: 0px;
  left: 288px;
  height: 17px;
  font-size: 16px;
  font-weight: 400;
  color: #387aff;
  cursor: pointer;
}
.Account_settings .userLogo .title {
  height: 19px;
  font-size: 18px;
  font-weight: 400;
  color: #333333;
}
.Account_settings .userLogo img {
  margin-top: 5px;
  margin-left: 90px;
  margin-bottom: 78px;
  width: 147px;
  height: 147px;
  border-radius: 50%;
}
.Account_settings .updateLogo {
  position: absolute;
  left: 193px;
  top: 240px;
  height: 17px;
  font-size: 16px;
  font-weight: 400;
  color: #666666;
  cursor: pointer;
}
.Account_settings .leftItem {
  width: 400px;
  margin-right: 175px;
}
.Account_settings .leftItem > div,
.Account_settings .rightItem > div {
  margin-bottom: 37px;
  font-size: 18px;
  font-weight: 400;
  color: #333333;
}
.Account_settings .rightItem > .changeInfo {
  height: 17px;
  font-size: 16px;
  font-weight: 400;
  color: #387aff;
  cursor: pointer;
}
.Account_settings .shopIntro .infoContent {
  position: relative;
  left: 92px;
  top: -20px;
  width: 306px;
}
</style>