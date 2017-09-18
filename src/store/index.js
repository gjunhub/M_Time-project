import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({

    state: {
        tabs:false,//显示购票页面的第二个导航选项卡与否
        hearders: true,//显示header头部与否
        isLoad: 0,//判断当前是否在请求数据，显示loading与否
        movieID: '',
        movieDetails:null,//影片详情--数组
        movieTalks: [],//影片评论 --数组
        movieTalksTotals: '',//当前影片的总评论数
        NowHotMovies: [],//正在上映的数据 数组
        soonMovies: [],//即将上映的数据 数组
        newTalks:[]
    },
    getters: {
        tabs(state){
            return state.tabs;
        },
        isLoad(state){
            return state.isLoad;
        },
        movieDetails(state){
            return state.movieDetails;
        },
        hearders(state) {
            return state.hearders;
        },
        movieTalks(state) {
            return state.movieTalks;
        },
        movieTalksTotals(state) {
           return state.movieTalksTotals;
        },
        NowHotMovies: state => state.NowHotMovies,

        soonMovies: state => state.soonMovies,
        newTalks:state => state.newTalks,


    },
    mutations: {
        changeLoad(state,data) {
            state.isLoad = data;
        },
        setStateMovieID(state,id) {
            state.movieID = id;
        },
        updateTabs(state){//修改是否当前页面显示ticket页面的-正在热映-即将上映的导航条
            state.tabs = true;
        },
        updateMovieDetails(state,data){
            state.movieDetails = data;
        },
        updateHeader(state,data) {//跳转路由时是否显示hearder头部
            state.hearders = data;
        },
        updateHearders(state){
            state.hearders = false;
        },
        updateTalks(state,data) {
            state.movieTalks = data;
        },
        updateTalksTotals(state,num) {
            state.movieTalksTotals = num;
        },
        updateNowHotMovies(state,data) {
            state.NowHotMovies = data;
        },
        updateSoonMovies(state,data) {
            state.soonMovies = data;
        },
        newUpdateMovieTalks(state,data){
            state.newTalks = [...state.newTalks,...data]
        }
    },
    actions: {
        updateMovieDetails(store,id){//影片详情
            store.commit('changeLoad',1);
            return new Promise(function (resolve) {
                fetch('/api/movie/detail.api?locationId=290&movieId=' +id.ID).then(response => {
                    return response.json();
                }).then(data => {
                    // console.log('影片详情',data)
                    // this.movieDetails = data;
                    // console.log(data)

                    store.commit('updateMovieDetails',data);
                });
                fetch('/api/Showtime/HotMovieComments.api?pageIndex=1&movieId=' +id.ID).then(response => {
                    return response.json();
                }).then(data => {
                    // console.log('评论',data);
                    store.commit('changeLoad',0);
                    store.commit('updateTalksTotals',data.data.totalCount);
                    store.commit('updateTalks',data.data.cts);
                    resolve()
                });
            })
        },
        //电影评分   ----默认显示20条数据 pageIndex默认为1 ，为2时显示21 - 40
        updateMovieTalks({commit},id) {
            // console.dir(commit,'999',id);
            //     fetch('/api/Showtime/HotMovieComments.api?pageIndex=1&movieId=' +id.ID).then(response => {
            //         return response.json();
            //     }).then(data => {
            //         // console.log('评论',data);
            //         commit('updateTalksTotals',data.data.totalCount);
            //         commit('updateTalks',data.data.cts);
            //     });
        },
        updateNowMoviePlaying({commit}) {
            fetch('/api/Showtime/LocationMovies.api?locationId=290').then( response => {
                return response.json();
            }).then(data => {
                // console.log(data,'正在上映');
                commit('updateNowHotMovies',data);
            });
        },
        updateSoonMovieComing({commit}) {
            fetch('/api/Movie/MovieComingNew.api?locationId=290').then( response => {
                return response.json();
            }).then(data => {
                // console.log(data,'即将上映');
                commit('updateSoonMovies',data);
            });
        },
        newUpdateMovieTalks({commit},id){
            return new Promise(function (relove) {
                fetch('/api/Showtime/HotMovieComments.api?pageIndex='+id.PageIndex+'&movieId=' +id.ID).then(response => {
                    return response.json();
                }).then(data => {
                    console.log('评论',data,id.PageIndex);
                    commit('newUpdateMovieTalks',data.data.cts);
                    relove()
                });
            })
        }

    }
});

export default store
