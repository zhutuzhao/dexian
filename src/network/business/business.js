import { requst } from "../requst.js";

export function get_all() {
  //获取所有的咨询信息
  const formdata = new FormData();
  formdata.append("id", localStorage.getItem("id"));
  return requst({
    url: `/api/web/consult/all`,
    method: "POST",
    data: formdata,
  });
}

export function get_no_reply() {
  //商家获取所有未回复的咨询
  const formdata = new FormData();
  formdata.append("id", localStorage.getItem("id"));
  return requst({
    url: `/api/web/consult/no_reply`,
    method: "POST",
    data: formdata,
  });
}

export function show_consult(consult_id) {
  //是否展示该条咨询
  return requst({
    url: `/api/web/consult/show`,
    method: "GET",
    params: {
      id: parseInt(consult_id),
    },
  });
}

export function delete_consult(consult_id) {
  //删除某条咨询
  const formdata = new FormData();
  formdata.append("id", localStorage.getItem("id"));
  formdata.append("consultId", consult_id);
  return requst({
    url: `/api/web/consult/delete`,
    method: "POST",
    data: formdata,
  });
}

export function search_consult(content) {
  //搜索咨询相关内容
  const formdata = new FormData();
  formdata.append("id", parseInt(localStorage.getItem("id")));
  formdata.append("content", content);
  return requst({
    url: `/api/web/consult/search`,
    method: "POST",
    data: formdata,
  });
}

export function reply_consult(consultId, reply) {
  //商家回复某条咨询
  const formdata = new FormData();
  formdata.append("id", parseInt(localStorage.getItem("id")));
  formdata.append("consultId", consultId);
  formdata.append("reply", reply);
  return requst({
    url: `/api/web/consult/reply`,
    method: "POST",
    data: formdata,
  });
}

export function get_user_info() {
  //获取用户信息
  return requst({
    url: `/api/web/right/edit`,
    method: "GET",
    params: {
      id: localStorage.getItem("id"),
      role: localStorage.getItem("role"),
    },
  });
}

export function change_user_info(userInfo) {
  //改变用户信息
  const formdata = new FormData();
  let {
    companyPhone,
    companyName,
    companyIntroduction,
    linkman,
    phone,
  } = userInfo;
  formdata.append("id", localStorage.getItem("id"));
  formdata.append("companyPhone", companyPhone);
  formdata.append("companyName", companyName);
  formdata.append("companyIntroduction", companyIntroduction);
  formdata.append("linkman", linkman);
  formdata.append("phone", phone);
  return requst({
    url: `/api/web/right/save`,
    method: "POST",
    data: formdata,
  });
}

export function change_user_psw(prePassword, sufPassword) {
  //改变用户密码
  const formdata = new FormData();
  formdata.append("account", localStorage.getItem("account"));
  formdata.append("prePassword", prePassword);
  formdata.append("sufPassword", sufPassword);
  return requst({
    url: `/api/web/right/password`,
    method: "POST",
    data: formdata,
  });
}

export function upload_picture(file) {
  //上传商家logo
  const formdata = new FormData();
  formdata.append("file", file);
  formdata.append("id", localStorage.getItem("id"));
  return requst({
    url: `/api/web/right/picture`,
    method: "POST",
    data: formdata,
  });
}

export function get_activity_list(status) {
  //获取活动列表
  return requst({
    url: `/api/web_public/get_activity_list`,
    method: "GET",
    params: {
      accountId: localStorage.getItem("id"),
      status: status,
    },
  });
}

export function modify_activity_status(activityId) {
  //获取活动列表
  return requst({
    url: `/api/web_public/modify_activity_status/${activityId}`,
    method: "PUT",
  });
}

export function delete_activity(activityId) {
  //删除活动
  return requst({
    url: `/api/web_public/delete_activity/${activityId}`,
    method: "DELETE",
  });
}

export function search_by_name(pageNum, pageSize, status, content) {
  //根据名字搜索
  const formdata = new FormData();
  formdata.append("pageNum", pageNum);
  formdata.append("pageSize", pageSize);
  formdata.append("status", status);
  formdata.append("content", content);
  formdata.append("accountId", localStorage.getItem("id"));
  return requst({
    url: `/api/web_public/search_by_name`,
    method: "POST",
    data: formdata,
  });
}

export function search_by_time(pageNum, pageSize, status, startTime, endTime) {
  //根据名字搜索
  const formdata = new FormData();
  formdata.append("pageNum", pageNum);
  formdata.append("pageSize", pageSize);
  formdata.append("status", status);
  formdata.append("startTime", startTime);
  formdata.append("endTime", endTime);
  formdata.append("accountId", localStorage.getItem("id"));
  return requst({
    url: `/api/web_public/search_by_time`,
    method: "POST",
    data: formdata,
  });
}

export function get_activity_details(activityId, pageNum) {
  //获取活动详情（包括报名表）
  return requst({
    url: `/api/web_public/get_activity_details/${activityId}/${pageNum}`,
    method: "GET",
  });
}

export function register_cancel(orderId) {
  //订单退款/退回报名表
  return requst({
    url: `/api/web_public/order/confirmCancel/${orderId}`,
    method: "DELETE",
  });
}

export function downloadTable() {
  //打印表格(导出订单信息为excel)
  let accountId = localStorage.getItem("id");
  return requst({
    url: `/api/merchant/order/export/${accountId}`,
    method: "GET",
    headers: {
      responseType: "blob",
      // responseType: "arraybuffer",
    },
  });
}
