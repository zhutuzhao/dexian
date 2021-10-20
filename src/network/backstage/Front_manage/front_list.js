import { requst } from "../../requst.js";

export function frontList(pageNum, pageSize) {
    var formdata = new FormData();
    formdata.append("pageNum", pageNum);
    formdata.append("pageSize", pageSize);
    return requst({
        url: '/api/management/banner/get_recommend_list',
        method: "GET",
        data: formdata,
    });
}