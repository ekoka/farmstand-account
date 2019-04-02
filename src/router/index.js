import Vue from 'vue'
import Router from 'vue-router'

//routes
import Index from '@/components'
import Auth from './auth'
import Account from './account'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            name: 'Index', 
            path: '/',
            component: Index,
        },
        Auth,
        Account,
        //Catalog,
    ]
})
