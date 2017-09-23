<template>
    <div id="app">
        <div class="loading" v-if="isLoad">
            <img src="./image/loading.gif">
        </div>
        <x-header
            :left-options="{backText:userLocations.city,preventGoBack:true}"
            title="时光网"
            id="vux-header"
            v-show="hearders"
            @click.native="toLocation"
        >
            <h1 id="logo">时光网</h1>
        </x-header>
        <i class="material-icons search" v-if="hearders" @touchstart="toSearch">search</i>
        <router-view></router-view>

        <div id="footer" v-show="showFooter">
            <span class="colorLine"></span>
            <mu-tabs class="indexTabs" :value="activeTab" @change="handleTabChange">
                <mu-tab value="tab1" icon="store" title="首页" :titleClass="{Active:activeTab == 'tab1'}" @click="Index"/>
                <mu-tab value="tab2" icon="loyalty" title="购票" :titleClass="{Active:activeTab == 'tab2'}" @click="Ticket"/>
                <mu-tab value="tab3" icon="map" title="发现" :titleClass="{Active:activeTab == 'tab3'}" @click="Find"/>
                <mu-tab value="tab4" icon="person" title="个人" :titleClass="{Active:activeTab == 'tab4'}" @click="Person"/>
            </mu-tabs>
        </div>
    </div>
</template>

<script>
import {XHeader,Swiper} from 'vux';
import {mapGetters} from 'vuex'

export default {
    name: 'app',
    data() {
        return {

        }
    },
//    computed: {
//        IsLoaded() {
//            return this.$store.state.isLoad;
//        }
//    },
    computed:mapGetters([
        'isLoad',
        'tabs',
        'hearders',
        'activeTab',
        'showFooter',
        'userLocations'
    ]),
    components: {
        XHeader,
        Swiper
    },
    methods: {
        handleTabChange (val) {
//            console.log(val);
            this.$store.commit('updateActiveTab',val);
        },
        Index() {
            this.$router.push('/');
        },
        Find() {
            this.$router.push('/find/news');
        },
        Ticket() {
            console.log('呵呵哒，怎么有点了');
            this.$router.push('/ticket/nowmovie');
        },
        Person() {
            this.$router.push('/person');
        },
        toSearch() {
            this.$router.push({name: 'Search'});
        },
        toLocation() {
            this.$router.push('/location');
        }
    },
    watch:{
        $route(to,path){
            var str = to.path;//获取到了顶部路由路径，
            console.log(str,to,path)
            if(to.path.includes('/ticket')){//如果路由中包括ticket的话，就显示/ticket中的导航
                this.$store.commit('updateTabs');
            }

            if(to.path.includes('/moviedetail')
                || to.path.includes('/person')
                || to.path.includes('/search')
            ) {//只有影片详情页面不需要显示导航条
                this.$store.commit('updateHeader',false);
            } else {
                this.$store.commit('updateHeader',true);
            }

            if(to.path.includes('/logIn')
                || to.path.includes('/register')
                || to.path.includes('/search')
                || to.path.includes('/moviedetail')
            ) {
                this.$store.commit('updateFooter',false);
            }else {
                this.$store.commit('updateFooter',true);
            }

        }
    },
}
</script>

<style lang="less">
    @w: 100rem;
    body,
    h1,
    p,
    h3 {
        margin: 0;
    }
    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    #vux-header {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 80/@w;
        z-index: 996;
        background: linear-gradient(#ff8758, #ff7c2a);
    }
    #vux-header .vux-header-left a {
        color: #fff;
    }
    #vux-header .vux-header-left, .vux-header .vux-header-right {
        top: 20/@w;
    }
    #vux-header .vux-header-left .vux-header-back {
        padding-left: 0;
    }
    #vux-header .vux-header-left .left-arrow:before {
        content: '';
        position: absolute;
        width: 16/@w;
        height: 16/@w;
        left: 76/@w;
        top: 20/@w;
        border: 1.5px solid #fff;
        border-color: transparent transparent #fff #fff;

    }
    .vux-indicator.dot .vux-icon-dot.active {
        background: red !important;
        color: red;
    }
    #app .vux-header .vux-header-title {
        margin: 0 auto;
        width: 160/@w;
    }
    #logo {
        position: relative;
        font-size: 32/@w;
        line-height: 80/@w;
        padding-top: 80/@w;
        width: 160/@w;
        background: url(../static/logo.png) no-repeat center 8/@w;
        background-size: auto 60/@w;
    }
    @keyframes ball {
        0% {
            transform: rotate(0);
            transform-origin: center;
        }
        100% {
            transform: rotate(360deg);
            transform-origin: center;
        }
    }
    #logo::after {
        position: absolute;
        content: '';
        width: 45/@w;
        height: 46/@w;
        top: 13/@w;
        left: 6/@w;
        background: url(../static/logo-ball.png) no-repeat;
        background-size: auto 46/@w;
        animation: ball 3s linear infinite;
    }

    /*.text {*/
        /*width: 5rem;*/
        /*height: 2rem;*/
        /*background-color: blue;*/
    /*}*/
    #footer {
        position: fixed;
        left: 0;
        bottom: 0;
        height: 120/@w;
        width: 100%;
    }
    #footer .colorLine {
        position: absolute;
        top: -1.5px;
        left: 0;
        width: 100%;
        height: 10px;
        background-color: linear-gradient(to right,#ff7c2a, #f94cea, #0eaef9, #00f99a) 6;
        border-image: linear-gradient(to right,#ff7c2a, #f94cea, #0eaef9, #00f99a) 6;
        -webkit-border-image: linear-gradient(to right,#ff7c2a, #f94cea, #0eaef9, #00f99a) 6;
        -moz-border-image: linear-gradient(to right,#ff7c2a, #f94cea, #0eaef9, #00f99a) 6;
    }
    .indexTabs {
        height: 120/@w;
        background: rgba(255, 255, 255, 0.98);
    }
    .indexTabs .mu-tab-link {
        padding: 0;
    }
    .indexTabs .mu-ripple-wrapper {
        height: 120/@w;
    }
    .indexTabs .mu-icon .material-icons {
        margin: 12/@w 0 0 0;
    }
    .indexTabs .mu-tab-text.has-icon {
        margin: 8/@w;
        font-size: 26/@w;
    }
    .loading {
        position: fixed;
        width: 100%;
        height: 100%;
        z-index: 997;
        background-color: rgba(0, 0, 0, 0.44);
    }
    .loading img {
        position: absolute;
        z-index: 999;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 160/@w;
        height: auto;

    }
    .loading::after {
        position: absolute;
        content: '';
        z-index: 998;
        top: 50%;
        left: 50%;
        width: 300/@w;
        height: 300/@w;
        border-radius: 50%;
        transform: translate(-50%,-50%);
        background-color: rgba(0, 0, 0, 0.68);
        box-shadow: 0 0 50/@w #505050;
    }
    .indexTabs .mu-tab-text.has-icon {
        color: #333;
    }
    .indexTabs .mu-tab-link {
        color: #888;
    }
    .indexTabs .mu-tab-active {
        color: #ff7c2a !important;
    }
    .indexTabs .Active {
        color: #ff7c2a !important;
    }

    /*search*/
    .search {
        position: absolute;
        top: 12/@w;
        right: 8/@w;
        z-index: 1000;
        width: 64/@w;
        height: 64/@w;
        font-size: 58/@w;
        color: #fff;
    }
</style>
