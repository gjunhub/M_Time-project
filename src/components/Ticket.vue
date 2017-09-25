<template>
    <section class="T_wrap">
        <div class="ticketTab">
            <tab :line-width="3"
                 custom-bar-width=".9rem"
                 bar-active-color="#ff8758"
                 defaultColor="#777"
                 active-color="#ff8758"
            >
                <tab-item selected @on-item-click="Hot">正在热映</tab-item>
                <tab-item @on-item-click="Soon">即将上映</tab-item>
            </tab>
            <span class="bottomLine"></span>
        </div>

            <router-view></router-view>
    </section>
</template>

<script>

    import { Panel, Group, Radio,Tab,TabItem } from 'vux'
    import {mapGetters} from 'vuex'


	export default {
		name: 'ticket',
        data() {
		    return {
                str: ''
            }
        },
        computed:mapGetters([
            'tabs'
        ]),
        created() {
            this.$router.push({name: 'Nowmovie'});

    //页面刷新后，将底部的tab强制和当前页面调成一致
            this.str = window.location.href;
            if(this.str.includes('ticket')) {
                this.$store.commit('updateActiveTab','tab2');
            }
        },
        watch: {

        },
        methods: {
            Hot() {
                this.$router.push({name: 'Nowmovie'});
            },
            Soon() {
                this.$router.push({name: 'Soonmovie'});
            }
        },
        components: {
            Panel,
            Group,
            Radio,
            Tab,
            TabItem

        }
	}
</script>

<style lang="less">
    @w: 100rem;
    .T_wrap {
        width: 100%;
        height: 1200/@w;
    }
    .ticketTab {
        position: fixed;
        z-index: 10;
        top: 0;
        left: 0;
        width: 100%;
    }
    .ticketTab .bottomLine {
        position: absolute;
        bottom: -1px;
        left: 0;
        z-index: 990;
        width: 100%;
        height: 10px;
        background-color: linear-gradient(to right,#ff7c2a, #f94cea, #0eaef9, #00f99a) 6;
        border-image: linear-gradient(to right,#ff7c2a, #f94cea, #0eaef9, #00f99a) 6;
        -webkit-border-image: linear-gradient(to right,#ff7c2a, #f94cea, #0eaef9, #00f99a) 6;
        -moz-border-image: linear-gradient(to right,#ff7c2a, #f94cea, #0eaef9, #00f99a) 6;

    }
    .vux-tab {
        margin-top: 78/@w;
        z-index: 999;
        background-color: rgba(255,255,255, 1) !important;
    }
</style>
