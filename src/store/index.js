import Vue from 'vue'
import Vuex from 'vuex'
//import createPersistedState from 'vuex-persistedstate'
import createPersistedState from '@/assets/js/persistedstate'
import cookies from '@/utils/cookies'

import api from './api'
import URI from 'urijs'

import {
    DOMAIN_HOST_TEMPLATE,
    API_ROOT,
    API_PUBLIC_ROOT,
    PRODUCTLIST_INDEX,
} from '@/assets/js/config'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {api},
    state: {
        currentLang: 'en',
        defaultLang: 'en',
        PRODUCTLIST_INDEX,
    },
    getters: {
        DOMAIN_URI(state, getters){
            return URI.expand(DOMAIN_HOST_TEMPLATE, getters.subdomain)
        },
        API_ROOT_URI(state, getters){
            return URI(API_ROOT)
        },
        API_PUBLIC_ROOT_URI(state, getters){
            return URI(API_PUBLIC_ROOT)
        },
        PRODUCTLIST_URI(state, getters){
            return URI(PRODUCTLIST_INDEX)
        },

        URI(state, getters){
            return URI
        },

        lang (state, getters){
            return state.currentLang || state.defaultLang
        },
        qs_lang (state, getters){
            return 'lang=' + getters.lang
        },
    },

    mutations: {},

    actions: {
        logIn({getters, state, dispatch}){
            const domain = URI(PRODUCTLIST_INDEX).domain()
            //cookies.setCookie (
            //    'account_id', getters['api/account'].data.account_id, 
            //    Infinity, '/', domain)
            //cookies.setCookie (
            //    'id_token', state.api.idToken,
            //    Infinity, '/', domain)
            //
            //
        },

        logOut({state, dispatch}){
            const indexUrl = URI(state.PRODUCTLIST_INDEX)
            const domain = indexUrl.domain()
            cookies.removeCookie('account_id', '/', domain)
            cookies.removeCookie('idToken', '/', domain)
            cookies.removeCookie('id_token', '/', domain)
            return dispatch('api/resetApi').then(()=>{
                window.location.href = indexUrl.path('/logout').href()
            })
        },
    },

    plugins: [createPersistedState({
        //key: 'productlist-admin',
        storage: localStorage,
    })],
})
