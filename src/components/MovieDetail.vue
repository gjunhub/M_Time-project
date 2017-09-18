<template>

    <scroller
        :on-refresh="refresh"
        :on-infinite="infinite"
        ref="downLoading"
    >

        <div class="movieDetail" v-if="movieDetails">
            <div class="headerTools">
                <img class="movieDetailBack" src="../image/back.png" @click="back"></img>
                <img src="../image/more.png" class="movieDetailMore"></img>
            </div>
            <div class="movieMessageTop">
                <div class="topHalf">
                    <img :src="movieDetails.image" alt="" class="blurImg">
                    <img :src="movieDetails.image" alt="" class="blurImg1">
                    <h3 class="title">{{movieDetails.titleCn}}</h3>
                    <span class="subTitle">{{movieDetails.titleEn}}</span>
                </div>
                <div class="topOtherHalf">
                    <img :src="movieDetails.image" alt="" class="mainImg">
                    <span class="srcoll">{{movieDetails.rating}}</span>
                    <time class="movieTime">{{movieDetails.runTime}}</time>
                    <span class="movieType">{{movieDetails.type[0]}} / {{movieDetails.type[1]}}</span>
                    <span class="when">{{movieDetails.release.date | showDate('y年m月d日')}}{{movieDetails.location}}上映</span>
                    <span class="desc">"{{movieDetails.commonSpecial}}"</span>
                    <div class="model">
                        <a href="javascript:;" v-if="movieDetails.isDMAX">中国巨幕</a>
                        <a href="javascript:;" v-if="movieDetails.is3D">3D</a>
                        <a href="javascript:;" v-if="movieDetails.isIMAX">IMAX</a>
                        <a href="javascript:;" v-if="movieDetails.isIMAX3D">IMAX 3D</a>
                    </div>
                </div>
            </div>
            <div class="movieTall">

                <p v-if="showText">{{movieDetails.content | showMoreText}}</p>
                <p v-else>{{movieDetails.content}}</p>

                <span class="textMore" @click="textMore">
                    <img src="../image/arrow-down.png" alt="" :class="{active: !showText}">
                </span>
            </div>
            <section class="actor">
                <div class="totalActors">
                    <p>{{movieDetails.personCount}}位演职员</p>
                    <span class="arrowRight"></span>
                </div>
                <div class="directoractorDetail">
                    <div class="director">
                        <p>导演</p>
                        <img :src="movieDetails.director.directorImg" alt="" class="directorImg">
                        <span class="directorName">{{movieDetails.director.directorName}}</span>
                        <span class="directorNameEn">{{movieDetails.director.directorNameEn}}</span>
                    </div>
                    <div class="mainActors">
                        <p>主要演员</p>
                        <div class="mainActorList">
                            <div class="mainActorList-L">
                               <div class="actorImg">
                                   <img :src="movieDetails.actorList[0] && movieDetails.actorList[0].actorImg" alt="" >
                               </div>
                                <span class="directorName">{{movieDetails.actorList[0] && movieDetails.actorList[0].actor}}</span>
                                <span class="directorEnglish">{{movieDetails.actorList[0] && movieDetails.actorList[0].actorEn}}</span>
                                <div>
                                    <img :src="movieDetails.actorList[0] && movieDetails.actorList[0].roleImg" alt="" class="smallImg">
                                    <span class="act">饰{{movieDetails.actorList[0] && movieDetails.actorList[0].roleName}}</span>
                                </div>
                            </div>
                            <div class="mainActorList-R">
                                <div class="actorImg">
                                    <img :src="movieDetails.actorList[1] && movieDetails.actorList[1].actorImg" alt="" >
                                </div>
                                <span class="directorName">{{movieDetails.actorList[1] && movieDetails.actorList[1].actor}}</span>
                                <span class="directorEnglish">{{movieDetails.actorList[1] && movieDetails.actorList[1].actorEn}}</span>
                                <div>
                                    <img :src="movieDetails.actorList[1] && movieDetails.actorList[1].roleImg" alt="" class="smallImg">
                                    <span class="act">饰{{movieDetails.actorList[1] && movieDetails.actorList[1].roleName}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div class="movieImages">
                <p>{{movieDetails.imageCount}}张图片</p>
                <ul class="moviePic">
                    <li v-for="pic in movieDetails.images">
                        <img :src="pic" alt="">
                    </li>
                </ul>
            </div>
            <div class="Talks">
                <h3>网友短评 ({{movieTalksTotals}})</h3>
                <ul class="talkList">
                    <li class="clearFix" v-for="talk,index in movieTalks">
                        <div class="talkPersonImg">
                            <img :src="talk.caimg" alt="">
                        </div>
                        <div class="talksDetails">
                            <div class="talkTop">
                                <p class="talkName">{{talk.ca}}</p>
                                <span>评{{talk.cr | addsrcollZero}}</span>
                            </div>
                            <p class="talkText">{{talk.ce | hideTalkText}}</p>
                            <div class="talkBottom">
                                <time>{{talk.cd | talkTime}}</time>
                                <span>点赞</span>
                                <span>回复</span>
                            </div>
                        </div>
                    </li>
                    <li class="clearFix" v-for="talk,index in newTalks">
                        <div class="talkPersonImg">
                            <img :src="talk.caimg" alt="">
                        </div>
                        <div class="talksDetails">
                            <div class="talkTop">
                                <p class="talkName">{{talk.ca}}</p>
                                <span>评{{talk.cr | addsrcollZero}}</span>
                            </div>
                            <p class="talkText">{{talk.ce | hideTalkText}}</p>
                            <div class="talkBottom">
                                <time>{{talk.cd | talkTime}}</time>
                                <span>点赞</span>
                                <span>回复</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>


        </div>
    </scroller>
</template>

<script>

    import showMoreText from '@/filters/showMoreText'
    import showDate from '@/filters/showDate'
    import hideTalkText from '@/filters/hideTalkText'
    import addsrcollZero from '@/filters/addsrcollZero'
    import talkTime from '@/filters/talkTime'
    import {mapGetters} from 'vuex'

let moreLoad = true;
    let isTalks = false;
    export default {
		name: 'moviedetail',
		data() {
			return {
//			    movieDetails: null,
                showText: true,//是否限制展示所有文字,
                str:"",//刷新的时候判断上面的href地址栏中包含的路由--用来判断是否显示当前导航条
                Index: 1,
                moreLoad:true
            }
		},
        computed: mapGetters([
            'movieDetails',
            'movieTalksTotals',
            'movieTalks',
            'newTalks'
        ]),
        created(){//动态路由
		    this.$store.dispatch('updateMovieDetails', {
                ID: this.$route.params.movieId
            }).then(()=>{
		        setTimeout(() => {
                    isTalks = true
                },200)
            });
            this.str = window.location.href;//获取刷新后的地址栏中的字符串
		    if(this.str.includes('moviedetail')){
		        this.$store.commit('updateHearders');
            };
//            //获取当前影片评论
//		    this.$store.dispatch('updateMovieTalks',{
//
//            }).then(()=>{
//		           console.log(1)
//                   this.isTalks = true;
//            })

        },
        methods: {
            textMore() {
                this.showText = !this.showText;
            },
            back() {
                this.$router.go(-1);//返回上一页
            },
            refresh() {

            },
            infinite() {
                console.log(isTalks)
                if(!isTalks){
                    this.$refs.downLoading.finishInfinite('没有数据了')
                    return
                }
                if(!moreLoad){
                    console.log(2)
                    return;
                }
                moreLoad = false;
                this.Index++;
                this.$store.dispatch('newUpdateMovieTalks',{
                    ID: this.$route.params.movieId,
                    PageIndex: this.Index
                }).then(()=>{
                    this.$nextTick(()=>{
                        this.$refs.downLoading.finishInfinite();
                    })
                    moreLoad = true;
                });
            }
        },
        filters: {
            showMoreText,//是否显示更多文字
            showDate,//按照需求，设定对应格式的年月日
            addsrcollZero,//评分补零
            talkTime,//评论时间戳转换
            hideTalkText//评论文字套多隐藏
        }
	}
</script>

<style lang="less">
    @w: 100rem;
    .clearFix::after {
        display: block;
        clear: both;
        content: '';
    }
    .movieDetail {
        position: relative;
        background-color: #f2f6f3;
    }
    .headerTools {
        position: absolute;
        z-index: 15;
        width: 100%;
        height: 48px;
        box-sizing: border-box;
        padding: 6px 10px;
    }
    .headerTools .movieDetailBack {
        opacity: .8;
        float: left;
        width: 36px;
        height: 36px;
    }
    .headerTools .movieDetailMore {
        opacity: .8;
        float: right;
        width: 32px;
        height: 32px;
        margin-top: 2px;
    }
    .MARGIN {
        height: 60px;
    }
    .movieMessageTop {
        position: relative;
        width: 100%;
        height: 270px;
        overflow: hidden;
    }
    .topHalf {
        position: relative;
        width: 100%;
        height: 50%;
        overflow: hidden;
        color: #fff;
    }
    /*下面写了两个相同的img，第二个为了不让第一个模糊出现四周白边*/
    .topHalf .blurImg {
        position: absolute;
        z-index: 10;
        width: 100%;
        height: auto;
        -webkit-filter: blur(10px);
        -moz-filter: blur(10px);
        -ms-filter: blur(10px);
        filter: blur(10px);
    }
    .topHalf .blurImg1 {
        position: absolute;
        z-index: 9;
        width: 100%;
        height: auto;
        -webkit-filter: blur(10px);
        -moz-filter: blur(10px);
        -ms-filter: blur(10px);
        filter: blur(10px);
        transform: scale(1.2);
    }
    .topHalf .title {
        position: absolute;
        z-index: 11;
        top: 72px;
        left: 40%;
        width: 100px;
        height: 20px;
        color: #fff;
        font: 18px/20px "微软雅黑";
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .topHalf .subTitle {
        position: absolute;
        z-index: 11;
        top: 102px;
        left: 40%;
        width: 140px;
        height: 20px;
        font: 13px/20px "微软雅黑";
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .topOtherHalf {
        position: relative;
        width: 100%;
        height: 50%;
        background-color: #fff;
        color: #333;
    }
    .topOtherHalf .mainImg {
        position: absolute;
        z-index: 15;
        left: 15px;
        top: -60px;
        width: 130px;
        height: 184px;
        padding: 2px;
        background-color: #fff;
    }
    .topOtherHalf .movieTime {
        position: absolute;
        z-index: 16;
        top: 5px;
        left: 40%;
        font: bold 13px/20px "微软雅黑";
        width: 60px;
    }
    .topOtherHalf .movieType {
        position: absolute;
        z-index: 16;
        top: 26px;
        left: 40%;
        font: bold 13px/20px "微软雅黑";
        width: 100px;
    }
    .topOtherHalf .when {
        position: absolute;
        z-index: 16;
        top: 48px;
        left: 40%;
        font: bold 13px/20px "微软雅黑";
        width: 160px;
    }
    .topOtherHalf .srcoll {
        position: absolute;
        z-index: 15;
        top: -22px;
        right: 6%;
        font: 500 18px/46px "微软雅黑";
        width: 43px;
        height: 43px;
        color: #fff;
        text-align: center;
        background-color: #00c608;
    }
    .topOtherHalf .desc {
        position: absolute;
        z-index: 16;
        top: 72px;
        left: 40%;
        letter-spacing: 1px;
        font: 700 14px/20px "微软雅黑";
        width: 200px;
        color: #ff8600;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .topOtherHalf .model {
        position: absolute;
        left: 40%;
        top: 100px;
        height: 20px;
    }
    .topOtherHalf .model a {
        float: left;
        padding: 0 5px;
        margin-right: 5px;
        font: 11px/20px "微软雅黑";
        border: 1px solid #007508;
        box-sizing: border-box;
        color: #007508;
    }
    .movieTall {
        margin-top: 10px;
        width: 100%;
        background-color: #fff;
        padding: 12px 12px 6px 12px;
        box-sizing: border-box;
        color: #333;
    }
    .movieTall .textMore {
        display: inline-block;
        width: 100%;
        height: 16px;
        text-align: center;
    }
    .movieTall .textMore img {
        display: inline-block;
        width: 16px;
        height: 16px;
    }
    .movieTall .textMore img.active {
        transform: rotate(-180deg);
    }
    .actor {
        margin-top: 10px;
        width: 100%;
        box-sizing: border-box;
        padding: 0 12px;
        background-color: #fff;
    }
    .totalActors {
        width: 100%;
        height: 30px;
        font: 900 16px/30px "微软雅黑";
    }
    .directoractorDetail {
        width: 100%;
        height: 270px;
        margin-top: 8px;
    }
    .directoractorDetail .director {
        float: left;
        width: 32%;
        height: 100%;
        border-right: 1px solid #e6e6e6;
    }
    .directoractorDetail .director .directorImg {
        display: block;
        width: 90%;
        height: auto;
    }
    .directoractorDetail .director .directorName,
    .directoractorDetail .director .directorNameEn {
        display: block;
        width: 80%;
        padding: 5px;
        box-sizing: border-box;
        text-align: center;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .mainActors {
        float: left;
        width: 64%;
        margin-left: 10px;
    }
    .mainActors .mainActorList {
        width: 100%;
        height: 100%;
    }
    .mainActorList-L {
        float: left;
        width: 50%;
        padding-right: 10px;
        box-sizing: border-box;
    }
    .mainActorList-R {
        float: left;
        width: 50%;
        padding-right: 10px;
        box-sizing: border-box;
    }
    .mainActorList .actorImg {
        width: 100%;
        height: 110px;
        overflow: hidden;
    }
    .mainActorList .actorImg img {
        width: 100%;
        height: auto;
    }
    .directorName, .directorEnglish {
        display: block;
        padding: 0 5px;
        text-align: center;
        box-sizing: border-box;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .directorEnglish {
        padding: 0 10px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .mainActorList .act {
        display: block;
        width: 100%;
        height: 20px;
        margin-top: 5px;
        text-align: center;
        font-size: 26/@w;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .mainActorList .smallImg {
        display: block;
        width: 50%;
        margin: 10px auto 0;
    }
    .movieImages {
        margin-top: 10px;
        padding: 0 12px;
        font: 900 16px/30px "微软雅黑";
        background-color: #fff;
        height: 260/@w;
    }
    .moviePic {
        margin-top: 10px;
        width: 100%;
        height: 80px;
    }
    .moviePic li {
        float: left;
        width: 25%;
        height: 80px;
        overflow: hidden;
        padding-right: 5px;
        box-sizing: border-box;
    }
    .moviePic li img {
        width: 100%;
        height: 100%;
    }


    .Talks {
        width: 750/@w;
        height: auto;
        margin-top: 20/@w;
        padding: 20/@w;
        box-sizing: border-box;
        background: #fff;
    }
    .Talks h3 {
        width: 100%;
        height: 40/@w;
        line-height: 40/@w;
    }
    .Talks .talkList {
        width: 100%;
        height: auto;
        margin-top: 15/@w;
    }
    .talkList li {
        width: 100%;
        height: auto;
        margin-top: 15/@w;
        border-bottom: 1px solid #eeeeee;
    }
    .talkList li .talkPersonImg {
        float: left;
        width: 130/@w;
        height: 100%;
        padding: 15/@w;
        margin-right: 15/@w;
        box-sizing: border-box;
    }
    .talkPersonImg img {
        width: 100/@w;
        height: 100/@w;
        border-radius: 50%;
    }
    .talksDetails {
        float: left;
        width: 560/@w;
        padding: 15/@w 10/@w 0 0;
    }
    .talksDetails .talkTop {
        width: 100%;
        height: 30/@w;
        line-height: 30/@w;
    }
    .talkTop p {
        float: left;
        width: auto;
        height: 100%;
        color: #999;
    }
    .talkTop span {
        float: right;
        color: #00e622;
    }

    .talkText {
        margin-top:14/@w;
    }
    .talkBottom {
        margin: 20/@w 0 12/@w 0;
        width: 100%;
        height: 46/@w;
    }
    .talkBottom time {
        float: left;
    }
    .talkBottom span:nth-of-type(1) {
        float: right;
    }
    .talkBottom span:nth-of-type(2) {
        float: right;
        margin-right: 48/@w;
    }
</style>
