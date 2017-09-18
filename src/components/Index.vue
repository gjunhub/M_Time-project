<template>
    <section>
        <swiper
            :list="carousel"
            :loop="true"
            :auto="true"
            :interval="3000"
            height="160px"
            dots-position="center"
            :duration="1000"
            class="indexSwiper"
        >

        </swiper>
        <div class="selling">
            <div class="sellingTitle">
                <h3>正在售票</h3>
                <span class="more">{{sellingCount}}部</span>
            </div>

            <movie :movieList="sellingList">

            </movie>

        </div>

        <div class="movieSoon">
            <div class="movieSoonTitle">
                <h3>即将上映</h3>
                <span class="more">{{movieSongCount}}部</span>
            </div>

            <movie :movieList="movieSoon">

            </movie>

        </div>
    </section>
</template>

<script>

    import {Swiper} from 'vux';
    import Movie from '@/components/Movie'


    export default {
		name: 'index',
        data() {
		    return {
                carousel: [
                    {
                        url: 'javascript:;',
                        img: ''
                    },{
                        url: 'javascript:;',
                        img: ''
                    },{
                        url: 'javascript:;',
                        img: ''
                    },{
                        url: 'javascript:;',
                        img: ''
                    },{
                        url: 'javascript:;',
                        img: ''
                    },{
                        url: 'javascript:;',
                        img: ''
                    }
                ],
                sellingList: [],//正在售票
                sellingCount: '',//正在售票的电影数量
                movieSoon: [],//即将上映
                movieSongCount: ''//即将上映的电影数量
            }
        },
        computed: {
            IsLoaded() {
                return this.$store.state.isLoad;
            }
        },
        created() {//获取banner
            this.$store.commit('changeLoad',1);//请求数据前出现loading加载
            fetch('/mic/banner').then(response => {//获取banner
                return response.json();
            }).then(data => {
                console.log(data,data.banners.length);

                data.banners.forEach((item,index) => {
                    this.carousel[index].img = item.pic;
                });
            });

            //获取正在售票的
            fetch('/api/PageSubArea/HotPlayMovies.api?locationId=290').then(response => {
                return response.json();
            }).then(data => {
                this.sellingList = data.movies;
                this.sellingCount = data.count;
                console.log('sell',data);
            });

            //获取即将上映
            fetch('/api/Movie/MovieComingNew.api?locationId=290').then(response => {
                return response.json();
            }).then(data => {
                this.movieSoon = data.moviecomings;
                this.movieSongCount = data.moviecomings.length;
                console.log('Soon',data.moviecomings);

                this.$store.commit('changeLoad',0);//数据请求完成之后关闭loading
            });
        },
        components: {
            Swiper,
            Movie
        }
	}
</script>

<style>
    .sellingTitle h3 {
        margin: 0;
        font: 18px/40px "微软雅黑";
        color: #35495e;
    }
    .indexSwiper {
        margin-top: 40px;
    }
    .selling, .movieSoon {
        width: 100%;
        padding: 0 12px;
        box-sizing: border-box;
        padding-bottom: 20px;
        border-bottom: 1px solid #ccc;
    }
    .sellingTitle ,.movieSoonTitle {
        height: 40px;
    }
    .selling h3 ,.movieSoonTitle h3{
        float: left;
    }
    .selling .more ,.movieSoonTitle .more {
        float: right;
        font: 14px/40px "微软雅黑";
    }
</style>
