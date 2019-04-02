import Vue from 'vue'
import Vuex from 'vuex'
//import createPersistedState from 'vuex-persistedstate'
import createPersistedState from '@/assets/js/persistedstate'
import cookies from '@/utils/cookies'

import api from './api'

import {PRODUCTLIST_INDEX} from '@/assets/js/config'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {api},
    state: {
        loggedIn: false,
        currentLang: 'en',
        defaultLang: 'en',
        PRODUCTLIST_INDEX,
    },
    getters: {
        lang (state, getters){
            return state.currentLang || state.defaultLang
        },
        qs_lang (state, getters){
            return 'lang=' + getters.lang
        },
    },
    mutations: {
        setLoggedIn(state, {account}){
            state.loggedIn = account.account_id
            //createCookie('account_id', account.account_id, 365)
            //console.log(setCookie)
            cookies.setCookie (
                'account_id', 
                account.account_id, 
                Infinity, 
                '/', 
                'productlist.local')
        },
        unsetLoggedIn(state){
            state.loggedIn = false
            cookies.removeCookie('account_id', '/', 'productlist.local')
        },
    },
    plugins: [createPersistedState({
        //key: 'productlist-admin',
        storage: localStorage,
    })],
})
