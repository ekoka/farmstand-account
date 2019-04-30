import Vue from 'vue'
import Router from 'vue-router'

const Index = ()=>import('@/components')
const Access = ()=>import('@/components/access')
//routes
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
        {
            name: 'Access', 
            path: '/access',
            component: Access,
        },
        Auth,
        Account,
        //Catalog,
    ]
})
