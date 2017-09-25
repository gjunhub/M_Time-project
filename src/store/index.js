import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({

    state: {
        userDesc: [//模拟登录后的用户
            {
                img: '../../static/user1.jpg',
                name: '嘟嘟熊的早晨'
            },{
                img: '../../static/user2.jpg',
                name: '爱减肥的妮可'
            },{
                img: '../../static/user3.jpg',
                name: '突然想念你'
            },

        ],
        MathIndex: Math.floor(Math.random() * 3),//随机一个下标值
        activeTab: 'tab1',//屏幕下方的tab选中了哪一个
        tabs:false,//显示购票页面的第二个导航选项卡与否
        hearders: true,//显示header头部与否
        showFooter: true,//显示footer底部与否
        isLoad: 0,//判断当前是否在请求数据，显示loading与否
        movieID: '',
        isLog: false,//判断当前是否登录了
        todayHotNews: [],//首页今日热点数据 -数组
        movieDetails:null,//影片详情--数组
        movieTalks: [],//影片评论 --数组
        movieTalksTotals: '',//当前影片的总评论数
        NowHotMovies: [],//正在上映的数据 数组
        soonMovies: [],//即将上映的数据 数组
        newTalks:[],//上拉加载更多的评论数目 -数组
        newsDetails: [],//新闻页面的首次加载的20条数据 -数组
        moreNewsDetails: [],//上拉加载更多的新闻数据 -数组
        advanceDetails: [],//预告片的数据 - 数组
        commentDetails: [],//影评的数据 -数组
        hotSearchMessages: [],//热门搜索的数据 - 数组
        searchMovieLists: [],//用户搜索的影片数据 - 数组
       // searchMoreMovieLists: [],//用户搜索的上拉加载后的更多影片数据 - 数组

        userCollections: [],//用户登录后点击收藏按钮后存的当前影片信息的数据
        userbuys: [],//用户登录后点击购票按钮后存的当前影片信息的数据

        locationCitys: [],//所有定位的城市数据

        userLocations: {//用户选择定位的城市信息
            id: 290,
            city: '北京'
        },
    },
    getters: {
        userDesc: state=> state.userDesc,

        isLog: state=> state.isLog,//是否已经登录了

        isLoad: state=> state.isLoad,

        showFooter: state=> state.showFooter,//是否显示当前的底部

        tabs(state){
            return state.tabs;
        },
        activeTab: state => state.activeTab,//当前底部tab选中了谁
        isLoad(state){
            return state.isLoad;
        },
        movieDetails(state){
            //
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
        todayHotNews:state => state.todayHotNews,//今日热点的数据

        NowHotMovies: state => state.NowHotMovies,

        soonMovies: state => state.soonMovies,

        newTalks:state => state.newTalks,

        newsDetails:state => state.newsDetails,//新闻数据(首次加载的20条)

        moreNewsDetails:state => state.moreNewsDetails,//上拉加载更多的新闻数据(20条一次)

        advanceDetails:state => state.advanceDetails,//预告片的数据

        commentDetails:state => state.commentDetails,//影评的数据

        hotSearchMessages:state => state.hotSearchMessages,//热门搜索的数据

        searchMovieLists:state => state.searchMovieLists,//搜索的影片数据

        //searchMoreMovieLists:state=> state.searchMoreMovieLists,//搜索页面影片的上拉加载后的数据

        userCollections:state => state.userCollections,//用户登录后点击收藏按钮后存的当前影片信息的数据

        userbuys:state => state.userbuys,//用户登录后点击收藏按钮后存的当前影片信息的数据

        userLocations(state) { //用户选择定位的城市信息
            return state.userLocations;
        },

        locationCitys:state => state.locationCitys,//所有的定位城市数据


    },
    mutations: {
        updateIsLog(state,data) {//更新是否登录的状态
            state.isLog = data;
        },
        updateFooter(state,data) {
            state.showFooter = data;
        },
        updateActiveTab(state,val) {
            state.activeTab = val;
        },
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
            data.resetType = data.type.join(' / ');
            state.movieDetails = data;
        },
        updateTodayHotNews(state,data) {
            state.todayHotNews = data;
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
        //影片详情 上拉刷新的后续数据
        newUpdateMovieTalks(state,data){
            state.newTalks = [...state.newTalks,...data];
        },

        updateNewsDetails(state,data) {
            state.newsDetails = data;
        },
        /*
        * 动态路由切换影片详情后，只要上拉加载一次评论，切到其他影片详情后，newTalks的值会将
        * 上一个影片加载的评论，带到现在的影片详情下边，所以每次切换影片详情都要清空一下。
        * */
        clearNewtalks(state) {
            state.newTalks = [];
        },

        updateMoreNewsDetails(state,data) {
            state.moreNewsDetails = [...state.moreNewsDetails, ...data];
        },
        //每次进新闻页面，不管之前有没有进过新闻页上拉加载过数据，一律清空上拉加载的更多数据
        clearmoreNewsDetails(state) {
            state.moreNewsDetails = [];
        },
        //预告片数据
        updateAdvanceMov(state,data) {
            state.advanceDetails = data;
        },
        //影评数据
        updateCommentDetails(state,data) {
            state.commentDetails = data;
        },
        //热门搜索数据
        updateHotSearchMessages(state,data) {
            state.hotSearchMessages = data;
        },
        //用户搜索的影片数据
        updateSearchMovieList(state,data) {
            state.searchMovieLists = data;
        },
        // //获取用户在搜索页面上拉加载后的数据
        // updateMoveSearchMovieList(state,data) {
        //     state.searchMoreMovieLists = [...state.searchMoreMovieLists,...data];
        //     console.log(state.searchMoreMovieLists,'我看你到底对不对');
        // },
        // //每次清空用户搜索时，上拉加载的更多数据
        // removeSearchMovieList(state) {
        //     state.searchMoreMovieLists = [];
        // }


        //用户登录后点击收藏按钮后存的当前影片信息的数据---有点小交互
        updateCollection(state,data) {
            state.userCollections = [...state.userCollections,...[data]];
            // console.log(state.userCollections[0],'state.userCollections');
        },

        //用户登录后点击购票按钮后存的当前影片信息的数据---有点小交互
        updatebuy(state,data) {
            state.userbuys = [...state.userbuys,...[data]];
            // console.log(state.userbuys[0],'state.userCollections');
        },

        //所有的定位城市信息
        updateLocationCitys(state,data) {
            state.locationCitys = data;
        },

        //用户选择的城市信息
        updateUserLocation(state,data) {
            state.userLocations = data;
            console.log(state.userLocations);
        }
    },


    actions: {
        //所有的定位城市数据
        updateLocation({commit}) {
            return new Promise(resolve => {
                fetch('/api/Showtime/HotCitiesByCinema.api').then(response => {
                    return response.json();
                }).then(data => {
                    console.log(data.p,'城市');
                    commit('updateLocationCitys',data.p);
                    resolve();
                })
            });
        },

        updateTodayHots({commit},Axios) {//首页今日热门---在store.js中用axios，需要传参进来
            return new Promise(resolve => {
                Axios.get('/cpi/Service/callback.mi/PageSubArea/GetFirstPageAdvAndNews.api?t=201791714494650798').then(data => {
                    console.log(data,'今日热点');
                    commit('updateTodayHotNews',data.data.hotPoints);
                    resolve();
                })
            })
        },

        updateMovieDetails({commit},id){//影片详情 + 影片评论
            store.commit('changeLoad',1);
    //为了拿到请求数据后的返回值，给上拉刷新，能用来判断当前是一开始加载时不触发infinite函数。
            return new Promise(function (resolve) {
                fetch('/api/movie/detail.api?locationId='+ store.state.userLocations.id +'&movieId=' +id.ID).then(response => {
                    return response.json();
                }).then(data => {
                    // console.log('影片详情',data)
                    // this.movieDetails = data;
                    // console.log(data)

                    commit('updateMovieDetails',data);
                    commit('changeLoad',0);
                });
                //电影评分   ----默认显示20条数据 pageIndex默认为1 ，为2时显示21 - 40
                fetch('/api/Showtime/HotMovieComments.api?pageIndex=1&movieId=' +id.ID).then(response => {
                    return response.json();
                }).then(data => {
                    console.log('评论',data);
                    commit('changeLoad',0);
                    commit('updateTalksTotals',data.data.totalCount);
                    commit('updateTalks',data.data.cts);
                    resolve();//=======>>>有才能.then
                });
            })
        },
        updateNowMoviePlaying({commit}) {
            store.commit('changeLoad',1);
            return new Promise((resolve) => {
                fetch('/api/Showtime/LocationMovies.api?locationId=' + store.state.userLocations.id).then( response => {
                    return response.json();
                }).then(data => {
                    // console.log(data,'正在上映');
                    commit('updateNowHotMovies',data);
                    commit('changeLoad',0);
                    resolve();
                });
            })
        },
        updateSoonMovieComing({commit}) {
            store.commit('changeLoad',1);
            return new Promise((resolve) => {
                fetch('/api/Movie/MovieComingNew.api?locationId=' + store.state.userLocations.id).then( response => {
                    return response.json();
                }).then(data => {
                    console.log(data,'即将上映');
                    commit('updateSoonMovies',data);
                    commit('changeLoad',0);
                    resolve();
                });
            })
        },

    //上拉刷新时，再次添加一个数组  每次将下拉加载的数据添加进这个数组中渲染
        newUpdateMovieTalks({commit},id){
            store.commit('changeLoad',1);
            return new Promise(function (resolve) {
                fetch('/api/Showtime/HotMovieComments.api?pageIndex='+id.PageIndex+'&movieId=' +id.ID).then(response => {
                    return response.json();
                }).then(data => {
                    console.log('评论',data,id.PageIndex);
                    commit('newUpdateMovieTalks',data.data.cts);
                    commit('changeLoad',0);
                    resolve();
                });
            })
        },
        //获取首次加载--新闻页面--的20条信息
        updateNews({commit}) {
            store.commit('changeLoad',1);
            return new Promise((resolve) => {
                fetch('/cpi/Service/callback.mi/News/NewsList.api?t=201791522401846841&pageIndex=1').then(response => {
                    return response.json();
                }).then(data => {
                    console.log(data,'新闻');
                    commit('updateNewsDetails',data.newsList);
                    commit('changeLoad',0);
                    resolve();
                });
            })
        },
        //获取新闻页面上拉加载的更多数据
        updateMoreNews({commit},id) {
            store.commit('changeLoad',1);
            return new Promise((resolve) => {
                fetch('/cpi/Service/callback.mi/News/NewsList.api?t=201791522401846841&pageIndex=' + id).then(response => {
                    return response.json();
                }).then(data => {
                    console.log('more',data,id);
                    commit('updateMoreNewsDetails',data.newsList);
                    commit('changeLoad',0);
                    resolve();
                });
            })
        },

        //获取预告片的数据
        updateAdvanceMovies({commit}) {
            store.commit('changeLoad',1);
            return new Promise(resolve => {
                fetch('/cpi/Service/callback.mi/PageSubArea/TrailerList.api?t=20179161934347325').then(response => {
                    return response.json();
                }).then(data => {
                    console.log(data.trailers,'预告片',this.state.activeTab);
                    commit('updateAdvanceMov',data.trailers);
                    commit('changeLoad',0);
                    resolve();
                });
            });
        },

        //获取影评的数据
        updateComment({commit}) {
            store.commit('changeLoad',1);
            return new Promise(resolve => {
                fetch('/cpi/Service/callback.mi/MobileMovie/Review.api?needTop=false&t=201791704517185').then(response => {
                    return response.json();
                }).then(data => {
                    console.log(data,'影评');
                    commit('updateCommentDetails',data);
                    commit('changeLoad',0);
                    resolve();
                });
            })
        },

        //获取搜索页面的热门搜索数据
        updateHotSearch({commit}) {
            fetch('/cpi/Service/callback.mi/Search/HotKeyWords.api?t=201792012573243431').then(response => {
                return response.json();
            }).then(data => {
                console.log(data.keywords,'热门搜索');
                commit('updateHotSearchMessages',data.keywords);
            });
        },

        //获取搜索的影片数据
        updateSearchMovie({commit},movieName) {
            store.commit('changeLoad',1);
            return new Promise( resolve => {
                fetch('/cpi/Service/callback.mi/Showtime/SearchVoice.api?keyword='+ movieName +'&pageIndex=1').then(response => {
                    return response.json();
                }).then(data => {
                    console.log(data,'搜索的电影');
                    commit('updateSearchMovieList',data.movies);
                    commit('changeLoad',0);
                    resolve();
                });
            })
        },

        //获取搜索影片的更多影片数据--上拉加载后的数据
        // updateMoveSearchMovies({commit},data) {
        //     return new Promise(resolve => {
        //         fetch('/cpi/Service/callback.mi/Showtime/SearchVoice.api?keyword='+ data[0] +'&pageIndex=' + data[1]).then(response => {
        //             return response.json();
        //         }).then(result => {
        //             console.log(result.movies,'搜索上拉加载');
        //             commit('updateMoveSearchMovieList',result.movies);
        //             resolve();
        //         });
        //     })
        // }
    }
});

export default store
