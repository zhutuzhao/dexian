<template>
<div class="Login">
    <div class="main-container">
        <div class="pic">
            <img src="" alt="">
        </div>
        <div class="Login-contianer">
            <div class="title">得闲管理系统</div>
            <div class="option">
                <div class="shangjia">商家</div>
                <div class="guanliyuan">管理员</div>
            </div>
            <div class="input userName">
                <img class="pic" src="" alt="">
                <input type="text" placeholder="请输入账号" >
            </div>
            <div class="input passWord">
                <img class="pic" src="" alt="">
                <input type="text" placeholder="请输入密码">
            </div>
            <div class="Login-button"></div>
        </div>
    </div>
</div>
</template>

<script>
export default {

}
</script>

<style scoped>
.Login{
    width: 1440px;
    height: 900px;
    background-color: #bfa;
    padding-top: 142px;
}
.main-container{
    width: 1280px;
    height: 614px;
    background-color: antiquewhite;
    margin: 0 auto;
    display: flex;
}
.pic{
    background-color: #FFC37C;
}
.pic img{
    width: 544px;
    height: 385px;
    margin: 115px 82px;
    background-color: blueviolet;
}
.Login-contianer{
    width: 572px;
    height: 616px;
}
.Login-contianer .title{
    margin: 40px 172px 101px;
    color: #FF8900;
    font-size: 38px;
}
.Login-contianer .option{
    margin: 0 192px 63px;
    display: flex;
    justify-content: space-between;
}
.Login-contianer .option .shangjia,
.Login-contianer .option .guanliyuan
{
    padding-bottom: 7px;
    border-bottom: 2px #FF8900 solid;
    font-size: 18px;
    color: #666666;
    cursor: pointer; 
}
.Login-contianer .input{
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

}



</style>