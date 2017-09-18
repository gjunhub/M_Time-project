<template>
    <section class="T_wrap">
        <tab :line-width="3"
             custom-bar-width=".9rem"
             bar-active-color="#fff"
             defaultColor="#ccc"
             active-color="#fff"
        >
            <tab-item selected @on-item-click="isHotMovie = true">正在热映</tab-item>
            <tab-item @on-item-click="isHotMovie = false">即将上映</tab-item>
        </tab>
        <scroller
            :on-refresh="refresh"
            :on-infinite="infinite"
            class="scroller"
        >

            <ul class="TicMovieList">
                <li v-if="isHotMovie" v-for="HotMov,index in NowHotMovies.ms">
                    <div class="HotMovieImg">
                        <img :src="HotMov.img" alt="">
                    </div>
                    <div class="HotMovieDetail">
                        <div class="HotMovieDetailTop">
                            <h3 class="MovieName">{{HotMov.tCn}}</h3>

                            <span v-if="HotMov.isIMAX">IMAX</span>
                            <span v-if="HotMov.is3D">3D</span>
                            <span v-if="HotMov.isIMAX3D">IMAX3D</span>
<!--HotMov.r > 0 --大于0的评分才显示出来-->
                            <strong class="HotMovieSrcoll"
                                    v-if="HotMov.r > 0 ">
                                {{HotMov.r | addsrcollZero}}
                                <strong>分</strong>
                            </strong>
                        </div>
                        <div class="HotMovieDetailDesc">
                            <strong :class="{desc: HotMov.commonSpecial}">“{{HotMov.commonSpecial || HotMov.wantedCount + '人想看' + '-' + HotMov.movieType}}"</strong>
                            <p>{{HotMov.actors}}</p>
                        </div>
                    </div>
                    <a href="javascript:;" class="buyTicket">购票</a>
                </li>
            </ul>

            <div v-if="!isHotMovie" class="SoonMovieComeIn">
                <div class="attentions">
                    <movie :movieList="attentions">

                    </movie>
                </div>
                <ul class="TicMovieList">
                    <li v-for="SoonMov,index in soonMovies.moviecomings">
                        <div class="HotMovieImg">
                            <img :src="SoonMov.image" alt="">
                        </div>
                        <div class="HotMovieDetail">
                            <div class="HotMovieDetailTop">
                                <h3 class="MovieName">{{SoonMov.title}}</h3>
                            </div>
                            <div class="HotMovieDetailDesc">
                                <strong>
                                    <span class="wantedCount">{{SoonMov.wantedCount}}</span>
                                    {{'人想看' + '-' + SoonMov.type}}</strong>
                                <p>
                                    {{SoonMov.actor1}} / {{SoonMov.actor2}}
                                    <span>/{{SoonMov.director}}</span>
                                </p>
                            </div>
                        </div>
                        <a href="javascript:;" class="buyTicket" :class="{likeSee: soonMovies}">想看</a>
                    </li>
                </ul>
            </div>
        </scroller>
    </section>
</template>

<script>

    import { Panel, Group, Radio,Tab,TabItem } from 'vux'
    import {mapGetters} from 'vuex'
    import addsrcollZero from '@/filters/addsrcollZero'
    import Movie from '@/components/Movie'


	export default {
		name: 'ticket',
        data() {
		    return {
                isHotMovie: true,
                attentions: [],
                str: ''
            }
        },
        computed:mapGetters([
            'tabs',
            'NowHotMovies',
            'soonMovies'
        ]),
        created() {

        },
        watch: {

        },
        mounted() {

		    //购票页的正在热映的数据
		    this.$store.dispatch('updateNowMoviePlaying');

		    //购票页的即将上映的数据
            this.$store.dispatch('updateSoonMovieComing');
        },
        updated() {
		
            this.attentions = this.$store.state.soonMovies.attention;
        },
        methods: {

            refresh() {

            },
            infinite() {

            }
        },
        components: {
            Panel,
            Group,
            Radio,
            Tab,
            TabItem,
            Movie
        },
        filters: {
            addsrcollZero
        }
	}
</script>

<style lang="less">
    @w: 100rem;
    .T_wrap {
        position: absolute;
        top: 80/@w;
        height: 1190/@w;
        width: 750/@w;
    }
    .scroller {
        top: 46px !important;
    }
    .vux-tab {
        z-index: 999;
        background-color: #35495e !important;
    }
    .TicMovieList {
        width: 100%;
        padding: 0 20/@w;
        box-sizing: border-box;
    }
    .TicMovieList li {
        position: relative;
        width: 100%;
        height: 228/@w;
        padding: 20/@w 0;
        border-bottom: 1px solid #ebebeb;
    }
    .HotMovieImg {
        float: left;
        height: 182/@w;
        width: 18%;
        margin-right: 28/@w;
    }
    .HotMovieImg img {
        width: 100%;
        height: 182/@w;
    }
    .HotMovieDetail {
        float: left;
        width: 75%;
    }
    .HotMovieDetailTop {
        width: 100%;
        height: 50/@w;
        margin-top: 6/@w;
    }
    .HotMovieDetailTop .MovieName {
        float: left;
        max-width: 50%;
        font-weight: normal;
        font-size: 33/@w;
        margin: 6/@w 15/@w 0 0;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .HotMovieDetailTop span {
        float: left;
        font-size: 20/@w;
        color: #ccc;
        padding: 2/@w 10/@w;
        border: 1px solid #ccc;
        margin: 12/@w 14/@w 0 0;
    }
    .HotMovieDetailTop .HotMovieSrcoll {
        font-weight: normal;
        float: right;
        font-size: 32/@w;
        line-height:50/@w;
        margin: 4/@w 2/@w 0 0;
        color: #04ce1b;
    }
    .HotMovieSrcoll strong {
        font-weight: normal;
        font-size: 20/@w;
    }
    .HotMovieDetailDesc {
        width: 100%;
    }
    .wantedCount {
        color: #f5935d;
    }
    .TicMovieList .HotMovieDetailDesc strong {
        display: block;
        font-weight: normal;
        color: #777;
        font-size: 28/@w;
        margin-top: 20/@w;
    }
    .TicMovieList .HotMovieDetailDesc .desc {
        color: #04ce1b;
    }
    .HotMovieDetailDesc p {
        display: inline-block;
        width: 80%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 26/@w;
        color: #777;
        margin-top: 20/@w;
    }
    .buyTicket {
        position: absolute;
        bottom: 34/@w;
        right: 8/@w;
        padding: 10/@w 24/@w;
        font-size: 22/@w;
        line-height: 30/@w;
        border-radius: 2px;
        border: 1px solid #ff424b;
    }


    .SoonMovieComeIn {
        width: 100%;
    }
    .attentions {
        width: 100%;
        box-sizing: border-box;
        padding: 0 20/@w;
    }
    .likeSee {
        color: #f5935d;
    }
</style>
