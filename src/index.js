// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import store from './store'
import VueScroller from 'vue-scroller'//滑屏
import VueLazyload from 'vue-lazyload'//懒加载

import VueAwesomeSwiper from 'vue-awesome-swiper'

Vue.use(MuseUI)
Vue.use(VueScroller)

Vue.use(VueAwesomeSwiper)

Vue.use(VueLazyload)

Vue.use(VueLazyload, {
    loading:"./image/back.png",
    error:"./image/more.png",
    try:3,//尝试加载的次数
})

Vue.config.productionTip = false
Vue.prototype.$http = axios;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})
