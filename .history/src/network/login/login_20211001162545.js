import {requst} from "../requst.js";

export function loginRequest(account, password, role){
    // console.log("456");
    return requst({
        url:`/web/login/in`,
        method:"POST",
        data:{
            account,
            password,
            role,
        }
    });
}
