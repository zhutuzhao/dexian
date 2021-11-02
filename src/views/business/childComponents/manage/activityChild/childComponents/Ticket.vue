<template>
  <div class="Ticket">
    <div class="title">票种消息：</div>
    <div>
      <el-button class="free_ticket"
        ><img src="~assets/img/business/add_1.png" /> 免费票</el-button
      ><el-button class="pay_ticket"
        ><img src="~assets/img/business/add_1.png" /> 付费票</el-button
      >
    </div>
    <table>
      <tr>
        <th></th>
        <th>票种类型</th>
        <th>票种名称</th>
        <th>价格（元）</th>
        <th>票数</th>
        <th>退款设置<img src="~assets/img/business/refund_1.png" alt="" /></th>
        <th>操作</th>
      </tr>
      <tr>
        <td class="ticket_index"><div>1</div></td>
        <td>免费票</td>
        <td>
          <el-input class="ticket_name" placeholder="例：正式票"></el-input>
        </td>
        <td>
          <el-input class="ticket_price"></el-input>
        </td>
        <td>
          <el-input class="ticket_num"></el-input>
        </td>
        <td>
          <el-select class="refund" v-model="refund_value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </td>
        <td class="refund_option"><span class="delete">删除</span></td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "Ticket",
  data() {
    return {
      refund_value: 0,
      options: [
        { label: "无条件退款", value: 0 },
        { label: "不能退款", value: 1 },
      ],
    };
  },
};
</script>

<style scoped>
.Ticket {
  padding-top: 30px;
  position: relative;
  min-height: 280px;
}
.Ticket::before {
  position: absolute;
  left: -10px;
  top: 0;
  content: "";
  display: block;
  width: 1158px;
  height: 8px;
  background: #f5f5f5;
}
.free_ticket,
.pay_ticket {
  padding: 10px;
  border: 1px solid #ff8900;
  border-radius: 4px;
  font-size: 18px;
  color: #ff8900;
}
.free_ticket {
  margin: 18px 26px 0 42px;
}
tr {
  text-align: center;
}
th {
  padding-top: 30px;
}
th img {
  position: relative;
  top: -2px;
  margin-left: 8px;
  vertical-align: middle;
}
td:not(:first-child) {
  padding: 8px 25px;
  text-align: center;
}
td:first-child {
  padding-right: 15px;
}
.ticket_index div {
  width: 20px;
  height: 20px;
  border: 1px solid #ff8900;
  border-radius: 50%;
  font-weight: bold;
  color: #ff8900;
}
.ticket_name {
  width: 124px;
  height: 38px;
}
.ticket_price,
.ticket_num {
  width: 72px;
  height: 38px;
}

.refund {
  width: 135px;
  height: 38px;
}
.refund_option {
  width: 300px;
}
.delete {
  color: #fa4040;
  cursor: pointer;
}
</style>