<template>
  <div class="BaseInfo">
    <div>基本信息</div>
    <div class="requiredBox">
      <img src="~assets/img/business/optional_1.png" /><span>必填</span
      ><span>姓名：</span
      ><el-input class="required" placeholder="请输入"></el-input>
    </div>
    <div class="requiredBox">
      <img src="~assets/img/business/optional_1.png" /><span>必填</span
      ><span>电话：</span
      ><el-input class="required" placeholder="请输入"></el-input>
    </div>
    <div class="requiredBox">
      <img src="~assets/img/business/optional_1.png" /><span>必填</span
      ><span>性别：</span><el-radio v-model="xxx" label="男">男</el-radio>
      <el-radio v-model="xxx" label="女">女</el-radio>
    </div>
    <div class="requiredBox">
      <img src="~assets/img/business/optional_1.png" /><span>必填</span
      ><span>学校：</span
      ><el-input class="required" placeholder="请输入"></el-input>
    </div>
    <el-form class="requiredBox formBox">
      <el-form-item class="formItem singleLine"
        ><img src="~assets/img/business/option_selected_1.png" /><span
          >选填</span
        >
        <el-input class="form_input" placeholder="单行标题"></el-input><br />
        <el-input class="form_input" placeholder="单行输入"></el-input>
      </el-form-item>
      <el-form-item class="formItem multiline"
        ><img src="~assets/img/business/option_selected_1.png" /><span
          >选填</span
        >
        <el-input class="form_input" placeholder="多行标题"></el-input><br />
        <el-input
          class="form_input"
          type="textarea"
          placeholder="多行输入"
        ></el-input>
      </el-form-item>
      <el-form-item class="formItem singleChoice"
        ><img src="~assets/img/business/option_selected_1.png" /><span
          >选填</span
        >
        <el-input class="form_input" placeholder="单项选择标题"></el-input>
        <div class="choices">
          <el-tag
            :key="tag"
            v-for="tag in dynamicTags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
          >
            {{ tag }}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input
          ><img
            v-else
            class="button-new-tag"
            size="small"
            @click="showInput"
            src="~assets/img/business/add_input_1.png"
          />
        </div>
      </el-form-item>
      <el-form-item class="formItem singleChoice"
        ><img src="~assets/img/business/option_selected_1.png" /><span
          >选填</span
        >
        <el-input class="form_input" placeholder="多项选择标题"></el-input>
        <div class="choices">
          <el-tag
            :key="tag"
            v-for="tag in dynamicTags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
          >
            {{ tag }}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input
          ><img
            v-else
            class="button-new-tag"
            size="small"
            @click="showInput"
            src="~assets/img/business/add_input_1.png"
          />
        </div>
      </el-form-item>
      <el-form-item>
        <el-button>查看表单</el-button>
      </el-form-item>
    </el-form>
    <div class="sigleWrapper">
      <div class="title">基础信息项</div>
      <div class="base">
        <div>QQ</div>
        <div>邮箱</div>
      </div>
      <div class="base">
        <div>微信</div>
        <div>年龄</div>
      </div>
      <div class="title">自定义项</div>
      <div class="userDefined">
        <div>单行文本框</div>
        <div>多行文本框</div>
      </div>
      <div class="userDefined">
        <div>单项选择框</div>
        <div>多项选择框</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseInfo",
  data() {
    return {
      xxx: "男",
      dynamicTags: [],
      inputVisible: false,
      inputValue: "",
    };
  },
  methods: {
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
  },
};
</script>

<style scoped>
.BaseInfo {
  padding-top: 30px;
  position: relative;
  min-height: 450px;
}
.BaseInfo::before {
  position: absolute;
  left: -10px;
  top: 0;
  content: "";
  display: block;
  width: 1158px;
  height: 8px;
  background: #f5f5f5;
}
.BaseInfo > div:first-child {
  margin-bottom: 32px;
}
.requiredBox {
  margin-left: 100px;
  margin-bottom: 20px;
}
.requiredBox span {
  font-size: 16px;
  margin: 0 8px;
}
.requiredBox img {
  height: 22px;
  vertical-align: middle;
}
.required {
  width: 270px;
  height: 34px;
}
.form_input {
  margin-left: 20px;
  width: 314px;
}
.form_input:not(:first-of-type) {
  margin-left: 90px;
  margin-top: 10px;
}
.formBox .formItem {
  margin-top: 28px;
}
.choices {
  margin-left: 70px;
}

.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.el-button,
.el-button:focus,
.el-button:hover {
  color: #fff;
  border-color: #f59320;
  background-color: #f59320;
}
.sigleWrapper {
  position: absolute;
  top: 78px;
  left: 615px;
  width: 433px;
  height: 525px;
  /* background: #ffffff; */
  border: 1px solid #999999;
  border-radius: 10px;
}
.sigleWrapper .title {
  margin-top: 20px;
  margin-bottom: 30px;
  text-indent: 21px;
}
.sigleWrapper .title:not(:first-child) {
  margin-top: 50px;
}
.sigleWrapper .base,
.sigleWrapper .userDefined {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
}
.sigleWrapper .base div,
.sigleWrapper .userDefined div {
  width: 141px;
  height: 47px;
  line-height: 47px;
  background: #f5ac56;
  border-radius: 4px;
  text-align: center;
  font-size: 20px;
  color: #ffffff;
  cursor: pointer;
}
/*  */
</style>