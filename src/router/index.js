import Vue from 'vue'
import Router from 'vue-router'

// components
import KISS from '@/components/'
import Activate from '@/components/auth/activate'
import Tenant from '@/components/auth/tenant'
//routes
import Auth from './auth'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        //Catalog,
        {'name': 'KISS', path:'/kiss', component: KISS, children:[
            ...Auth,
        ]},
        {path: '/activate',  name: 'Activate', component: Activate, props:true},
        {path: '/tenant', name: 'Tenant', component: Tenant},
    ]
})
