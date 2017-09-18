<template>
    <div id="app">
        <div class="loading" v-show="isLoad">
            <img src="./image/loading.gif">
        </div>
        <x-header
            :left-options="{backText:'北京'}"
            title="时光网"
            :right-options="{showMore:true}"
            id="vux-header"
            v-show="hearders"
        >
            <h1 id="logo">时光网</h1>
        </x-header>

        <router-view></router-view>

        <mu-tabs :value="activeTab" @change="handleTabChange">
            <mu-tab value="tab1" icon="home" title="首页" @click="Index"/>
            <mu-tab value="tab2" icon="favorite" title="购票" @click="Ticket"/>
            <mu-tab value="tab3" icon="message" title="发现" @click="Find"/>
            <mu-tab value="tab4" icon="person" title="个人" @click="Person"/>
        </mu-tabs>
    </div>
</template>

<script>
import {XHeader,Swiper} from 'vux';
import {mapGetters} from 'vuex'

export default {
    name: 'app',
    data() {
        return {
            activeTab: 'tab1'
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
        'hearders'
    ]),
    components: {
        XHeader,
        Swiper
    },
    methods: {
        handleTabChange (val) {
            console.log(val)
            this.activeTab = val;
        },
        Index() {
            this.$router.push('/');
        },
        Find() {
            this.$router.push('/find');
        },
        Ticket() {
            this.$router.push('/ticket');
        },
        Person() {
            this.$router.push('/person');
        }
    },
    watch:{
        $route(to,path){
            var str = to.path;//获取到了顶部路由路径，
            console.log(str,to,path)
            if(to.path.includes('/ticket')){//如果路由中包括ticket的话，就显示/ticket中的导航
                this.$store.commit('updateTabs');
            }

            if(to.path.includes('/moviedetail') || to.path.includes('/person')) {//只有影片详情页面不需要显示导航条
                this.$store.commit('updateHeader',false);
            } else {
                this.$store.commit('updateHeader',true);
            }

        }
    },
}
</script>

<style>
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
        height: 40px;
        z-index: 996;
    }
    .vux-indicator.dot .vux-icon-dot.active {
        background: red !important;
        color: red;
    }
    #app .vux-header .vux-header-title {
        margin: 0 auto;
        width: 80px;
    }
    #logo {
        font: 16px/40px "微软雅黑";
        padding-top: 40px;
        width: 80px;
        background: url(./image/logo.png) no-repeat 0px 8px;
        background-size: 80px auto;
    }
    /*.text {*/
        /*width: 5rem;*/
        /*height: 2rem;*/
        /*background-color: blue;*/
    /*}*/
    .mu-tabs {
        position: fixed;
        left: 0;
        bottom: 0;
        height: 60px;
        border-top: 1px solid rgba(188, 188, 188, 0.66);
        background: #35495e;
    }
    .mu-tab-link {
        padding: 0;
    }
    .mu-ripple-wrapper {
        height: 60px;
    }
    .mu-icon .material-icons {
        margin: 5px 0 0 0;
    }
    .mu-tab-text.has-icon {
        margin: 4px;
        font: lighter 13px "微软雅黑";
        color: #fff;
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
        width: 80px;
        height: auto;

    }
    .loading::after {
        position: absolute;
        content: '';
        z-index: 998;
        top: 50%;
        left: 50%;
        width: 150px;
        height: 150px;
        border-radius: 50%;
        transform: translate(-50%,-50%);
        background-color: rgba(0, 0, 0, 0.68);
        box-shadow: 0 0 25px #505050;
    }
</style>
