<template>
<div id="register">
    <header class="registerHeader">
        <span class="back" @click="back"></span>
        <span class="logo"></span>
    </header>
    <div class="userInfo">
        <mu-text-field
            label="用户名"
            hintText="请输入用户名"
            type="text"
            labelFloat
            @input="username"
        />
        <mu-text-field
            label="密码"
            hintText="6-20位字母、数字、符号组成"
            type="password"
            labelFloat
            @input="password"
        />
    </div>
    <checklist
        label-position="right"
        @change.native="change"
        :options="commonList"
        required
    ></checklist>
    <x-button
        @click.native="toRegister"
        type="primary"
        style="border-radius:99px;"
    >
        免费注册
    </x-button>
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
    <router-link class="jumpLogin" :to="{ name: 'LogIn'}">登录</router-link>

</div>
</template>
<script>
    
    import { XHeader,Checklist,XButton,Toast } from 'vux';
    export default {
        name: 'register',
        data() {
            return {
                commonList: [ '我已阅读并同意服务条款'],
                str: '',
                usernameVal: '',
                passwordVal: '',
                texts: '',
                isShow: false,
                position: 'default',
            }
        },
        methods: {
            username(value) {
                this.usernameVal = value;
            },
            password(value) {
                this.passwordVal = value;
            },
            change (val) {
                this.checked = !this.checked;
            },
            toRegister() {
                if(this.checked) {
                    if(this.passwordVal.length < 4) {
                        this.isShow = true;
                        this.texts = '密码不能小于3位…';
                        return;
                    } else if(this.passwordVal.length > 8) {
                        this.texts = '密码不能大于8位…';
                        this.isShow = true;
                        return;
                    }

                    var storage = window.localStorage;
                    storage.setItem(this.usernameVal,this.passwordVal);
                    this.texts = '注册成功';
                    this.isShow = true;
                    setTimeout(() => {
                        this.$router.push('/logIn');
                    },1000);
                } else {
                    this.isShow = true;
                    this.texts = ' 您还未勾选同意条款';
                }
            },
            back() {
                this.$router.push('/person');
            }
        },
        mounted() {
            this.str = window.location.href;//获取刷新后的地址栏中的字符串
            if (this.str.includes('register')) {
                this.$store.commit('updateHearders');//隐藏顶部
//                this.$store.commit('updateFooter');//隐藏tab底部
            }
        },
        components: {
            XHeader,
            Checklist,
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
    .registerHeader {
        position: relative;
        width: 100%;
        height: 88/@w;
        background: linear-gradient(#ff8758, #ff7c2a);
    }
    .registerHeader .back {
        position: absolute;
        z-index: 10;
        top: 0;
        left: 20/@w;
        width: 88/@w;
        height: 88/@w;
        background: url(../image/arrowL.png) no-repeat 0 center;
        background-size: 40/@w auto;
    }
    .registerHeader::after {
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
    .registerHeader .logo {
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
    @keyframes Rball {
        0% {
            transform: rotate(0);
            transform-origin: center;
        }
        100% {
            transform: rotate(360deg);
            transform-origin: center;
        }
    }
    .registerHeader .logo::after {
        position: absolute;
        content: '';
        width: 45/@w;
        height: 46/@w;
        top: 4/@w;
        left: 6/@w;
        background: url(../../static/logo-ball.png) no-repeat;
        background-size: auto 46/@w;
        animation: Rball 3s linear infinite;
    }
    #register .logo {
        width: 160/@w;
        height: 60/@w;
        padding-top: 5px;
    }
    #register .userInfo {
        background: #fff;
        padding: 0 60/@w;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
    }
    #register .focus-state {
        color: #ff7c2a;
    }
    #register .mu-text-field-focus-line {
        background-color: #ff974b;
    }
    #register .mu-text-field.has-label {
        text-indent: 10/@w;
        width: 95%;
    }
    #register button.weui-btn {
        margin-top: 60/@w;
        width: 88%
    }
    #register .weui-btn_primary {
        background-color: #ff8740;
    }
    .weui-cell {
        padding: 24/@w 36/@w !important;
        font-size: 30/@w;
        line-height: 46/@w;
    }
    #register .weui-cells_checkbox .weui-check:checked + .vux-checklist-icon-checked:before {
        color: #ff7c2a;
    }
    #register .jumpLogin {
        position: absolute;
        right: 30/@w;
        bottom: 240/@w;
        display: inline-block;
        padding: 20/@w 40/@w 20/@w 60/@w;
        font-size: 40/@w;
        ling-height: 80/@w;
        color: #ff7c2a;
    }
    #register .jumpLogin::after {
        position: absolute;
        content: '';
        top: 38/@w;
        right: 12/@w;
        width: 24/@w;
        height: 24/@w;
        border: 1.5px solid #ff7c2a;
        border-color: #ff7c2a #ff7c2a transparent transparent;
        transform: rotate(45deg);
    }
</style>
