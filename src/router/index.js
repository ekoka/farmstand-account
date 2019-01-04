import Vue from 'vue'
import Router from 'vue-router'

// components
import Activate from '@/components/auth/activate'
import Tenant from '@/components/auth/tenant'
//routes
import Auth from './auth'
import Account from './account'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        //Catalog,
        Auth,
        Account,
        {path: '/activate',  name: 'Activate', component: Activate, props:true},
        {path: '/tenant', name: 'Tenant', component: Tenant},
    ]
})
