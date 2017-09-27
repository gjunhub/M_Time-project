<template>
    <section class="commentWrapper" ref="commentWrapper">
        <div class="commentBox">
            <ul class="commentContainer">
                <li v-for="comment,index in commentDetails" :key="index">
                    <h3>{{comment.title}}</h3>
                    <p v-if="comment.summary">{{comment.summary | hiddenText}}</p>
                    <div class="commentDesc">
                        <img :src="comment.relatedObj.image" alt="">
                        <div class="DescRight">
                            <h4>{{comment.relatedObj.title}} ({{comment.relatedObj.year}})</h4>
                            <p>{{comment.relatedObj.titleEn}}</p>
                        </div>
                    </div>
                    <div class="commentBottom">
                        <img :src="comment.userImage" alt="">
                        <span>{{comment.nickname}}</span>
                        <span>评{{comment.rating}}分</span>
                        <span>评论 {{comment.commentCount}}</span>
                    </div>
                </li>
            </ul>
            <div class="pull-down">
                <strong>{{commentPullDownTxt}}</strong>
            </div>
        </div>
    </section>
</template>

<script>

    import {mapGetters} from 'vuex'

    import BScroll from 'better-scroll'
    import hiddenText from '@/filters/hiddenText'

	export default {
		name: 'comment',
		data() {
			return {
                isDownComment: true,
                commentPullDownTxt: '下拉刷新'
            }
		},
        computed: mapGetters([
            'commentDetails'
        ]),
        created() {
            this.$store.dispatch('updateComment').then(() => {
                this.cscroller = new BScroll(this.$refs.commentWrapper, {
                    scrollY: true,
                    click: true,
                    probeType: 1,
                    scrollbar: true,
                    pullDownRefresh: {
                        threshold: 60,
                        stop: 60
                    }
                })
                this.cscroller.on('scroll',pos => {
                    if(pos.y >= 60 && this.isDownComment) {
                        this.commentPullDownTxt = '松开立即刷新';
                    } else if(this.cscroller.y > 10 && this.isDownComment) {
                        this.commentPullDownTxt = '下拉刷新';
                    }
                });

                this.cscroller.on('touchEnd',pos => {
                    if(pos.y >= 60) {
                        this.isDownComment = false;

                        setTimeout(() => {
                            this.$store.dispatch('updateComment').then(() => {
                                this.commentPullDownTxt = '刷新完成';
                            });
                        },800);

                        setTimeout(() => {
                            this.cscroller.scrollTo(0, 0, 500);
                            this.isDownComment = true;
                            this.cscroller.finishPullDown();
                        },1500);
                    }
                });
            });
        },
        filters: {
            hiddenText
        }
	}
</script>

<style lang="less">
    @w: 100rem;
    .commentWrapper {
        position: absolute;
        width: 100%;
        top: 180/@w;
        bottom: 120/@w;
        overflow: hidden;
        background-color: #f7f7f7;
    }
    .commentBox {
        position: absolute;
        width: 100%;
        height: auto;
        background-color: #fff;
    }
    /*下拉刷新*/
    .commentBox .pull-down {
        position: absolute;
        top: -120/@w;
        left: 0;
        width: 100%;
        height: 120/@w;
        text-align: center;
        border-bottom: none;
        padding: 0;
    }
    .commentBox .pull-down strong {
        font-weight: normal;
        display: inline-block;
        width: auto;
        font-size: 28/@w;
        line-height: 120/@w;
    }
    .commentContainer {
        width: 100%;
        box-sizing: border-box;
        padding: 0 24/@w;
    }
    .commentContainer li {
        width: 100%;
        //height: 360/@w;
        box-sizing: border-box;
        padding: 15/@w 0 10/@w 0;
        border-bottom: 1px solid #e5e5e5;
    }
    .commentContainer li h3 {
        width: 100%;
        height: 70/@w;
        font-size: 36/@w;
        font-weight: 500;
        line-height: 70/@w;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .commentContainer li>p {
        width: 100%;
        font-size: 26/@w;
        color: #999;
    }
    .commentDesc {
        margin-top: 14/@w;
        width: 100%;
        height: 120/@w;
        background-color: #f8f8f8;
        -webkit-border-radius: 18/@w 0 18/@w 0;
        -moz-border-radius: 18/@w 0 18/@w 0;
        border-radius: 18/@w 0 18/@w 0;
        -webkit-box-shadow: 2px 1px 3px #f0f0f0;
        -moz-box-shadow: 2px 1px 3px #f0f0f0;
        box-shadow: 2px 1px 3px #f0f0f0;
    }
    .commentDesc * {
        float: left;
    }
    .commentDesc>img {
        height: 120/@w;
        width: 86/@w;
        margin-right: 20/@w;
        -webkit-border-radius: 18/@w 0 18/@w 0;
        -moz-border-radius: 18/@w 0 18/@w 0;
        border-radius: 18/@w 0 18/@w 0;
    }
    .commentDesc .DescRight {
        width: 400/@w;
    }
    .commentDesc .DescRight h4 {
        margin: 0;
        width: 100%;
        height: 56/@w;
        margin-top: 4/@w;
        font-weight: 500;
        line-height: 56/@w;
        font-size: 28/@w;
    }
    .commentDesc .DescRight p {
        width: 100%;
        height: 50/@w;
        line-height: 50/@w;
        font-weight: lighter;
        color: #888;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .commentBottom {
        width: 100%;
        height: 60/@w;
        box-sizing: border-box;
        padding: 10/@w 0;
        font-size: 22/@w;
        color: #999;
    }
    .commentBottom * {
        float: left;
        margin-right: 16/@w;
        line-height: 45/@w;
        font-weight: lighter;
    }
    .commentBottom img {
        width: 40/@w;
        height: 40/@w;
        border-radius: 50%;
    }
    .commentBottom span:nth-of-type(1) {
        max-width: 100/@w;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .commentBottom span:nth-of-type(2) {
        position: relative;
        padding-right: 16/@w;
        color: #55cc7d;
    }
    .commentBottom span:nth-of-type(2)::after {
        content: '';
        position: absolute;
        top: 10/@w;
        right: 0;
        width: 1px;
        height: 56%;
        background-color: #ccc;
    }
</style>
