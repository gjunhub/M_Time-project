<template>
<div id="login">
    <div class="userInfo">
        <mu-text-field label="用户名" hintText="请输入用户名/手机" type="text" labelFloat/>
        <mu-text-field label="密码" hintText="请输入密码" type="password" labelFloat/>
    </div>
    <x-button type="primary" style="border-radius:99px;">登录</x-button>
    <p class="freeBtns">
        <router-link class="free" :to="{name: 'Register'}" >免费注册</router-link>
    </p>
</div>
</template>
<script>
    import { XHeader,XButton } from 'vux';


</script>
<style>
    #login {
        height: 100%;
        background: #f6f6f6;
        padding-bottom: 305px;
    }
    #login .logo {
        width: 80px;
        height: 30px;
        padding-top: 5px;
    }
    #login .userInfo {
        background: #fff;
        padding: 0 30px 20px;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
    }
    #login .focus-state {
        color: #7e57c2;
    }
    #login .mu-text-field-focus-line {
        background-color: #7e57c2;
    }
    #login .mu-text-field.has-label {
        text-indent: 5px;
    }
    #login button.weui-btn {
        margin-top: 30px;
        width: 88%
    }
    #login .weui-btn_primary {
        background-color: #7e57c2;
    }
    #login .freeBtns {
        overflow: hidden;
    }
    #login .free,
    #login .find {
        float: left;
        padding: 0 20px;
        color: #7e57c2;
        font: 18px/40px '微软雅黑';
    }
    #login .find {
        float: right;
        color: #cccccc;
    }
</style>
