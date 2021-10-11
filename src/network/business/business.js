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
