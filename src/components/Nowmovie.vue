<template>
    <div class="NowMovWrapper" ref="NowMovWrapper">
        <div class="nowContainer" ref="nowContainer">
            <ul class="TicMovieList">
                <li v-for="HotMov,index in NowHotMovies.ms">
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
            <div class="pull-down">
                <strong>{{pullDownTxt}}</strong>
            </div>
            <div class="pull-up">
                <span>{{pullUpText}}</span>
            </div>
        </div>
    </div>
</template>

<script>

    import BScroll from 'better-scroll'

    import {mapGetters} from 'vuex'
    import addsrcollZero from '@/filters/addsrcollZero'

    const down_config = {
        threshold: 60,
        stop: 60
    };
    const up_config = {
        threshold: -40,
        moreTxt: '加载更多',
        noMoreTxt: '没有更多数据'
    }

	export default {
		name: 'nowmovie',
		data() {
			return {
                attentions: [],
                pullDownTxt: '下拉刷新',
                pullUpText: '上拉查看',
                isDown: true,//下拉刷新的截流
                isUp: true,//上拉加载的截流
            }
		},
        computed: mapGetters([
            'NowHotMovies'
        ]),
        created() {

        },
        mounted() {
            /*
            * 购票页的正在热映的数据--下面写法是让数据全部获取完成之后，在执行滑屏操作，不然会出现
            * 刷新后有时能滑屏。有时不能
            * */
            this.$store.dispatch('updateNowMoviePlaying').then(() => {
                this.scroll = new BScroll(this.$refs.NowMovWrapper, {
                    scrollY: true,//y轴滚动
                    scrollbar: true,//显示滚动条
                    pullDownRefresh: down_config,//开启上拉刷新
                    probeType: 1,
                    /*
                    * //开启上拉加载后，上面的probetype的值就乱了，测了一下一直是3
                    * 这样的话，on('scroll')就一直触发了，这个值哪怕在请求数据完成后
                    * 本应该显示'刷新成功'，但是会被on('scroll')一直触发，而将值一直
                    * 变成了'松开立即刷新'，所以要一个开关控制on('scroll')的截流 --isDown
                    * */
                    pullUpLoad: up_config

                });
                /*
                * 下面为--下拉刷新
                * */
                this.scroll.on('scroll',(pos) => {

//                    console.log(this.scroll.y,9996,this.scroll.y == 0);

                    //每次下拉先将文字变成默认，因为下来刷新后，文字内容就没变回去
                    if(this.scroll.y > 10 && this.isDown) {
                        this.pullDownTxt = '下拉刷新';
                    } else if(this.scroll.y > this.scroll.maxScrollY - 30 && this.isUp) {
                        this.pullUpText = '上拉查看';
                    }


                    if (pos.y >= 60 && this.isDown) {
                        this.pullDownTxt = '松开立即刷新';
//                        console.log('nani');//判断当前是否截流了
                    } else if (pos.y < (this.scroll.maxScrollY - 50) && this.isUp) {
                        this.pullUpText = '松开加载更多';
                    }

                });
                this.scroll.on('touchEnd',(pos) => {
                    console.log(pos.y , this.scroll.maxScrollY - 60);
                    if(pos.y >= 60) {
                        console.log('haole');

                        setTimeout(() => {
                            this.$store.dispatch('updateNowMoviePlaying').then(() => {
                                this.isDown = false;
                                this.pullDownTxt = '刷新成功';
                                console.log(this.pullDownTxt,123,this.isDown);
                            });
                        },500);

                        setTimeout(() => {
                            this.scroll.scrollTo(0,0,500);//刷新完成之后回到顶部
            /*
            * -------注意：下拉刷新完成之后，要将刷新完成的状态告知better-scroll(下面的代码),不然会有
            * 刷新之后再次滑屏卡顿现象
            * */
                            this.scroll.finishPullDown();
                            this.isDown = true;
                        },1500);

                /*
                * 上拉加载
                * */
                    } else if(pos.y < (this.scroll.maxScrollY - 50)) {
                        this.isUp = false;
                        this.pullUpText = '我是有底线哒…';
                        setTimeout(() => {
                            this.isUp = true;
                            console.log(this.pullUpText);
                            this.scroll.scrollTo(0,this.scroll.maxScrollY+ 50,1000);

                        },1000);
                    }
                });

            });

        },
        methods: {

        },
        filters: {
            addsrcollZero
        }
	}
</script>

<style lang="less">
    @w: 100rem;
    .NowMovWrapper {
        position: absolute;
        top: 168/@w;
        bottom: 120/@w;
        width: 750/@w;
        overflow: hidden;
        background-color: #f7f7f7;
    }
    .nowContainer {
        width: 100%;
        background-color: #fff;
    }
    .TicMovieList {
        width: 100%;
        padding: 0 20/@w;
        box-sizing: border-box;
    }
    /*下拉刷新*/
    .NowMovWrapper .pull-down {
        position: absolute;
        top: -120/@w;
        left: 0;
        width: 100%;
        height: 120/@w;
        text-align: center;
    }
    .NowMovWrapper .pull-down strong {
        font-weight: normal;
        display: inline-block;
        width: auto;
        font-size: 28/@w;
        line-height: 120/@w;
    }
    /*上拉加载*/
    .NowMovWrapper .pull-up {
        width: 100%;
        height: 100/@w;
        text-align: center;
        background-color: #f7f7f7;
    }
    .NowMovWrapper .pull-up span {
        display: inline-block;
        width: auto;
        font-size: 28/@w;
        line-height: 100/@w;
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
