import { requst } from "../../requst.js";

export function contentSearch(pageNum, pageSize, content) {
    var formdata = new FormData();
    formdata.append("pageNum", pageNum);
    formdata.append("pageSize", pageSize);
    formdata.append("content", content);
    return requst({
        url: '/api/management/banner/search_by_name',
        method: "POST",
        data: formdata,
    });
}