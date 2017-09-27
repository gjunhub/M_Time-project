<template>
    <section class="advanceWrapper" ref="advanceWrapper">
        <div class="advanceBox">
            <ul class="advanceContainer">
                <li v-for="mov, index in advanceDetails" :key="index">
                    <div class="advanceImg">
                        <img v-lazy="mov.coverImg" alt="">
                        <span></span>
                    </div>
                    <div class="advanceDesc">
                        <p>{{mov.movieName}}</p>
                        <p>{{mov.summary}}</p>
                        <p>{{mov.type | movieType}}</p>
                    </div>
                </li>
            </ul>
            <div class="pull-down">
                <strong>{{advancePullDownTxt}}</strong>
            </div>
        </div>
    </section>
</template>

<script>

    import BScroll from 'better-scroll'

    import {mapGetters} from 'vuex'

    import movieType from '@/filters/movieType'

	export default {
		name: 'advance',
		data() {
			return {
                isDownAdvance: true,
                advancePullDownTxt: '下拉刷新'
            }
		},
        computed: mapGetters([
            'advanceDetails'
        ]),
        created() {
		    this.$store.dispatch('updateAdvanceMovies').then(() => {
		        this.ascroller = new BScroll(this.$refs.advanceWrapper, {
		            scrollY: true,
                    click: true,
                    scrollbar: true,
                    probeType: 1,
                    pullDownRefresh: {//下拉刷新
                        threshold: 60,
                        stop: 60
                    },
                });
		    //下拉刷新
                this.ascroller.on('scroll',(pos) => {
                    if(pos.y >= 60 && this.isDownAdvance) {
                        this.advancePullDownTxt = '松开立即刷新';
                    } else if(this.ascroller.y > 10 && this.isDownAdvance) {
                        this.advancePullDownTxt = '下拉刷新';
                    }
                });
                this.ascroller.on('touchEnd', pos => {
                    if(pos.y >= 60) {
                        this.isDownAdvance = false;

                        setTimeout(() => {
                            this.$store.dispatch('updateAdvanceMovies').then(() => {

                                this.advancePullDownTxt = '刷新完成';
                            });
                        },800);

                        setTimeout(() => {
                            this.ascroller.scrollTo(0, 0, 500);//还原坐标
                            this.isDownAdvance = true;
                            this.ascroller.finishPullDown();//下拉刷新之后告诉组件刷洗完成了
                        },1500);
                    }
                });
            });
        },
        filters: {
            movieType
        }
	}
</script>

<style lang="less">
    @w: 100rem;
    .advanceWrapper {
        position: absolute;
        width: 100%;
        top: 180/@w;
        bottom: 120/@w;
        overflow: hidden;
        background: #f7f7f7;
    }
    .advanceBox {
        position: relative;
        width: 100%;
    }
    /*下拉刷新*/
    .advanceBox .pull-down {
        position: absolute;
        top: -120/@w;
        left: 0;
        width: 100%;
        height: 120/@w;
        text-align: center;
        border-bottom: none;
        padding: 0;
    }
    .advanceBox .pull-down strong {
        font-weight: normal;
        display: inline-block;
        width: auto;
        font-size: 28/@w;
        line-height: 120/@w;
    }
    .advanceContainer {
        width: 100%;
        height: auto;
        box-sizing: border-box;
        padding: 0 20/@w;
        background-color: #fff;
    }
    .advanceContainer li {
        width: 100%;
        height: 270/@w;
        box-sizing: border-box;
        padding: 15/@w 0;
        border-bottom: 1px solid #ccc;
    }
    .advanceContainer li .advanceImg {
        position: relative;
        float: left;
        width: 350/@w;
        margin: 20/@w 20/@w 0 0;
        height: 200/@w;
    }
    .advanceImg img {
        width: 100%;
        height: 200/@w;
        border-radius: 8/@w;
        -webkit-box-shadow: 1px 1px 5px #999;
        -moz-box-shadow: 1px 1px 5px #999;
        box-shadow: 1px 1px 5px #999;
    }
    .advanceImg span {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 80/@w;
        height: 80/@w;
        margin: -40/@w 0 0 -40/@w;
        background: url(../..//static/movPlay.png) no-repeat;
        background-size: 80/@w auto;
    }
    .advanceDesc {
        float: right;
        width: 330/@w;
        box-sizing: border-box;
        padding: 20/@w 0 0 0;
    }
    .advanceDesc p:nth-of-type(1) {
        font-weight: 700;
        font-size: 32/@w;
        width: 100%;
        height: 80/@w;
        line-height: 80/@w;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .advanceDesc p:nth-of-type(2) {
        font-weight: 400;
        font-size: 28/@w;
        width: 100%;
        height: 64/@w;
        line-height: 64/@w;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #777;
    }
    .advanceDesc p:nth-of-type(3) {
        font-weight: 400;
        font-size: 28/@w;
        width: 100%;
        height: 70/@w;
        line-height: 70/@w;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #999;
    }
</style>
