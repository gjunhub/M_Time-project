<template>
    <section class="locationWrapper">

        <header class="locationHeader">
            <i class="material-icons back" @click="toBack">chevron_left</i>
            <span class="logo">选择城市</span>
        </header>
        <div class="locationContainer" ref="locationContainer">
            <section class="locationBox">
                <div class="hotCity">
                    <p>热门城市</p>
                    <ul class="clearFix">
                        <li v-for="hotCitys,index in locationCitys"
                            :key="index"
                            v-if="index < 12"
                            @click="signLocation(hotCitys)"
                        >{{hotCitys.n}}</li>
                    </ul>
                </div>
                <div v-for="country ,index in cityIndex" :key="index" class="citySort">
                    <p>{{country}}</p>
                    <ul class="clearFix">
                        <!--也可以这样判断 citys.pinyinFull.includes(country)-->
                        <li v-for="citys,index in locationCitys"
                            :key="index"
                            v-if="citys.pinyinFull.charAt(0) == country"
                            @click="signLocation(citys)"
                        >{{citys.n}}</li>
                    </ul>
                </div>
            </section>
        </div>
    </section>
</template>

<script>
    import BScroll from 'better-scroll'
    import {mapGetters} from 'vuex'


	export default {
		name: 'location',
		data() {
			return {
			    str: '',
                cityIndex: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
            }
		},
        computed: mapGetters([
            'locationCitys'
        ]),
        created() {//所有定位城市的信息
            this.$store.dispatch('updateLocation').then(() => {
                this.lscroller = new BScroll(this.$refs.locationContainer, {
                    scrollY: true,
                    scrollbar: true,
                    click: true
                });
            });
        },
        mounted() {
		    this.str = window.location.href;
		    if(this.str.includes('/location')) {
		        this.$store.commit('updateHearders');
                this.$store.commit('updateFooter',false);
            }
        },
        methods: {
            toBack() {
                this.$router.push('/');
            },
            signLocation(obj) { //用户选择的城市

                let selectLocation = {
                    id: obj.id,
                    city: obj.n
                };

                this.$store.commit('updateUserLocation',selectLocation);

                setTimeout(() => {
                    this.$router.push('/');
                },200);
            }
        }
	}
</script>

<style lang="less">
    @w: 100rem;
    .clearFix::after {
        content: '';
        display: block;
        clear: both;
    }
    .locationWrapper {
        width: 100%;
    }
   .locationHeader {
        position: relative;
        width: 100%;
        height: 88/@w;
        background: #ff7c2a ;
    }
    .locationHeader .back {
        position: absolute;
        top: 8/@w;
        left: 18/@w;
        z-index: 1000;
        width: 80/@w;
        height: 80/@w;
        font-size: 72/@w;
        font-weight: lighter;
        line-height: 72/@w;
        text-align: center;
        color: #fff;
    }
    .locationHeader .logo {
        position: absolute;
        left: 50%;
        margin-left: -80/@w;
        font-size: 34/@w;
        line-height: 88/@w;
        width: 160/@w;
        color: #fff;
    }
    .locationContainer {
        position: absolute;
        top: 88/@w;
        left: 0;
        bottom: 0;
        width: 100%;
        background-color: #f2f6f3;
        overflow: hidden;
    }
    .locationBox {
        width: 100%;
    }
    .hotCity {
        width: 100%;
    }
    .locationContainer p {
        width: 90%;
        font-size: 30/@w;
        line-height: 80/@w;
        text-indent: 14/@w;
    }
    .locationContainer ul {
        width: 100%;
        padding: 12/@w 0;
        background-color: #fff;
    }
    .locationContainer ul li {
        float: left;
        width: auto;
        font-size: 28/@w;
        padding: 10/@w 26/@w;
        margin: 20/@w;
        color: #333;
    }
    .citySort {
        width: 100%;
    }
</style>
