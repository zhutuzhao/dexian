<template>
  <div class="BaseInfo">
    <div>基本信息</div>
    <div class="requiredBox">
      <img src="~assets/img/business/optional_1.png" /><span>必填</span
      ><span>姓名：</span
      ><el-input
        class="required"
        placeholder="请输入"
        :disabled="true"
      ></el-input>
    </div>
    <div class="requiredBox">
      <img src="~assets/img/business/optional_1.png" /><span>必填</span
      ><span>电话：</span
      ><el-input
        class="required"
        placeholder="请输入"
        :disabled="true"
      ></el-input>
    </div>
    <div class="requiredBox">
      <img src="~assets/img/business/optional_1.png" /><span>必填</span
      ><span>性别：</span><el-radio label="男" :disabled="true">男</el-radio>
      <el-radio label="女" :disabled="true">女</el-radio>
    </div>
    <div class="requiredBox">
      <img src="~assets/img/business/optional_1.png" /><span>必填</span
      ><span>学校：</span
      ><el-input
        class="required"
        placeholder="请输入"
        :disabled="true"
      ></el-input>
    </div>
    <el-form class="requiredBox formBox">
      <el-form-item
        v-for="(item, index) in singleLine"
        :key="index + ' ' + item.propertyType"
        class="formItem singleLine"
        ><img
          v-if="item.isOptional == 0"
          src="~assets/img/business/option_selected_1.png"
          @click="changeOptional(item)"
        /><span v-else class="optional_img" @click="changeOptional(item)"></span
        ><span v-if="item.isOptional == 0">必填</span><span v-else>选填</span>
        <el-input
          class="form_input"
          placeholder="单行标题"
          v-model="item.property"
        ></el-input
        ><br />
        <el-input
          class="form_input"
          placeholder="单行输入"
          :disabled="true"
        ></el-input>
      </el-form-item>
      <el-form-item
        v-for="(item, index) in multiline"
        :key="index + ' ' + item.propertyType"
        class="formItem multiline"
        ><img
          v-if="item.isOptional == 0"
          src="~assets/img/business/option_selected_1.png"
          @click="changeOptional(item)"
        /><span v-else class="optional_img" @click="changeOptional(item)"></span
        ><span v-if="item.isOptional == 0">必填</span><span v-else>选填</span>
        <el-input
          class="form_input"
          placeholder="多行标题"
          v-model="item.property"
        ></el-input
        ><br />
        <el-input
          class="form_input"
          type="textarea"
          placeholder="多行输入"
          :disabled="true"
        ></el-input>
      </el-form-item>
      <el-form-item
        v-for="(item, index) in singleChoice"
        :key="index + ' ' + item.propertyType"
        class="formItem singleChoice"
        ><img
          v-if="item.isOptional == 0"
          src="~assets/img/business/option_selected_1.png"
          @click="changeOptional(item)"
        /><span v-else class="optional_img" @click="changeOptional(item)"></span
        ><span v-if="item.isOptional == 0">必填</span><span v-else>选填</span>
        <el-input
          class="form_input"
          placeholder="单项选择标题"
          v-model="item.property"
        ></el-input>
        <div class="choices">
          <el-tag
            v-for="(tag, index) in item.content"
            :key="tag"
            closable
            :disable-transitions="false"
            @close="handleClose(item.content, index)"
          >
            {{ tag }}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible_singleChoice[index]"
            v-model="inputValue_singleChoice[index]"
            :ref="'saveTagInput_singleChoice' + index"
            size="small"
            @keyup.enter.native="
              handleInputConfirm_singleChoice(item.content, index)
            "
          >
          </el-input
          ><img
            v-else
            class="button-new-tag"
            @click="showInput_singleChoice(index)"
            src="~assets/img/business/add_input_1.png"
          />
        </div>
      </el-form-item>
      <el-form-item
        v-for="(item, index) in multiChoice"
        :key="index + ' ' + item.propertyType"
        class="formItem multiChoice"
        ><img
          v-if="item.isOptional == 0"
          src="~assets/img/business/option_selected_1.png"
          @click="changeOptional(item)"
        /><span v-else class="optional_img" @click="changeOptional(item)"></span
        ><span v-if="item.isOptional == 0">必填</span><span v-else>选填</span>
        <el-input
          class="form_input"
          placeholder="多项选择标题"
          v-model="item.property"
        ></el-input>
        <div class="choices">
          <el-tag
            v-for="(tag, index) in item.content"
            :key="tag"
            closable
            :disable-transitions="false"
            @close="handleClose(item.content, index)"
          >
            {{ tag }}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible_multiChoice[index]"
            v-model="inputValue_multiChoice[index]"
            :ref="'saveTagInput_multiChoice' + index"
            size="small"
            @keyup.enter.native="
              handleInputConfirm_multiChoice(item.content, index)
            "
          >
          </el-input
          ><img
            v-else
            class="button-new-tag"
            @click="showInput_multiChoice(index)"
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
        <div @click="add_singleLine">单行文本框</div>
        <div @click="add_multiline">多行文本框</div>
      </div>
      <div class="userDefined">
        <div @click="add_singleChoice">单项选择框</div>
        <div @click="add_multiChoice">多项选择框</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseInfo",
  data() {
    return {
      inputVisible_singleChoice: [],
      inputValue_singleChoice: [],
      inputVisible_multiChoice: [],
      inputValue_multiChoice: [],
      singleLine: [
        // {
        //   isOptional: 0,
        //   property: "单行选项名",
        //   content: [],
        //   propertyType: 0,
        // },
      ],
      multiline: [
        // {
        //   isOptional: 0,
        //   property: "多行选项名",
        //   content: [],
        //   propertyType: 1,
        // },
      ],
      singleChoice: [
        // {
        //   isOptional: 0,
        //   property: "单项选项名",
        //   content: [],
        //   propertyType: 2,
        // },
      ],
      multiChoice: [
        // {
        //   isOptional: 0,
        //   property: "多项选项名",
        //   content: [],
        //   propertyType: 3,
        // },
      ],
    };
  },
  methods: {
    handleClose(content, index) {
      content.splice(index, 1);
    },
    showInput_singleChoice(index) {
      console.log(this);
      console.log(index);
      let name_ref = "saveTagInput_singleChoice" + index;
      this.inputVisible_singleChoice.splice(index, 1, true);
      this.$nextTick(() => {
        console.log(this);
        this.$refs[name_ref][0].$refs.input.focus();
      });
    },
    showInput_multiChoice(index) {
      let name_ref = "saveTagInput_multiChoice" + index;
      console.log(index);
      this.inputVisible_multiChoice.splice(index, 1, true);
      this.$nextTick(() => {
        this.$refs[name_ref][0].$refs.input.focus();
      });
    },
    handleInputConfirm_singleChoice(content, index) {
      let inputValue = this.inputValue_singleChoice[index];
      if (inputValue) {
        content.push(inputValue);
      }
      this.inputVisible_singleChoice[index] = false;
      this.inputValue_singleChoice[index] = "";
    },
    handleInputConfirm_multiChoice(content, index) {
      let inputValue = this.inputValue_multiChoice[index];
      if (inputValue) {
        content.push(inputValue);
      }
      this.inputVisible_multiChoice[index] = false;
      this.inputValue_multiChoice[index] = "";
    },
    changeOptional(item) {
      item.isOptional = item.isOptional == 0 ? 1 : 0;
    },
    add_singleLine() {
      // console.log("12");
      this.singleLine.push({
        isOptional: 0,
        property: "单行选项名",
        content: [],
        propertyType: 0,
      });
    },
    add_multiline() {
      // console.log("12");
      this.multiline.push({
        isOptional: 0,
        property: "多行选项名",
        content: [],
        propertyType: 1,
      });
    },
    add_singleChoice() {
      this.singleChoice.push({
        isOptional: 0,
        property: "单项选项名",
        content: [],
        propertyType: 2,
      });
      this.inputVisible_singleChoice.push(false);
      this.inputValue_singleChoice.push("");
    },
    add_multiChoice() {
      this.multiChoice.push({
        isOptional: 0,
        property: "多项选项名",
        content: [],
        propertyType: 3,
      });
      this.inputVisible_multiChoice.push(false);
      this.inputValue_multiChoice.push("");
    },
  },
};
</script>

<style scoped>
.BaseInfo {
  padding-top: 30px;
  position: relative;
  min-height: 650px;
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
  width: 45%;
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
.optional_img {
  padding: 0 !important;
  margin: 0 !important;
  display: inline-block;
  width: 22px;
  height: 22px;
  border: 1px solid #666666;
  border-radius: 4px;
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
</style>