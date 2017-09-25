<template>
    <div id="login">
        <header class="loginHeader">
            <span class="back" @click="back"></span>
            <span class="logo"></span>
        </header>
        <div class="userInfo">
            <mu-text-field label="用户名"
                           hintText="请输入用户名/手机"
                           type="text"
                           labelFloat
                           @input="username"
            />
            <mu-text-field label="密码"
                           hintText="请输入密码"
                           type="password"
                           labelFloat
                           @input="password"
            />
        </div>
        <x-button type="primary" style="border-radius:99px;" @touchstart.native="loginItem">登录</x-button>
        <p class="freeBtns">
            <router-link class="free" :to="{name: 'Register'}" >免费注册</router-link>
        </p>
        <toast
            v-model="isShow"
            type="text"
            :time="800"
            width="200px"
            is-show-mask
            :text="texts"
            :position="position"
        >
        </toast>
    </div>
</template>
<script>

    import { XHeader,XButton,Toast } from 'vux';
    export default {
        name: 'logIn',
        data() {
            return {
                str: '',
                usernameVal: '',
                passwordVal: '',
                isShow: false,
                texts: '',
                position: 'default'
            }
        },
        methods: {
            username(value) {
                this.usernameVal = value;
            },
            password(value) {
                this.passwordVal = value;
            },
        /*
        * 判断localStorage中的存的用户名密码和当前登录页面的用户名密码是否一致，一致就返回true
        * 否则就是false
        * */
            loginCeItem() {
                var storage = window.localStorage;
                for(var i = 0;i<storage.length;i++) {
                    if(this.usernameVal == storage.key(i) && this.passwordVal == storage.getItem(this.usernameVal)) {
                        return true;
                    }
                }
                return false;
            },
            loginItem() {
                console.log(this.loginCeItem());
                if(this.loginCeItem()) {
                    this.isShow = true;
                    this.texts = '登录成功'
//                    this.$store.dispatch('setIsLogin',{
//                        username:this.usernameVal
//                    });
                    setTimeout(()=> {
                        this.isShow = false;
                        this.$router.push({path:'/person'});
                        this.$store.commit('updateIsLog',true);
                    },1200);
                } else {
                    this.isShow = true;
                    this.texts = '登录失败',
                    setTimeout(()=> {
                        this.isShow = false;
                        console.log(this.isShow);
                    },1000);
                }
            },
            back() {
                this.$router.push('/person');
            }

        },
        mounted() {
            this.str = window.location.href;//获取刷新后的地址栏中的字符串
            if(this.str.includes('logIn')){
                this.$store.commit('updateHearders');
//                this.$store.commit('updateFooter');//隐藏tab底部
            }
        },
        components: {
            XHeader,
            XButton,
            Toast
        }
    }

</script>
<style lang="less">
    @w: 100rem;
    #register {
        height: 100%;
        background: #f6f6f6;
        padding-bottom: 700/@w;
    }
    .loginHeader {
        position: relative;
        width: 100%;
        height: 88/@w;
        background: linear-gradient(#ff8758, #ff7c2a);
    }
    .loginHeader .back {
        position: absolute;
        z-index: 10;
        top: 0;
        left: 20/@w;
        width: 88/@w;
        height: 88/@w;
        background: url(../image/arrowL.png) no-repeat 0 center;
        background-size: 40/@w auto;
    }
    .loginHeader::after {
        position: absolute;
        z-index: 9;
        content: '返回';
        top: 20/@w;
        left: 60/@w;
        width: 60/@w;
        height: 40/@w;
        font-size: 30/@w;
        line-height: 48/@w;
        color: #fff;
    }
    .loginHeader .logo {
        position: absolute;
        top: 15/@w;
        left: 50%;
        margin-left: -80/@w;
        font-size: 32/@w;
        line-height: 88/@w;
        width: 160/@w;
        background: url(../../static/logo.png) no-repeat center;
        background-size: auto 60/@w;
    }
    @keyframes Lball {
        0% {
            transform: rotate(0);
            transform-origin: center;
        }
        100% {
            transform: rotate(360deg);
            transform-origin: center;
        }
    }
    .loginHeader .logo::after {
        position: absolute;
        content: '';
        width: 45/@w;
        height: 46/@w;
        top: 4/@w;
        left: 6/@w;
        background: url(../../static/logo-ball.png) no-repeat;
        background-size: auto 46/@w;
        animation: Lball 3s linear infinite;
    }
    .loginHeader .logo {
        width: 160/@w;
        height: 60/@w;
        padding-top: 5px;
    }
    #login {
        height: 100%;
        background: #f6f6f6;
        padding-bottom: 650/@w;
    }
    #login .logo {
        width: 160/@w;
        height: 60/@w;
        padding-top: 10/@w;
    }
    #login .userInfo {
        background: #fff;
        padding: 0 60/@w 40/@w;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
    }
    #login .focus-state {
        color: #ff7c2a;
    }
    #login .mu-text-field-focus-line {
        background-color: #ff974b;
    }
    #login .mu-text-field.has-label {
        text-indent: 10/@w;
    }
    #login button.weui-btn {
        margin-top: 60/@w;
        width: 88%
    }
    #login .weui-btn_primary {
        background-color: #ff7c2a;
    }
    #login .freeBtns {
        overflow: hidden;
    }
    #login .free,
    #login .find {
        position: relative;
        float: left;
        padding: 20/@w 40/@w;
        font-size: 38/@w;
        line-height: 80/@w;
        color: #ff7c2a;
    }
    #login .free {
        padding-left: 55/@w;
    }
    #login .free::after {
        position: absolute;
        content: '';
        top: 48/@w;
        left: 30/@w;
        width: 24/@w;
        height: 24/@w;
        border: 1.5px solid #ff7c2a;
        border-color: transparent transparent #ff7c2a #ff7c2a;
        transform: rotate(45deg);
    }
    #login .find {
        float: right;
        color: #ccc;
    }
</style>
