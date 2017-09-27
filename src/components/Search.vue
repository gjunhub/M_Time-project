<template>
    <section class="searchWrapper">

        <header class="searchHeader">
            <i class="material-icons back" @click="toBack">chevron_left</i>
            <input type="text" placeholder="请输入影片名"
                   v-model="movieTitle"
                   @key.13="toSearchMovie"
            >
            <i class="material-icons nowSearch"
               @touchstart="toSearchMovie(movieTitle)"
            >search</i>
        </header>
        <div class="searchContainer" ref="searchContainer">
            <div>
                <div class="hotSearch" >
                    <p>热门搜索</p>
                    <ul class="clearFix">
                        <li v-for="hotSearch, index in hotSearchMessages"
                            :key="index"
                            v-if="index < 7"
                            @touchstart="toSearchMovie(hotSearch)"
                        >{{hotSearch}}</li>
                    </ul>
                </div>
                <ul class="searchList" v-if="searchMovieLists && searchMovieLists.length != 0">
                    <li
                        v-for="sMovieList,index in searchMovieLists"
                        :key="index"
                        @click="toMovieDetail(sMovieList.id)"
                    >
                        <div class="searchLeft">
                            <img v-lazy="sMovieList.img" alt="">
                        </div>
                        <div class="searchRight">
                            <div class="movieListTitle">
                                <h3>{{sMovieList.name}} ({{sMovieList.year}})</h3>
                                <em v-if="sMovieList.rating">{{sMovieList.rating}}</em>
                            </div>
                            <p>{{sMovieList.nameEn}}</p>
                            <p>更多片名: {{
                                sMovieList.titleOthersCn[0]
                                || '暂无'
                                }}</p>
                            <strong>{{sMovieList.movieType}}</strong>
                            <span>{{sMovieList.rLocation}}</span>
                            <a href="javascript:;"
                               v-if="sMovieList.year >= 2017 && sMovieList.year < 2018"
                            >购票</a>
                        </div>
                    </li>

                    <!--上拉加载的数据-->
                    <!--<li v-for="sMovieList,index in searchMoreMovieLists" :key="index">-->
                        <!--<div class="searchLeft">-->
                            <!--<img v-lazy="sMovieList.img" alt="">-->
                        <!--</div>-->
                        <!--<div class="searchRight">-->
                            <!--<div class="movieListTitle">-->
                                <!--<h3>{{sMovieList.name}} ({{sMovieList.year}})</h3>-->
                                <!--<em v-if="sMovieList.rating">{{sMovieList.rating}}</em>-->
                            <!--</div>-->
                            <!--<p>{{sMovieList.nameEn}}</p>-->
                            <!--<p>更多片名: {{-->
                                <!--sMovieList.titleOthersCn[0]-->
                                <!--|| '暂无'-->
                                <!--}}</p>-->
                            <!--<strong>{{sMovieList.movieType}}</strong>-->
                            <!--<span>{{sMovieList.rLocation}}</span>-->
                            <!--<a href="javascript:;"-->
                               <!--v-if="sMovieList.year >= 2017 && sMovieList.year < 2018"-->
                            <!--&gt;购票</a>-->
                        <!--</div>-->
                    <!--</li>-->
                </ul>
                <div class="pull-up" v-if="searchMovieLists && searchMovieLists.length != 0">
                    <span>{{searchPullUpText}}</span>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import BScroll from 'better-scroll'
    import {mapGetters} from 'vuex'

	export default {
		name: 'search',
		data() {
			return {
			    str: '',
                movieTitle: '',
                searchPullUpText: '亲！到底啦~',
                canPullUp: true,
                //searchIndex: 1,//获取上拉加载的后的一组数据--之后要++
                //searchCanUpload: true,//数据是否到底了，还能否让用户继续加载
                //lastSearchMoreMovieLists: [],//判断上一次加载和这次加载的数据是不是一样，一样则数据全部请求完了
            }
		},
        computed: mapGetters([
            'hotSearchMessages',//热门搜索数据
            'searchMovieLists',//上拉加载后的默认数据
//            'searchMoreMovieLists'//上拉加载后的更多数据
        ]),
        created() {
		    this.$store.dispatch('updateHotSearch');//获取热门搜索的数据

            //this.$store.commit('removeSearchMovieList');//每次搜索清空--lastSearchMoreMovieLists
        },
        mounted() {
		    this.str = window.location.href;
		    if(this.str.includes('/search')) {
		        this.$store.commit('updateHearders');
                this.$store.commit('updateFooter',false);
            }
        },
        methods: {
            toBack() {
                this.$router.go(-1);
            },
            //获取搜索后的影片数据
            toSearchMovie(val) {
                console.log(val,'val');
                /*
                * 传入的 val 是为了点击热门搜索的关键字 也将关键字传入下面dispatch来获取对应的数据
                * val代表热门搜索的数据 ++ 和 点击搜索按钮传入的value
                * */

                this.$store.dispatch('updateSearchMovie',val).then(() => {
                    this.searchScroll = new BScroll(this.$refs.searchContainer,{
                        scrollY: true,
                        click: true,
                        scrollbar: true,
                        probeType: 1,
                        pullUpLoad: {
                            threshold: -40,
                            moreTxt: '加载更多',
                            noMoreTxt: '没有更多数据'
                        }
                    });

//                    this.searchScroll.on('scroll',pos => {
//                        if(pos.y <= this.searchScroll.maxScrollY - 50 && this.canPullUp) {
//                            this.searchPullUpText = '松开加载更多';
//                        } else if(this.searchScroll.y > this.searchScroll.maxScrollY - 30 && this.canPullUp) {
//                            this.searchPullUpText = '上拉更多';
//                        }
//                    });
//                    this.searchScroll.on('touchEnd',pos => {
//                        if(pos.y <= this.searchScroll.maxScrollY - 50) {
//
//                            this.searchIndex++;
//                            this.canPullUp = false;
//                            this.searchPullUpText = '玩命加载中…';
//                            if(this.searchCanUpload) {
//                                setTimeout(() => {
//                                    this.$store.dispatch('updateMoveSearchMovies',[
//                                        this.movieTitle,
//                                        this.searchIndex
//                                    ]).then(() => {
//
//                                        this.searchScroll.refresh();
//
//                                        this.searchScroll.finishPullUp();
//console.log(this.lastSearchMoreMovieLists, this.searchMoreMovieLists,'啪啪啪');
//                                        if(this.lastSearchMoreMovieLists.length == this.searchMoreMovieLists.length) {
//                                            this.searchPullUpText = '亲！到底啦~';
//                                            this.searchCanUpload = false;//没数据了，不让再次请求
//                                            return;
//                                        }
//
//                                        this.lastSearchMoreMovieLists = this.searchMoreMovieLists;
//
//
//                                    });
//                                },1000);
//
//                                setTimeout(() => {
//                                    this.canPullUp = true;
//                                },1500);
//                            }
//                        }
//                    })
                })
            },
            toMovieDetail(id) {//动态路由
                this.$router.push('/moviedetail/' + id);
            },
            toSearchMovies(val) {
                console.log(val);
            }

        },
        updated() {
		    console.log(this.movieTitle);
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
    .searchWrapper {
        width: 100%;
    }
    .searchHeader {
        position: relative;
        width: 100%;
        height: 110/@w;
        background: #ff7c2a ;
    }
    .searchHeader .back {
        position: absolute;
        top: 20/@w;
        left: 18/@w;
        z-index: 1000;
        width: 80/@w;
        height: 80/@w;
        font-size: 80/@w;
        font-weight: lighter;
        line-height: 64/@w;
        text-align: center;
        color: #fff;
    }
    .searchHeader input {
        position: absolute;
        top: 15/@w;
        left: 50%;
        width: 500/@w;
        height: 80/@w;
        margin-left: -250/@w;
        border: none;
        border-radius: 40/@w;
        outline: none;
        padding: 10/@w 28/@w;
        box-sizing: border-box;
        box-shadow: 2px 2px 5px #ff510c;
    }
    .nowSearch {
        position: absolute;
        top: 24/@w;
        right: 8/@w;
        z-index: 1000;
        width: 80/@w;
        height: 80/@w;
        font-size: 60/@w;
        line-height: 60/@w;
        color: #fff;
    }
    .searchContainer {
        position: absolute;
        width: 100%;
        top: 110/@w;
        left: 0;
        bottom: 0;
        overflow: hidden;
        background-color: #f2f6f3;
    }
    /*上拉加载*/
    .searchContainer .pull-up {
        width: 100%;
        height: 100/@w;
        text-align: center;
        padding: 0;
        border-bottom: 0;
    }
    .searchContainer .pull-up span {
        display: inline-block;
        width: auto;
        font-size: 28/@w;
        line-height: 100/@w;
    }

    /*hotSearch*/
    .hotSearch {
        margin-top: 20/@w;
        width: 100%;
        padding: 10/@w 20/@w;
        box-sizing: border-box;
        background-color: #fff;
    }
    .hotSearch p {
        font-size: 32/@w;
        line-height: 60/@w;
    }
    .hotSearch ul {
        width: 100%;
    }
    .hotSearch ul li {
        float: left;
        width: auto;
        margin: 10/@w 16/@w 20/@w;
        padding: 0 22/@w;
        font-size: 26/@w;
        line-height: 60/@w;
        border: 1px solid #ff510c;
        border-radius: 40/@w;
        color: #ff510c;
    }
    /*搜索影片列表*/
    .searchList {
        width: 100%;
        margin-top: 20/@w;
        background-color: #fff;
        box-sizing: border-box;
        padding: 10/@w 20/@w 0 20/@w;
    }
    .searchList li {
        width: 100%;
        height: 280/@w;
        box-sizing: border-box;
        padding: 30/@w 0;
        border-bottom: 1px solid #e6e6e6;
    }
    .searchLeft {
        float: left;
        margin-right: 28/@w;
        width: 150/@w;
        height: 220/@w;
        overflow: hidden;
    }
    .searchLeft img {
        width: auto;
        height: 100%;
    }
    .searchRight {
        position: relative;
        float: left;
        width: 518/@w;
    }
    .movieListTitle {
        width: 100%;
        height: 46/@w;
    }
    .searchRight .movieListTitle h3 {
        float: left;
        font-size: 32/@w;
        margin-right: 16/@w;
        max-width: 80%;
        height: 46/@w;
        line-height: 42/@w;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .searchRight .movieListTitle em {
        float: left;
        font-style: normal;
        width: 46/@w;
        height: 46/@w;
        text-align: center;
        line-height: 50/@w;
        font-size: 26/@w;
        border-radius: 12/@w 0 12/@w 0;
        background-color: #29c258;
        color: #fff;
    }
    .searchRight p {
        width: 86%;
        height: 44/@w;
        line-height: 44/@w;
        font-size: 30/@w;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        color: #888;
    }
    .searchRight strong,
    .searchRight span {
        font-weight: normal;
        display: block;
        width: 90%;
        height: 40/@w;
        line-height: 50/@w;
        font-size: 28/@w;
    }
    .searchRight a {
        position: absolute;
        right: 20/@w;
        bottom: 4/@w;
        width: 120/@w;
        height: 60/@w;
        text-align: center;
        line-height: 60/@w;
        border-radius: 332/@w;
        background: #ff510c;
        color: #fff;
    }
</style>
