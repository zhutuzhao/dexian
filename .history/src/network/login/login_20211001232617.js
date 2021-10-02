import {requst} from "../requst.js";

export function loginRequest(account, password, role){
    var formdata = new FormData();
    formdata.append("account",account);
    formdata.append("password",password);
    formdata.append("role",role);
    return requst({
        url:`api/web/login/in`,
        method:"POST",
        data:formdata,
    });
}
