import Vue from 'vue'
import Vuex from 'vuex'
//import createPersistedState from 'vuex-persistedstate'
import createPersistedState from '@/assets/js/persistedstate'

import api from './api'
import inquiry from './inquiry'

import {PRODUCTLIST_INDEX} from '@/assets/js/config'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {api, inquiry},
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
        setLoggedIn(state, value){
            state.loggedIn = value
        },
    },
    plugins: [createPersistedState({
        //key: 'productlist-admin',
        storage: localStorage,
    })],
})
