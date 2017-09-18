<template>
    <div id="login">
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
        name: 'person',
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
                        this.$router.push({path:'/'});
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

        },
        mounted() {
            this.str = window.location.href;//获取刷新后的地址栏中的字符串
            if(this.str.includes('person')){
                this.$store.commit('updateHearders');
            }
        },
        components: {
            XHeader,
            XButton,
            Toast
        }
    }

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
