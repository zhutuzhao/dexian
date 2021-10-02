<template>
<div class="Login">
    <img class="background-pic" src="../../assets/img/login/background.png" alt="">
    <div class="main-container">
        <div class="main-pic">
            <img src="../../assets/img/login/mainpic.png" alt="">
        </div>
        <div class="Login-contianer">
            <div class="title">得闲管理系统</div>
            <div class="option">
                <div ref="business" class="shangjia pressed" @click="switchToShang">商家</div>
                <div ref="admin" class="guanliyuan" @click="switchToGuan">管理员</div>
            </div>
            <div class="input userName">
                <img class="pic" src="../../assets/img/login/username.png" alt="">
                <input type="text" placeholder="请输入账号" v-model="account">
            </div>
            <div class="input passWord">
                <img class="pic" src="../../assets/img/login/password.png" alt="">
                <input type="password" placeholder="请输入密码" v-model="password">
            </div>
            <div class="Login-button" @click="loginAccount">登录</div>
            <div ref="username" class="warning username"><img src="../../assets/img/login/warning.png" alt=""><div class="content">不存在该用户</div></div>
            <div ref="password" class="warning password"><img src="../../assets/img/login/warning.png" alt=""><div class="content">密码错误</div></div>
        </div>
    </div>
</div>
</template>

<script>
import {loginRequest} from "../../network/login/login.js";

export default {
    name:"Login",
    data(){
        return{
            loginConfig:{
                account,
                password,
                role:"1",
            },
            res,
        }
    },
    methods:{
        async loginAccount(){
            console.log(this.loginConfig.role);
            this.res = await loginRequest(this.loginConfig.account,this.loginConfig.password,this.loginConfig.role);
            console.log(this.res);
        },
        switchToShang(){
            console.log("1");
            this.loginConfig.role = "1";
            this.$refs.business.className = "shangjia pressed";
            this.$refs.admin.className = "guanliyuan";
        },
        switchToGuan(){
            console.log("0");
            this.loginConfig.role = "0";
            this.$refs.admin.className = "guanliyuan pressed";
            this.$refs.business.className = "shangjia";
        }
    },
    mounted:{
        
    }
}
</script>

<style scoped>
.Login{
    position: relative;
    overflow: hidden;
    width: 1440px;
    height: 900px;
    padding-top: 142px;
}
.background-pic{
    position: absolute;
    left: -200px;
    top: -40px;
    z-index: -1;
    width: 1680px;
}
.main-container{
    width: 1280px;
    height: 614px;
    background-color: antiquewhite;
    margin: 0 auto;
    display: flex;
    box-shadow: 0 0 20px hsl(34, 100%, 21% ,25%);
}
.main-pic{
    background-color: #f7ad54;
}
.main-pic img{
    width: 544px;
    height: 385px;
    margin: 115px 82px;
}
.Login-contianer{
    position: relative;
    width: 572px;
    height: 616px;
    background-color: #fff;
}
.Login-contianer .title{
    margin: 40px 172px 101px;
    color: #FF8900;
    font-size: 38px;
    cursor: default;
}
/* 选择商家还是管理员 */
.Login-contianer .option{
    margin: 0 192px 63px;
    display: flex;
    justify-content: space-between;
}
.Login-contianer .option .shangjia,
.Login-contianer .option .guanliyuan
{
    position: relative;
    padding-bottom: 7px;
    font-size: 18px;
    color: #666666;
    cursor: pointer; 
}
.Login-contianer .option .shangjia::before,
.Login-contianer .option .guanliyuan::before{
    position: absolute;
    left: 0;
    right: 0;
    top: 27px;
    margin: 0 auto;
    display: block;
    content: "";
    width: 22px;
    height: 2px;
    /* background-color: #FF8900; */
    background-color: transparent;
}
/* 点击之后 */
.Login-contianer .option .pressed{
    color: #FF8900;
}
.Login-contianer .option .pressed::before{
    background-color: #FF8900;
}

.Login-contianer .input{
    display: flex;
    width: 316px;
    height: 40px;
    padding: 11px;
    margin: 24px auto;
    border: 1px #999999 solid;
    border-radius: 6px;
    background-color: #fff;
}
.Login-contianer .input .pic{
    width: 18px;
    height: 18px;
    margin-right: 11px;
}
.Login-contianer .input input{
    flex: 1;
    height: 18px;
    font-size: 16px;
    border:0;
    outline: none;
}
.Login-contianer .Login-button{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 316px;
    height: 52px;
    margin: 54px auto;
    border-radius: 6px;
    background-color: #FF8E00;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
}

/* 警告错误 */
.Login-contianer .warning{
    /* display: flex; */
    display: none ;
    position: absolute;
    padding: 10px 20px; 
    top: 300px;
    left: 50%;
    margin-right: auto;
    margin-left: auto;
    border: 1px #D7D7D7 solid;
    border-radius: 4px;
    background-color: #fff;
    transform: translateX(-50%);
    box-shadow: 0 0 5px hsl(0, 0%, 0%, 10%);
}
.Login-contianer .warning img{
    width: 21px;
    margin-right: 12px;
}
.Login-contianer .warning .content{
    font-size: 18px;
}
</style>