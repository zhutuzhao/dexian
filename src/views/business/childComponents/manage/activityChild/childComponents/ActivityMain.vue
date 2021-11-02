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
        /><span class="acti_peo">活动人数：</span
        ><input
          class="acti_peo_input"
          placeholder="请输入活动人数"
          type="text"
        />
      </div>
      <div class="acti_pos">
        <span>活动地址：</span><input placeholder="请尽量详细" type="text" />
      </div>
      <div class="acti_reg_end">
        <span>活动截止日期：</span
        ><el-date-picker class="date" v-model="end_date" type="date">
        </el-date-picker>
        <span>时间：</span
        ><el-time-picker class="time" v-model="end_time"> </el-time-picker>
      </div>
      <div class="acti_beg">
        <span>活动开始日期：</span
        ><el-date-picker class="date" v-model="beg_date" type="date">
        </el-date-picker>
        <span>时间：</span
        ><el-time-picker class="time" v-model="beg_time"> </el-time-picker>
      </div>
    </div>
    <div class="item">
      <div class="acti_label">
        <span>活动标签：</span
        ><input
          placeholder="活动标签输入文字后按Enten添加，最多三个，自定义输入标签(最多五字）"
          type="text"
        />
      </div>
      <div class="acti_highlight">
        <span>活动亮点：</span><textarea></textarea>
      </div>
      <div class="acti_poster">
        <span>活动海报：</span
        ><input style="display: none" type="file" accept="image/*" />
        <div class="up_acti_img">
          <div>
            <img src="~assets/img/business/up_acti_img_1.png" alt="" />
            <div>点击上传图片</div>
          </div>
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
        <span>活动详情：</span><textarea></textarea>
      </div>
      <div>
        <span>活动须知：</span>
        <div class="know">
          <div class="attention">
            <span>注意事项</span>
            <div>
              1、活动开始前到场，开始后不允许进入,若出现不能及时到
              达的情况请联系负责人； <br />2、进入前在门口领取身份卡；<br />
              3、报名后请添加活动微信群，以方便联系；<br />
              4、若还有不解，请添加负责人微信。
            </div>
          </div>
          <div class="director">
            <span>负责人微信</span>
            <div></div>
          </div>
          <div class="wechat_group">
            <span>活动微信群</span>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ActivityMain",
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
.acti_beg > span:not(:first-child) {
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
.acti_beg .date {
  width: 261px;
}
.acti_reg_end .time,
.acti_beg .time {
  width: 192px;
}
.acti_label {
  margin-top: 24px;
}
.acti_label input {
  width: 952px;
}
.acti_label input {
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
  padding-top: 73px;
  border: 1px solid #999999;
  text-align: center;
}

.up_acti_img > div:first-child div {
  margin-top: 21px;
}
.acti_details {
  margin-top: 42px;
}
.acti_details textarea {
  padding: 10px;
  width: 952px;
  height: 298px;
  background: #f5f5f5;
  border: 1px solid #999999;
  border-radius: 6px;
  vertical-align: top;
  resize: none;
  outline: none;
}
.attention span {
  font-size: 18px;
  color: #fa4040;
}
.attention div {
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
  margin-top: 20px;
  position: relative;
  width: 232px;
  height: 232px;
  background: #f5f5f5;
}
.director div::before,
.wechat_group div::before,
.director div::after,
.wechat_group div::after {
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
.director div::after,
.wechat_group div::after {
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