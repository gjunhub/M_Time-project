import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Ticket from '@/components/Ticket'
import Find from '@/components/Find'
import Person from '@/components/Person'
import LogIn from '@/components/LogIn'
import Register from '@/components/Register'
import MovieDetail from '@/components/MovieDetail'

import Soonmovie from '@/components/Soonmovie'
import Nowmovie from '@/components/Nowmovie'

import Search from '@/components/Search'

import News from '@/components/News'
import Advance from '@/components/Advance'
import Comment from '@/components/Comment'

import Collection from '@/components/Collection'
import Buy from '@/components/Buy'

import Location from '@/components/Location'


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
            component: Ticket,
            children: [
                {
                    path: 'nowmovie',
                    name: 'Nowmovie',
                    component: Nowmovie
                },
                {
                    path: 'soonmovie',
                    name: 'Soonmovie',
                    component: Soonmovie
                }
            ]
        },{
            path: '/find',
            name: 'Find',
            component: Find,
            children: [
                {
                    path: 'news',
                    name: 'News',
                    component: News
                },
                {
                    path: 'advance',
                    name: 'Advance',
                    component: Advance
                },
                {
                    path: 'comment',
                    name: 'Comment',
                    component: Comment
                },
            ]
        },
        {
            path: '/search',
            name: 'Search',
            component: Search
        },
        {
            path: '/logIn',
            name: 'LogIn',
            component: LogIn
        },
        {
            path: '/register',
            name: 'Register',
            component: Register
        },
        {
            path: '/moviedetail/:movieId',
            name: 'MovieDetail',
            component: MovieDetail
        },
        {
            path: '/person',
            name: 'Person',
            component: Person
        },
        {
            path: '/collection',
            name: 'Collection',
            component: Collection
        },
        {
            path: '/buy',
            name: 'Buy',
            component: Buy
        },
        {
            path: '/location',
            name: 'Location',
            component: Location
        }
    ]
})
