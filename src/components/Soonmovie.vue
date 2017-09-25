<template>
    <div class="SoonMovieWrapper" ref="SoonMovieWrapper">
        <div class="SoonMovieContainer">
            <div class="attentions">
                <movie :movieList="attentions" :movieCount="attentions.length">

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
    </div>

</template>

<script>
    import BScroll from 'better-scroll'

    import {mapGetters} from 'vuex'
    import Movie from '@/components/Movie'

	export default {
		name: 'soonmovie',
		data() {
			return {
                attentions: []
            }
		},
        components: {
            Movie
        },
        computed:mapGetters([
            'soonMovies'
        ]),
        created() {
            //购票页的即将上映的数据
            this.$store.dispatch('updateSoonMovieComing').then(() => {
                console.log(this.$refs.SoonMovieComeIn);
                this.scroll = new BScroll(this.$refs.SoonMovieWrapper, {
                    scrollY: true,
                    scrollbar: true
                })
            });
        },
        mounted() {

        },
        updated() {
            /*
            * //将this.attentions在updated中在赋值一次，因为放上面mounted和created的话。
            * 只要浏览器一刷新，this.attentions的值就变成undefined了。所以要放在updated中
            * */
            this.attentions = this.$store.state.soonMovies.attention;
        }
	}
</script>

<style lang="less">
    @w: 100rem;
    .SoonMovieWrapper {
        position: absolute;
        top: 168/@w;
        bottom: 120/@w;
        width: 750/@w;
        overflow: hidden;
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

