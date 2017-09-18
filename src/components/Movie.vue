<template>
    <div class="gridlist-demo-container">
        <mu-grid-list class="gridlist-inline-demo">
            <mu-grid-tile v-for="tile, index in movieList " :key="index" @click.native="getMovieId(tile.movieId ||tile.id)">
                <div class="movieInTime" v-if="tile.releaseDate">
                    <span>{{tile.releaseDate}}</span>
                </div>
                <img :src="tile.img || tile.image"/>
                <strong class="score" v-if="tile.ratingFinal">{{tile.ratingFinal}}</strong>
                <span slot="title" v-if="">{{tile.titleCn || tile.title}}</span>
            </mu-grid-tile>
        </mu-grid-list>
    </div>
</template>

<script>
	export default {
		name: 'movie',
        props: ['movieList'],
        methods: {
            getMovieId(id) {

                this.$store.commit('setStateMovieID',id);//其实用了动态路由之后就用不着这段代码了
                this.$router.push('/moviedetail/' + id);
                console.log(123124124134,id)
            }
        }
	}
</script>

<style lang="less">
    @w: 100rem;
    strong {
        font-weight: normal;
    }
    .gridlist-demo-container{
        position: relative;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
    .mu-grid-tile-title-container {
        margin-left: 20/@w;
    }
    .mu-grid-tile.multiline .mu-grid-tile-titlebar {
        height: 108/@w;
    }

    .mu-grid-tile-title-container {
        position: relative;
        width: 100% !important;
    }
    .mu-grid-tile-title {
        z-index: 1000;
        position: absolute;
        top: 20px;
        left: 20px;
        color: #333;
        font-size: 26/@w;
        width: 400/@w;
    }
    .gridlist-inline-demo>div {
        width: 33.5% !important;
    }
    .mu-grid-tile {
        width: 100%;
    }
    .mu-grid-tile>img {
        height: 100%;
    }
    .gridlist-inline-demo{
        display: flex;
        flex-wrap: nowrap;
        overflow-x: auto;
    }
    .mu-grid-tile-titlebar {
        background-color: rgba(0 ,0 ,0 ,0);
    }
    .score {
        position: absolute;
        top: 10/@w;
        right: 10/@w;
        width: 52/@w;
        height: 40/@w;
        border-radius: 2px;
        background-color: rgba(89, 157, 0, 0.89);
        color: #fff;
        text-align: center;
        font-size: 24/@w;
        line-height: 40/@w;
    }

    .movieInTime {
        width: 100%;
        height: 50/@w;
        line-height: 50/@w;
        font-size: 26/@w;
    }
</style>
