<template>
<div class="Login">
    <div class="main-container">
        <div class="main-pic">
            <img src="../../assets/img/login/mainpic.png" alt="">
        </div>
        <div class="Login-contianer">
            <div class="title">得闲管理系统</div>
            <div class="option">
                <div class="shangjia">商家</div>
                <div class="guanliyuan">管理员</div>
            </div>
            <div class="input userName">
                <img class="pic" src="../../assets/img/login/username.png" alt="">
                <input type="text" placeholder="请输入账号" >
            </div>
            <div class="input passWord">
                <img class="pic" src="../../assets/img/login/password.png" alt="">
                <input type="password" placeholder="请输入密码">
            </div>
            <div class="Login-button">登录</div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name:"Login",
    data:{
        
    },
    method:{
        
    }
}
</script>

<style scoped>
.Login{
    width: 1440px;
    height: 900px;
    background-color: #bfa;
    padding-top: 142px;
    background-image: "../../assets/img/login/background.png";
    background-size: 144px 900px;
}
.main-container{
    width: 1280px;
    height: 614px;
    background-color: antiquewhite;
    margin: 0 auto;
    display: flex;
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
    background-image: "../../assets/img/login";
}


</style>