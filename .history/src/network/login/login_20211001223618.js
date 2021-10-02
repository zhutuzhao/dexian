import {requst} from "../requst.js";

export function loginRequest(account, password, role){
    return requst({
        url:`api/web/login/in`,
        method:"POST",
        data:{
            account,
            password,
            role,
        }
    });
}
