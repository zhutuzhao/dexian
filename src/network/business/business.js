import { requst } from "../requst.js";

// export function searchByTime(startTime, endTime, pageNum, pageSize, status) {
//   var formdata = new FormData();
//   formdata.append("accountId", localStorage.getItem("id"));
//   formdata.append("startTime", startTime);
//   formdata.append("endTime", endTime);
//   formdata.append("pageNum", pageNum);
//   formdata.append("pageSize", pageSize);
//   formdata.append("status", status);
//   return requst({
//     url: `/api/merchant/order/searchByTime`,
//     method: "POST",
//     data: formdata,
//   });
// }
//
// export function get_activity_list() {
//   return requst({
//     url: `/api/web_public/get_activity_list`,
//     method: "GET",
//     params: {
//       accountId: localStorage.getItem("id"),
//     //   accountId: 48,
//       status: 0,
//     },
//   });
// }
