import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Ticket from '@/components/Ticket'
import Find from '@/components/Find'
import Person from '@/components/Person'
import Register from '@/components/Register'
import MovieDetail from '@/components/MovieDetail'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Index',
            component: Index
        },
        {
            path: '/ticket',
            name: 'Ticket',
            component: Ticket
        },{
            path: '/find',
            name: 'Find',
            component: Find
        },{
            path: '/person',
            name: 'Person',
            component: Person
        },{
            path: '/register',
            name: 'Register',
            component: Register
        },{
            path: '/moviedetail/:movieId',
            name: 'MovieDetail',
            component: MovieDetail
        }
    ]
})
