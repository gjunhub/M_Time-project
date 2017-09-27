<template>
    <section class="NewsWrapper" ref="NewsWrapper">
        <div class="NewsContainer">
            <ul class="newsList">
                <!--新闻页面进来的首次20条数据-->
                <li v-for="news,index in newsDetails">
                    <div v-if="news.images.length == 0" class="shortNew">
                        <!--<img :src="news.image" alt="" class="shortNewImg">-->
                        <div v-if="news.image != ''"
                            class="shortNewImg"
                             :style="{backgroundImage:'url('+ news.image +')'}">

                            <span v-if="news.tag != '无'">{{news.tag}}</span>
                        </div>
                        <div v-else
                            class="shortNewImg"
                            :style="{backgroundImage:'url(../static/404.jpg)'}">

                            <span v-if="news.tag != '无'">{{news.tag}}</span>
                        </div>
                        <div class="shortNewDesc">
                            <p>{{news.title}}</p>
                            <div class="shortDetail">
                                <time>{{news.publishTime}}</time>
                                <span v-if="news.commentCount != 0">评论 {{news.commentCount}}</span>
                            </div>
                        </div>
                    </div>
                    <div v-else class="longerNew">
                        <p>{{news.title}}</p>
                        <div class="longerNewImg">
                            <div :style="{backgroundImage:'url('+news.images[0].url1 +')'}"></div>
                            <div :style="{backgroundImage:'url('+news.images[1].url1 +')'}"></div>
                            <div :style="{backgroundImage:'url('+news.images[2].url1 +')'}"></div>
                        </div>
                        <div class="longerNewDesc">
                            <time>{{news.publishTime}}</time>
                            <span>评论 {{news.commentCount}}</span>
                        </div>
                    </div>
                </li>
                <!--新闻页面上拉加载的更多数据-->
                <li v-for="news,index in moreNewsDetails">
                    <div v-if="news.images.length == 0" class="shortNew">
                        <!--<img :src="news.image" alt="" class="shortNewImg">-->
                        <div v-if="news.image != ''"
                             class="shortNewImg"
                             :style="{backgroundImage:'url('+ news.image +')'}">

                            <span v-if="news.tag != '无'">{{news.tag}}</span>
                        </div>
                        <div v-else
                             class="shortNewImg"
                             :style="{backgroundImage:'url(../static/404.jpg)'}">

                            <span v-if="news.tag != '无'">{{news.tag}}</span>
                        </div>
                        <div class="shortNewDesc">
                            <p>{{news.title}}</p>
                            <div class="shortDetail">
                                <time>{{news.publishTime}}</time>
                                <span v-if="news.commentCount != 0">评论 {{news.commentCount}}</span>
                            </div>
                        </div>
                    </div>
                    <div v-else class="longerNew">
                        <p>{{news.title}}</p>
                        <div class="longerNewImg">
                            <div :style="{backgroundImage:'url('+news.images[0].url1 +')'}"></div>
                            <div :style="{backgroundImage:'url('+news.images[1].url1 +')'}"></div>
                            <div :style="{backgroundImage:'url('+news.images[2].url1 +')'}"></div>
                        </div>
                        <div class="longerNewDesc">
                            <time>{{news.publishTime}}</time>
                            <span>评论 {{news.commentCount}}</span>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="pull-down">
                <strong>{{newsPullDownTxt}}</strong>
            </div>
            <div class="pull-up">
                <span>{{newsPullUpText}}</span>
            </div>
        </div>
    </section>
</template>

<script>

    import BScroll from 'better-scroll'

    import {mapGetters} from 'vuex'
	export default {
		name: 'news',
		data() {
			return {
                newsPullDownTxt: '下拉刷新',
                newsPullUpText: '上拉更多',
                isDownNews: true,//下拉刷新的截流
                isUpNews: true,//上拉加载的截流
                newPageIndex: 1,//上拉加载更多的新闻
                lastMoreNewsDetails: [],//判断上一次加载和这次加载的数据是不是一样，一样则数据全部请求完了
                canNewsLoad: true,//判断还能否继续上拉加载更多数据--判断数据到底之后，不能让用户在请求
            }
		},
        computed: mapGetters([
            'newsDetails',//首次进来的数据
            'moreNewsDetails'//上拉加载的数据
        ]),
        created() {
		    /*
		    * 如果用户在新闻页面上拉加载了更多数据，在点到其他页面后，再回来，就让之前加载更多的数据清空，
		    * 只留下新闻页面默认的20条数据----不过我觉得也可以不清空，只要不是动态路由绑定的页面，
		    * 具体看业务需求吧，产品老大第一。
		    * */
		    this.$store.commit('clearmoreNewsDetails');

            //请求--新闻数据--
            this.$store.dispatch('updateNews').then(() => {
                this.nscroller = new BScroll(this.$refs.NewsWrapper,{
                    scrollY: true,
                    click: true,
                    scrollbar: true,
                    probeType: 1,
                    pullDownRefresh: {
                        threshold: 60,
                        stop: 60
                    },
                    pullUpLoad: {
                        threshold: -40,
                        moreTxt: '加载更多',
                        noMoreTxt: '没有更多数据'
                    }
                })
                this.nscroller.on('scroll',(pos)=> {
            //下拉操作
                    if(pos.y >= 60 && this.isDownNews) {
                        this.newsPullDownTxt = '松开立即刷新';
                    } else if(this.nscroller.y > 10 && this.isDownNews) {
                        console.log('heiheihei');
                        this.newsPullDownTxt = '下拉刷新';
                    }
            //上拉操作
                    if(pos.y <= this.nscroller.maxScrollY - 50 && this.isUpNews) {
                        this.newsPullUpText = '松开加载更多';
                    } else if(this.nscroller.y > this.nscroller.maxScrollY - 30 && this.isUpNews) {
                        this.newsPullUpText = '上拉查看';
                    }
                });
                this.nscroller.on('touchEnd',(pos) => {
            //下拉刷新
                    if(pos.y >= 60) {
                        this.isDownNews = false;
                        setTimeout(() => {
                            this.$store.dispatch('updateNews').then(() => {
                                this.newsPullDownTxt = '刷新成功';
                            });
                        },800);

                        setTimeout(()=> {
                            this.nscroller.scrollTo(0, 0, 500);
                            this.isDownNews = true;
                            this.nscroller.finishPullDown();
                        },1500);
                    }
            //上拉加载
                    if(pos.y <= this.nscroller.maxScrollY - 50 ) {
                        this.newPageIndex++;
                        this.isUpNews = false;
                        this.newsPullUpText = '玩命加载中…';
                        if(this.canNewsLoad) {
                            setTimeout(()=> {
                                this.$store.dispatch('updateMoreNews',this.newPageIndex).then(()=> {
                                    //上拉加载数据后，手动重置刷新一下当前页面高度，用于获取新的scrollBar的高度
                                    this.nscroller.refresh();
                                    //上拉加载完成之后告诉betterS加载完成了
                                    this.nscroller.finishPullUp();
                            //判断数据是否已经全部请求完成，是的话，就让用户不能再请求了
                                    if(this.lastMoreNewsDetails.length == this.moreNewsDetails.length) {
                                        this.canNewsLoad = false;
                                        this.newsPullUpText = '亲！到底啦~';
                                        console.log('不知道');
                                        return;
                                    }

                                    this.lastMoreNewsDetails = this.moreNewsDetails;


                                });
                            },1000);

                            setTimeout(()=> {

                                this.isUpNews = true;

                            },1500);
                        }
                    }
                });
            });
        }
	}
</script>

<style lang="less">
    @w: 100rem;
    img {
        vertical-align: top;
    }
    .NewsWrapper {
        position: absolute;
        top: 178/@w;
        bottom: 120/@w;
        width: 100%;
        overflow: hidden;
        background-color: #f7f7f7;
    }
    .NewsContainer {
        position: absolute;
        width: 100%;
        background-color: #fff;
    }
    .newsList {
        width: 100%;
        box-sizing: border-box;
        padding: 0 24/@w;
    }
    /*下拉刷新*/
    .NewsWrapper .pull-down {
        position: absolute;
        top: -120/@w;
        left: 0;
        width: 100%;
        height: 120/@w;
        text-align: center;
        border-bottom: none;
        padding: 0;
    }
    .NewsWrapper .pull-down strong {
        font-weight: normal;
        display: inline-block;
        width: auto;
        font-size: 28/@w;
        line-height: 120/@w;
    }
    /*上拉加载*/
    .NewsWrapper .pull-up {
        width: 100%;
        height: 100/@w;
        text-align: center;
        background-color: #f7f7f7;
        padding: 0;
        border-bottom: 0;
    }
    .NewsWrapper .pull-up span {
        display: inline-block;
        width: auto;
        font-size: 28/@w;
        line-height: 100/@w;
    }

    .newsList li {
        width: 100%;
        height: 288/@w;
        padding: 20/@w 0;
        border-bottom: 1px solid #ccc;
    }
    /*shortNew*/
    .newsList li .shortNew {
        width: 100%;
        height: 100%;
    }
    .shortNew .shortNewImg {
        position: relative;
        float: left;
        width: 200/@w;
        margin: 20/@w 18/@w 18/@w 0;
        height: 200/@w;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        box-shadow: 1px 1px 5px #999;
        border-radius: 8/@w;
    }
    .shortNewImg span {
        position: absolute;
        top: 0;
        left: 0;
        width: 60/@w;
        height: 32/@w;
        padding: 4/@w 6/@w;
        background: #ff570d;
        color: #fff;
        line-height: 26/@w;
        text-align: center;
        font-size: 20/@w;
        border-radius: 8/@w 0 8/@w 0;
    }
    .shortNew .shortNewDesc {
        float: left;
        width: 450/@w;
        margin: 30/@w 0 15/@w 10/@w;
    }
    .shortNew .shortNewDesc p {
        font-size: 36/@w;
        font-weight: 700;
    }
    .shortNew .shortDetail {
        width: 100%;
        height: 40/@w;
        margin-top: 28/@w;
        color: #888;
    }
    .shortNew .shortDetail time {
        float: left;
        margin-right: 100/@w;
    }
    .shortNew .shortDetail span {
        float: left;
    }
    /*longerNew*/
    .longerNew {
        position: relative;
        width: 100%;
        height: 100%;
    }
    .longerNew p {
        width: 100%;
        height: 40/@w;
        font-size: 36/@w;
        line-height: 40/@w;
        font-weight: 700;
    }
    .longerNew .longerNewImg {
        width: 100%;
        height: 150/@w;
        margin-top: 12/@w;
    }
    .longerNew .longerNewImg div {
        float: left;
        width: 31.8%;
        height: 100%;
        margin: 4/@w;
        background-repeat: no-repeat;
        background-position: center top;
        background-size: cover;
    }
    .longerNew .longerNewDesc {
        position: absolute;
        bottom: 0/@w;
        left: 0;
        color: #888;
        width: 100%;
        height: 30/@w;
    }
    .longerNewDesc * {
        float: left;
    }
    .longerNewDesc time {
        margin-right: 100/@w;
    }
</style>
