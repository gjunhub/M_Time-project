<template>
    <section class="buyWrapper">

        <header class="buyHeader">
            <i class="material-icons back" @click="toBack">chevron_left</i>
            <span class="logo"></span>
        </header>
        <div class="buyContainer" ref="buyContainer">
            <div>
                <p class="buyName">我的电影票</p>
                <ul class="buyList">
                    <li
                        v-for="buy,index in userbuys"
                        :key="index"
                    >
                        <div class="buyLeft">
                            <img v-lazy="buy.image" alt="">
                        </div>
                        <div class="buyRight">
                            <div class="buyTitle">
                                <h3>{{buy.title}}</h3>
                            </div>
                            <p>{{buy.subTitle}}</p>
                            <time>购票时间: {{buy.time | adjustTime}}</time>
                        </div>
                    </li>

                </ul>
            </div>
        </div>
    </section>
</template>

<script>
    import BScroll from 'better-scroll'
    import {mapGetters} from 'vuex'

    import adjustTime from '@/filters/adjustTime'

    export default {
        name: 'search',
        data() {
            return {
                str: '',
            }
        },
        computed: mapGetters([
            'userbuys'
        ]),
        created() {

        },
        mounted() {
            this.str = window.location.href;
            if(this.str.includes('/buy')) {
                this.$store.commit('updateHearders');
                this.$store.commit('updateFooter',false);
            }
        },
        methods: {
            toBack() {
                this.$router.push('/person');
            }
        },
        filters: {
            adjustTime
        }
    }
</script>

<style lang="less">
    @w: 100rem;
    .clearFix::after {
        content: '';
        display: block;
        clear: both;
    }
    .buyWrapper {
        width: 100%;
    }
    .buyHeader {
        position: relative;
        width: 100%;
        height: 88/@w;
        background: #ff7c2a ;
    }
    .buyHeader .back {
        position: absolute;
        top: 8/@w;
        left: 18/@w;
        z-index: 1000;
        width: 80/@w;
        height: 80/@w;
        font-size: 72/@w;
        font-weight: lighter;
        line-height: 72/@w;
        text-align: center;
        color: #fff;
    }
    .buyHeader .logo {
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
    .buyHeader .logo::after {
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
    .buyHeader .logo {
        width: 160/@w;
        height: 60/@w;
        padding-top: 5px;
    }
    .buyContainer {
        position: absolute;
        width: 100%;
        top: 88/@w;
        left: 0;
        bottom: 0;
        overflow: hidden;
        background-color: #f2f6f3;
    }
    .buyContainer>div {
        margin-top: 20/@w;
        width: 100%;
        background-color: #fff;
        box-sizing: border-box;
        padding: 10/@w 20/@w 0 20/@w;
    }
    .buyContainer>div .buyName {
        width: 100%;
        height: 80/@w;
        line-height: 80/@w;
        font-size: 36/@w;
        font-weight: 700;
        border-bottom: 1px solid #e3e3e3;
    }

    /*收藏影片列表*/
    .buyList {
        width: 100%;
        background-color: #fff;
    }
    .buyList li {
        width: 100%;
        height: 240/@w;
        box-sizing: border-box;
        padding: 10/@w 0 10/@w 0;
        border-bottom: 1px solid #e6e6e6;
    }
    .buyLeft {
        float: left;
        margin: 10/@w 28/@w 0 0;
        width: 150/@w;
        height: 200/@w;
        overflow: hidden;
    }
    .buyLeft img {
        width: 150/@w;
        height: auto;
    }
    .buyRight {
        position: relative;
        float: left;
        width: 518/@w;
    }
    .buyTitle {
        width: 100%;
        height: 46/@w;
    }
    .buyRight .buyTitle h3 {
        float: left;
        font-size: 34/@w;
        margin-right: 16/@w;
        max-width: 80%;
        height: 72/@w;
        line-height: 72/@w;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .buyRight p {
        width: 86%;
        height: 60/@w;
        line-height: 60/@w;
        font-size: 32/@w;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        color: #888;
    }
    .buyRight time {
        display: block;
        font-weight: lighter;
        max-width: 90%;
        height: 70/@w;
        line-height: 70/@w;
    }
</style>
