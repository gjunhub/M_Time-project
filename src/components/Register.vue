<template>
<div id="register">
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
    <router-link class="jumpLogin" :to="{ name: 'Person'}">登录</router-link>

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
                        this.$router.push('/person');
                    },1000);
                } else {
                    this.isShow = true;
                    this.texts = ' 您还未勾选同意条款';
                }
            }
        },
        mounted() {
            this.str = window.location.href;//获取刷新后的地址栏中的字符串
            if (this.str.includes('register-Unuser')) {
                this.$store.commit('updateHearders');
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
<style>
    #register {
        height: 100%;
        background: #f6f6f6;
        padding-bottom: 305px;
        margin-top: 60px;
    }
    #register .logo {
        width: 80px;
        height: 30px;
        padding-top: 5px;
    }
    #register .userInfo {
        background: #fff;
        padding: 0 30px;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
    }
    #register .focus-state {
        color: #7e57c2;
    }
    #register .mu-text-field-focus-line {
        background-color: #7e57c2;
    }
    #register .mu-text-field.has-label {
        text-indent: 5px;
        width: 95%;
    }
    #register button.weui-btn {
        margin-top: 20px;
        width: 88%
    }
    #register .weui-btn_primary {
        background-color: #7e57c2;
    }
    #register .weui-cells_checkbox .weui-check:checked + .vux-checklist-icon-checked:before {
        color: purple;
    }
    #register .jumpLogin {
        position: absolute;
        right: 0;
        bottom: 80px;
        display: inline-block;
        padding: 10px 30px;
        font: 20px/40px '微软雅黑';
        color: #7f7f7f;
    }
</style>
