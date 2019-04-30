import {HAL} from '@/utils/hal'
import {parseJwt} from '@/utils/jwt'
import cookies from '@/utils/cookies'
import URI from 'urijs'

export default {
    state: {
        // when sending access_token via httponly cookie 
        //accountUrl: null, 
        // when sending access_token via headers 
        idToken: null,
        accessToken: null,
        account: null,
        domain: null,
    },

    getters: {
        account(state){
            return HAL(state.account)
        },
        domain(state){
            return HAL(state.domain)
        },
        accountUrl(state){
            return state.accessToken.payload.account_url
        },
    },

    mutations: {
        // when sending access_token via header
        setIdToken(state, {token}){
            state.idToken = token 
        },
        setIdTokenCookie(state, {token, domain}){
            cookies.setCookie ('idToken', token, Infinity, '/', domain)
        },
        setAccessToken(state, {token}){
            const accessToken = {
                token: HAL(token).key('token'), 
            }
            const payload = accessToken.token.split('.')[1]
            accessToken.payload = parseJwt(payload)
            state.accessToken = accessToken
        },
        setAccount(state, {account}){
            state.account = account
        },
        setDomain(state, {domain}){
            state.domain = domain
        },
    },

    actions: {
        postSignin({getters}, {data}){
            const url = getters.root.url('signins')
            return getters.http({
                url, 
                data,
                method:'post',
            }).then(response=>{
                return HAL(response.data)
            })
        },

        postAccount({dispatch, commit, getters}, {provider, token}){
            const url = getters.root.url('accounts') 
            return getters.http({
                url,
                data: {token, provider}, 
                method: 'post',
            }).then(response => {
                return HAL(response.data)
            })
        },

        postPaymentSource({getters, dispatch}, {data}){
            const url = getters.account.url('payment_sources')
            return getters.http({
                url, method: 'post', data, auth:true
            }).then(response=>{
                return response.data
            })
        },

        getPaymentSources({getters, dispatch}){
            const url = getters.account.url('payment_sources')
            return getters.http({
                url, auth:true
            }).then(response=>{
                return HAL(response.data)
            })
        },

        deletePaymentSource({getters}, {source_id}){
            const url = getters.account.url('payment_source', {source_id})
            return getters.http({
                url, auth:true, method:'delete', 
            }).then(response=>{
                return response.data
            })
        },

        putAccount({getters}, {data}){
            const url = getters.accountUrl
            return getters.http({
                url,
                method: 'put',
                data,
                auth: true,
            })
        },

        postIdToken({rootState, state, getters, commit, dispatch}, {provider, token}){
            const url = getters.root.url('id_token')
            return getters.http({
                data: {provider, token},
                method: 'post',
                url,
            }).then(response => {

                const domain = URI(rootState.PRODUCTLIST_INDEX).domain()
                commit('setIdToken', {token: response.data.token})
                commit('setIdTokenCookie', {token: response.data.token, domain})
            })
        },

        syncIdToken({commit}){
            // cookie is source of truth during sync
            const token = cookies.getCookie('idToken')
            commit('setIdToken', {token})
        },

        postAccessToken({getters, commit, dispatch, state}, {domain}={domain:null}){
            const url = getters.root.url('access_token')
            const authHeaders = {'Authorization': 'Bearer ' + state.idToken}
            return getters.http({
                data: {domain},
                method: 'post',
                url,
                headers:authHeaders,
            }).then(response => {
                commit('setAccessToken', {token: response.data})
                return state.accessToken
            })
        },

        deleteAccessToken({getters}){
            let url = getters.root.url('access_token')
            return getters.http({
                url,
                method: 'delete',
                auth: true,
            })
        },

        getAccount({getters, commit}){
            const url = getters.accountUrl 
            return getters.http({
                url,
                auth:true,
            }).then(response => {
                commit('setAccount', {account:response.data})
                return getters.account
            })
        },

        getDomain({commit, getters}, {url, domain}){
            if (!url){
                url = getters.root.url('domain', {domain})
            }
            return getters.http({url, auth:true}).then(response=>{
                return HAL(response.data)
            })
        },

        getDomainNameCheck({commit, getters}, {domain}={}){
            const url = getters.root.url(
                'domain_name_check', null, {q:domain})
            return getters.http({
                url,
            }).then(response=>{
                return response.data
            })
        },

        getDomains({getters}){
            let url = getters.root.url('domains')
            return getters.http({
                url, auth:true
            }).then(response=>{
                return HAL(response.data)
            })
        },

        postDomain({dispatch, getters}, {data}){
            let url = getters.root.url('domains')
            return getters.http({
                url, data, method:'post', auth:true
            })
        },

        putDomain({getters}, {url, domain, data}){
            if (!url){
                url = getters.root.url('domain', {domain})
            }
            return getters.http({
                url, method:'put', data, auth:true,
            }).then(response=>{
                return HAL(response.data)
            })
        },

    },
}
