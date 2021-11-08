<template>
  <div class="Ticket">
    <div class="title">票种消息：</div>
    <div>
      <el-button class="free_ticket" @click="free_ticket"
        ><img src="~assets/img/business/add_1.png" /> 免费票</el-button
      ><el-button class="pay_ticket" @click="pay_ticket"
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
      <tr
        v-for="(item, index) in ticketList"
        :key="item.ticketType + ' ' + index"
      >
        <td class="ticket_index">
          <div>{{ index - -1 }}</div>
        </td>
        <td>{{ item.ticketType == 0 ? "免费票" : "付费票" }}</td>
        <td>
          <el-input
            class="ticket_name"
            placeholder="例：正式票"
            v-model="item.ticketName"
          ></el-input>
        </td>
        <td>
          <el-input
            v-if="item.ticketType == 1"
            class="ticket_price"
            v-model="item.ticketPrice"
          ></el-input>
          <div class="ticket_price" v-else>不可选</div>
        </td>
        <td>
          <el-input class="ticket_num" v-model="item.ticketNumber"></el-input>
        </td>
        <td>
          <el-select
            class="refund"
            v-model="item.ticketRefundType"
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </td>
        <td class="option">
          <span class="delete" @click="delete_ticket(index)">删除</span>
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  name: "Ticket",
  data() {
    return {
      ticketList: [],
      options: [
        { label: "不可退款", value: 0 },
        { label: "委托平台退款", value: 1 },
        { label: "无条件退款", value: 2 },
      ],
    };
  },
  methods: {
    delete_ticket(index) {
      this.ticketList.splice(index, 1);
    },
    free_ticket() {
      this.ticketList.push({
        ticketType: 0,
        ticketName: "免费票",
        ticketPrice: 0,
        ticketNumber: 0,
        ticketInstructions: "无",
        ticketRefundType: 0,
        ticketRefundReason: "无",
      });
    },
    pay_ticket() {
      this.ticketList.push({
        ticketType: 1,
        ticketName: "",
        ticketPrice: 0,
        ticketNumber: 0,
        ticketInstructions: "无",
        ticketRefundType: 0,
        ticketRefundReason: "无",
      });
    },
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
table {
  min-width: 80%;
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
}

.refund {
  width: 135px;
}
.option {
  width: 300px;
}
.delete {
  color: #fa4040;
  cursor: pointer;
}
</style>