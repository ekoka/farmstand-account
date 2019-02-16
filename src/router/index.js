import Vue from 'vue'
import Router from 'vue-router'

//routes
import Auth from './auth'
import Account from './account'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        Auth,
        Account,
        //Catalog,
    ]
})
