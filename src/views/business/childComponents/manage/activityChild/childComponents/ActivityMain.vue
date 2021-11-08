<template>
  <div class="ActivityMain">
    <div class="item">
      <div class="organiser"><span>主办方：</span><span></span></div>
      <div>
        <span class="acti_name">活动名称：</span
        ><input
          class="acti_name_input"
          placeholder="请输入活动名称"
          type="text"
          v-model="main_info.activityName"
        /><span class="acti_peo">活动人数：</span
        ><input
          class="acti_peo_input"
          placeholder="请输入活动人数"
          type="text"
          v-model="main_info.activityNumber"
        />
      </div>
      <div class="acti_pos">
        <span>活动地址：</span
        ><input
          placeholder="请尽量详细"
          type="text"
          v-model="main_info.address"
        />
      </div>
      <div class="acti_reg_end">
        <span>报名截止日期：</span
        ><el-date-picker
          class="date"
          v-model="registrationDeadline[0]"
          type="date"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
        <span>时间：</span
        ><el-time-picker
          class="time"
          value-format="HH:mm:ss"
          v-model="registrationDeadline[1]"
        >
        </el-time-picker>
      </div>
      <div class="acti_beg">
        <span>活动开始日期：</span
        ><el-date-picker
          class="date"
          v-model="startTime[0]"
          type="date"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
        <span>时间：</span
        ><el-time-picker
          class="time"
          value-format="HH:mm:ss"
          v-model="startTime[1]"
        >
        </el-time-picker>
      </div>
      <div class="acti_end">
        <span>活动结束日期：</span
        ><el-date-picker
          class="date"
          v-model="endTime[0]"
          type="date"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
        <span>时间：</span
        ><el-time-picker
          class="time"
          value-format="HH:mm:ss"
          v-model="endTime[1]"
        >
        </el-time-picker>
      </div>
    </div>
    <div class="item">
      <div class="acti_label">
        <span>活动标签：</span>
        <el-input
          placeholder="活动标签输入文字后按Enter添加，最多三个，自定义输入标签(最多五字）"
          v-model="inputValue"
          @keyup.enter.native="handleInputConfirm"
        >
        </el-input>
        <el-tag
          :key="tag"
          v-for="tag in main_info.label"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
        >
          {{ tag }}
        </el-tag>
      </div>
      <div class="acti_highlight">
        <span>活动亮点：</span
        ><textarea v-model="main_info.lightSpot"></textarea>
      </div>
      <div class="acti_poster">
        <span>活动海报：</span
        ><input style="display: none" type="file" accept="image/*" />
        <div class="up_acti_img">
          <el-upload
            action="https://www.quyo.fun/party/web_public/upload_picture"
            :show-file-list="false"
            :on-success="posterImageSuccess"
            :headers="header"
          >
            <img v-if="main_info.posterImage" :src="main_info.posterImage" />
            <div v-else>
              <img src="~assets/img/business/up_acti_img_1.png" alt="" />
              <div>点击上传图片</div>
            </div>
          </el-upload>
          <div>
            <div>
              <p>1、图片尺寸1080*640，,jpg或.png格式，不超过4M；</p>
              <p>2、精美海报有助于增加报名量，并有机会获得推荐!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="item">
      <div class="acti_details">
        <span>活动详情：</span>
        <quill-editor
          class="quillEditor"
          v-model="main_info.activityDetails"
          ref="myQuillEditor"
          :options="editorOption"
        >
        </quill-editor>
      </div>
      <div>
        <span>活动须知：</span>
        <div class="know">
          <div class="attention">
            <span>注意事项</span>
            <el-input type="textarea" v-model="main_info.announcement">
            </el-input>
          </div>
          <div class="director">
            <span>负责人微信</span>
            <el-upload
              action="https://www.quyo.fun/party/web_public/upload_picture"
              :show-file-list="false"
              :on-success="linkmanCodeSuccess"
              :headers="header"
            >
              <img v-if="main_info.linkmanCode" :src="main_info.linkmanCode" />
              <div v-else></div>
            </el-upload>
          </div>
          <div class="wechat_group">
            <span>活动微信群</span>
            <el-upload
              action="https://www.quyo.fun/party/web_public/upload_picture"
              :show-file-list="false"
              :on-success="groupCodeSuccess"
              :headers="header"
            >
              <img v-if="main_info.groupCode" :src="main_info.groupCode" />
              <div v-else></div>
            </el-upload>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { quillEditor } from "vue-quill-editor";
// import Quill from "quill"; //引入编辑器
export default {
  name: "ActivityMain",
  components: { quillEditor },
  data() {
    return {
      main_info: {
        activityName: "",
        activityNumber: "",
        address: "",
        registrationDeadline: "",
        startTime: "",
        endTime: "",
        label: [],
        lightSpot: "",
        posterImage: "",
        activityDetails: "",
        announcement: `1、活动开始前到场，开始后不允许进入,若出现不能及时到
达的情况请联系负责人； 
2、进入前在门口领取身份卡；
3、报名后请添加活动微信群，以方便联系；
4、若还有不解，请添加负责人微信。`,
        linkmanCode: "",
        groupCode: "",
      },
      header: {
        token: localStorage.getItem("Authorization"),
      },
      registrationDeadline: ["", ""],
      startTime: ["", ""],
      endTime: ["", ""],
      inputValue: "",
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
            ["blockquote", "code-block"], // 引用  代码块
            [{ header: 1 }, { header: 2 }], // 1、2 级标题
            [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表
            [{ script: "sub" }, { script: "super" }], // 上标/下标
            [{ indent: "-1" }, { indent: "+1" }], // 缩进
            // [{'direction': 'rtl'}],                         // 文本方向
            [{ size: ["small", false, "large", "huge"] }], // 字体大小
            [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
            [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
            [{ font: [] }], // 字体种类
            [{ align: [] }], // 对齐方式
            ["clean"], // 清除文本格式
            ["link", "image", "video"], // 链接、图片、视频
          ], //工具菜单栏配置
        },
        placeholder: "请在这里添加产品描述", //提示
        readyOnly: false, //是否只读
        theme: "snow", //主题 snow/bubble
        syntax: true, //语法检测
      },
    };
  },
  methods: {
    linkmanCodeSuccess(res, file) {
      this.main_info.linkmanCode = res.data;
    },
    groupCodeSuccess(res, file) {
      this.main_info.groupCode = res.data;
    },
    posterImageSuccess(res, file) {
      this.main_info.posterImage = res.data;
    },
    handleClose(tag) {
      this.main_info.label.splice(this.main_info.label.indexOf(tag), 1);
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.main_info.label.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
  },
  watch: {
    registrationDeadline(val) {
      this.main_info.registrationDeadline = val.join(" ");
    },
    startTime(val) {
      this.main_info.startTime = val.join(" ");
    },
    endTime(val) {
      this.main_info.endTime = val.join(" ");
    },
  },
};
</script>

<style>
.item {
  position: relative;
}
.item:not(:last-child):after {
  position: absolute;
  bottom: 0px;
  left: -10px;
  content: "";
  display: block;
  height: 2px;
  width: calc(100% + 10px);
  background: #f5f5f5;
}
.organiser {
  margin-left: 20px;
}
.item > div {
  padding-bottom: 30px;
}
.item .acti_peo {
  margin-left: 143px;
}
.acti_reg_end > span:not(:first-child),
.acti_beg > span:not(:first-child),
.acti_end > span:not(:first-child) {
  margin-left: 69px;
}
input {
  height: 34px;
  background: #f5f5f5;
  border: 1px solid #999999;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 400;
  text-indent: 8px;
  outline: none;
}
.acti_name_input {
  width: 192px;
}
.acti_peo_input {
  width: 132px;
}
.acti_pos input {
  width: 952px;
}
.acti_reg_end .date,
.acti_beg .date,
.acti_end .date {
  width: 261px;
}
.acti_reg_end .time,
.acti_beg .time,
.acti_end .time {
  width: 192px;
}
.acti_label {
  display: flex;
  margin-top: 24px;
  flex-wrap: wrap;
}
/* .acti_label span {
  display: inline-block;
  min-width: 80px;
  min-height: 40px;
} */
.acti_label .el-input {
  margin-right: 100px;
  /* position: relative;
  font-size: 14px;
  display: inline-block; */
  width: 952px;
}
.acti_highlight textarea {
  padding: 10px;
  width: 952px;
  height: 119px;
  background: #f5f5f5;
  border: 1px solid #999999;
  border-radius: 6px;
  vertical-align: top;
  resize: none;
  outline: none;
}
.acti_poster .up_acti_img {
  margin-top: 37px;
  margin-left: 80px;
  display: flex;
  justify-content: left;
  align-items: center;
}
.up_acti_img > div {
  width: 413px;
  height: 245px;
}
.up_acti_img > div:last-child {
  display: flex;
  justify-content: left;
  align-items: center;
  flex-wrap: wrap;
}
.up_acti_img > div {
  margin-right: 28px;
}
.up_acti_img > div:first-child {
  border: 1px solid #999999;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.up_acti_img > div > div > img {
  width: 413px;
  height: 245px;
}
.acti_details {
  margin-top: 42px;
}
.acti_details .quillEditor {
  display: inline-block;
  /* padding: 10px; */
  width: 952px;
  /* height: 298px; */
  /* background: #f5f5f5;
  border: 1px solid #999999; */
  border-radius: 6px;
  vertical-align: top;
  /* resize: none; */
  /* outline: none; */
}
.attention span {
  font-size: 18px;
  color: #fa4040;
}
.attention textarea {
  padding: 15px;
  margin-top: 20px;
  width: 444px;
  height: 232px;
  background: #f5f5f5;
  border: 1px solid #999999;
  border-radius: 6px;
}
.director div,
.wechat_group div {
  position: relative;
  width: 232px;
  height: 232px;
  background: #f5f5f5;
}
.director > div,
.wechat_group > div {
  margin-top: 20px;
}
.director img,
.wechat_group img {
  width: 232px;
  height: 232px;
}
.director div div div::before,
.wechat_group div div div::before,
.director div div div::after,
.wechat_group div div div::after {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  content: "";
  display: block;
  width: 102px;
  height: 4px;
  background: #d7d7d7;
}
.director div div div::after,
.wechat_group div div div::after {
  width: 4px;
  height: 102px;
}
.know {
  padding-left: 50px;
  padding-right: 90px;
  display: flex;
  justify-content: space-around;
}
</style>