<template>
    <div class="personBox">
        <header class="personHeader">
            <span class="logo"></span>
<!--注销账号-->
            <mu-raised-button label="" @click="open" v-if="isLog"/>
            <mu-dialog :open="dialog"
                       title="注销当前账号"
                       :dialogClass="{logOut:true}"
                       @close="close"
            >
                <mu-flat-button slot="actions" @click="close" primary label="取消"/>
                <mu-flat-button slot="actions" primary @click="close" @touchstart.native="toLogOut" label="确定"/>
            </mu-dialog>

            <i class="material-icons md-34 col" v-if="isLog">power_settings_new</i>
        </header>
        <section class="personWrapper" ref="personWrapper">
            <div class="personContainer">
                <header class="personMessage">
                    <img src="../../static/origin.jpg" alt="" v-if="!isLog">
                    <img :src="userDesc[mathIndex].img" alt="" v-if="isLog">
                    <span class="nowLogin" @click="toLog" v-if="!isLog">登录</span>
                    <span class="nowRegister" @click="toReg" v-if="!isLog">注册</span>
                    <p class="userImage" v-if="isLog">{{userDesc[mathIndex].name}}</p>
                </header>
                <ul class="personList">
                    <li @touchstart="toBuy">
                        <i class="material-icons md-30 col_h">local_activity</i>
                    </li>
                    <li @touchstart="toCollection">
                        <i class="material-icons md-30 col_r">favorite</i>
                    </li>
                    <li>
                        <i class="material-icons md-30 col_g">local_grocery_store</i>
                    </li>
                    <li>
                        <i class="material-icons md-30 col_b">info</i>
                    </li>
                    <li>
                        <i class="material-icons md-30 col_B">settings</i>
                    </li>
                </ul>
            </div>
        </section>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
	export default {
		name: 'person',
        data() {
		    return {
                str: '',
                mathIndex: this.$store.state.MathIndex,//获取一个下标值n--用来获取userDesc的第n个
                dialog: false//弹框的数据

            }
        },
        computed: mapGetters([
            'isLog',
            'userDesc'
        ]),
        created() {
		    //刷新时，如果storage中的状态已经是true了，就将store的登录状态再次更新
            console.log(window.sessionStorage.getItem('can'),'999');
//            console.log(sessionStorage.getItem('can') == 'true','999');
            if(window.sessionStorage.getItem('can') == 'true') {
                console.log(3339)
                this.$store.commit('updateIsLog',true);
            }
        },
        methods: {
		    toLog() {
                this.$router.push({name: 'LogIn'});
            },
            toReg() {
		       this.$router.push({name: 'Register'});
            },
            open() {
                this.dialog = true
            },
            close() {
                this.dialog = false
            },
            toLogOut() {//确认注销的事件
                this.$store.commit('updateIsLog',false);//将登录状态变成未登录
//                window.sessionStorage.removeItem('can');//清除本地存储的已登录状态
                window.sessionStorage.clear();//清除本地存储的已登录状态
            },
            toBuy() {
		        this.$router.push({name: 'Buy'})
            },
            toCollection() {
		        this.$router.push({name: 'Collection'});
            }
        },
        mounted() {
            this.str = window.location.href;//获取刷新后的地址栏中的字符串
            if(this.str.includes('person')){
                this.$store.commit('updateHearders');
                this.$store.commit('updateActiveTab','tab4');
            }
            console.log(this.isLog,'this.isLog');
    /*
    * 等页面和数据挂在后，将登录成功后的状态存进sessionStorage中，然后，刷新页面时再次判断
    * storage中的数据是否是true，是的话，直接修改store中的登录状态，因为刷新时，会将登录的
    * 状态清空成store中的初始状态，所以我在这里更具storage中的值来更新一下store的值，来
    * 达到刷新还保留登录的状态，*******在created中数据挂在时判断&更新****
    * */
            window.sessionStorage.setItem('can',this.isLog);
        },
        updated() {
            console.log('更新的时候的console');
        }
	}
</script>

<style lang="less">
    @w: 100rem;
    .personBox {
        width: 100%;
        height: auto;
        background-color: #f2f6f3;
    }
    .personWrapper,
    .personContainer {
        width: 100%;
    }
    .personMessage {
        position: relative;
        width: 100%;
        height: 200/@w;
        background-color: #ff7c2a;
    }
    .personMessage img {
        position: absolute;
        top: 25/@w;
        left: 40/@w;
        width: 150/@w;
        height: 150/@w;
        background-color: #fff;
        border-radius: 50%;
        padding: 2px;
        border: 1px solid #fffa62;
    }
    .personMessage .nowLogin,
    .personMessage .nowRegister{
        position: absolute;
        top: 70/@w;
        left: 240/@w;
        width: 140/@w;
        height: 70/@w;
        border-radius: 40/@w;
        border: 1.5px solid #fffa62;
        text-align: center;
        line-height: 68/@w;
        color: #fffa62;
    }
    .personMessage .nowRegister {
        left: 420/@w;
        border-color: #fff;
        color: #fff;
    }
    .userImage {
        position: absolute;
        top: 70/@w;
        left: 230/@w;
        color: #fff;
        font-size: 32/@w;
        line-height: 68/@w;
    }
    .personList {
        margin-top: 20/@w;
        width: 100%;
        padding: 0 28/@w 0 28/@w;
        box-sizing: border-box;
        background: #fff;
    }
    .personList li {
        position: relative;
        width: 100%;
        font-size: 28/@w;
        font-weight: lighter;
        line-height: 116/@w;
        height: 116/@w;
        border-bottom: 1px solid #ebebeb;
    }
    .personList li i {
        line-height: 116/@w;
    }
    .personList li:nth-of-type(1)::after {
        position: absolute;
        content: '我的电影票';
        top: 0;
        left: 72/@w;
        color: #777;
    }
    .personList li:nth-of-type(2)::after {
        position: absolute;
        content: '收藏';
        top: 0;
        left: 72/@w;
        color: #777;
    }
    .personList li:nth-of-type(3)::after {
        position: absolute;
        content: '购物车';
        top: 0;
        left: 72/@w;
        color: #777;
    }
    .personList li:nth-of-type(4)::after {
        position: absolute;
        content: '关于我们';
        top: 0;
        left: 72/@w;
        color: #777;
    }
    .personList li:nth-of-type(5)::after {
        position: absolute;
        content: '设置';
        top: 0;
        left: 72/@w;
        color: #777;
    }
    .personList li:nth-of-type(1)::before {
        position: absolute;
        content: '';
        top: 42/@w;
        width: 30/@w;
        height: 30/@w;
        border: 1.5px solid #ccc;
        border-color: #ccc #ccc transparent transparent;
        transform: rotate(45deg);
        right: 15/@w;
        color: #777;
    }
    .personList li:nth-of-type(2)::before {
        position: absolute;
        content: '';
        top: 42/@w;
        width: 30/@w;
        height: 30/@w;
        border: 1.5px solid #ccc;
        border-color: #ccc #ccc transparent transparent;
        transform: rotate(45deg);
        right: 15/@w;
        color: #777;
    }
    .personList li:nth-of-type(3)::before {
        position: absolute;
        content: '';
        top: 42/@w;
        width: 30/@w;
        height: 30/@w;
        border: 1.5px solid #ccc;
        border-color: #ccc #ccc transparent transparent;
        transform: rotate(45deg);
        right: 15/@w;
        color: #777;
    }
    .personList li:nth-of-type(4)::before {
        position: absolute;
        content: '';
        top: 42/@w;
        width: 30/@w;
        height: 30/@w;
        border: 1.5px solid #ccc;
        border-color: #ccc #ccc transparent transparent;
        transform: rotate(45deg);
        right: 15/@w;
        color: #777;
    }
    .personList li:nth-of-type(5)::before {
        position: absolute;
        content: '';
        top: 42/@w;
        width: 30/@w;
        height: 30/@w;
        border: 1.5px solid #ccc;
        border-color: #ccc #ccc transparent transparent;
        transform: rotate(45deg);
        right: 15/@w;
        color: #777;
    }

    .col_h {
        color: #ffd051;
    }
    .col_r {
        color: #ff7378;
    }
    .col_g {
        color: #3bff68;
    }
    .col_b {
        color: #c189ff;
    }
    .col_B {
        color: #5e92ff;
    }


    .material-icons.md-34.col {
        position: absolute;
        top: 15/@w;
        right: 20/@w;
        font-size: 30px;
        color: #fff;
    }
    .material-icons.md-30 {
        font-size: 30px;
    }
    .personHeader {
        position: relative;
        width: 100%;
        height: 88/@w;
        background: linear-gradient(#ff8758, #ff7c2a);
    }
    .personHeader .logo {
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
    @keyframes Pball {
        0% {
            transform: rotate(0);
            transform-origin: center;
        }
        100% {
            transform: rotate(360deg);
            transform-origin: center;
        }
    }
    .personHeader .logo::after {
        position: absolute;
        content: '';
        width: 45/@w;
        height: 46/@w;
        top: 4/@w;
        left: 6/@w;
        background: url(../../static/logo-ball.png) no-repeat;
        background-size: auto 46/@w;
        animation: Pball 3s linear infinite;
    }
    .personHeader .logo {
        width: 160/@w;
        height: 60/@w;
        padding-top: 5px;
    }

/*账号注销*/
    .mu-raised-button {
        opacity: 0;
        position: absolute;
        z-index: 10;
        top: 8/@w;
        right: 8/@w;
        min-width: 80/@w;
    }
    .mu-dialog {
       max-width: 500/@w;
    }
    .logOut,
    .mu-dialog-title {
        display: block;
        font-size: 36/@w;
        text-align: center;
    }
    .mu-dialog-body {
        padding: 0;
    }
    .mu-flat-button:nth-of-type(1) {
        position: absolute;
        right: 50%;
    }
    .mu-flat-button:nth-of-type(2) {
        position: absolute;
        left: 50%;
    }
</style>
