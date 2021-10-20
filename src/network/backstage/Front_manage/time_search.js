import { requst } from "../../requst.js";

export function timeSearch(pageNum, pageSize, startTime, endTime) {
    var formdata = new FormData();
    formdata.append("pageNum", pageNum);
    formdata.append("pageSize", pageSize);
    formdata.append("startTime", startTime);
    formdata.append("endTime", endTime);
    return requst({
        url: '/api/management/banner/search_by_time',
        method: "POST",
        data: formdata,
    });
}