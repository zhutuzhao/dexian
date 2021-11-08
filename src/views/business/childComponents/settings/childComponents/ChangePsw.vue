<template>
  <div v-if="isOnChangePsw" class="wrapper">
    <div class="changePswBox">
      <div class="title">修改密码</div>
      <div class="content">
        <div class="pre">
          <span>原始密码</span
          ><input ref="pre" v-model="prePsw" type="password" />
        </div>
        <div class="new">
          <span>新的密码</span>
          <input ref="new" v-model="newPsw" type="password" />
        </div>
        <div class="new">
          <span>确定密码</span>
          <input v-model="newPsw_again" type="password" />
        </div>
        <button @click="closeChangePsw">取消</button
        ><button :disabled="!(prePsw && newPsw)" @click="changeUserPsw">
          确定
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { change_user_psw } from "network/business/business.js";
export default {
  name: "ChangePsw",
  data() {
    return {
      prePsw: "",
      newPsw: "",
      newPsw_again: "",
      isOnChangePsw: 0,
    };
  },
  methods: {
    changeUserPsw() {
      if (this.newPsw != this.newPsw_again) {
        alert("密码前后不一致");
        return;
      }
      change_user_psw(this.prePsw, this.newPsw).then((res) => {
        console.log(res.data.msg);
        if (res.data.msg == "success") {
          this.closeChangePsw();
        }
      });
    },
    closeChangePsw() {
      this.isOnChangePsw = 0;
    },
  },
};
</script>

<style scoped>
@import "~assets/css/account.css";
.changePswBox {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 480px;
  height: 320px;
  background: #ffffff;
  border: 2px solid #d7d7d7;
  box-shadow: 0px 3px 15px 3px rgba(0, 0, 0, 0.03);
  border-radius: 4px;
}
.changePswBox .title::after {
  width: 450px;
}
.changePswBox .content {
  margin-left: 50px;
}
.changePswBox .content button {
  margin-left: 82px;
}
.pre input,
.new input {
  position: relative;
}
</style>