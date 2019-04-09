import {HAL} from '@/utils/hal'

export default {
    state: {
        // when sending access_token via httponly cookie 
        //accountUrl: null, 
        // when sending access_token via headers 
        accessToken: null,
        account: null,
        domain: null,
    },

    getters: {
        account(state){
            return HAL(state.account)
        },
        accessToken(state){
            return HAL(state.accessToken)
        },
        domain(state){
            return HAL(state.domain)
        },
        accountUrl(state){
            return HAL(state.accessToken).url('account')
        },
    },

    mutations: {
        // when sending access_token via header
        setAccessToken(state, {accessToken}){
            state.accessToken = accessToken
        },
        setAccount(state, {account}){
            state.account = account
        },
        setDomain(state, {domain}){
            state.domain = domain
        },
        // when sending access_token via httponly cookie
        //setAccountUrl(state, {url}){
        //    state.accountUrl = url
        //},
    },

    actions: {
        postSignin({getters}, {data}){
            let url = getters.root.url('signins')
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
            let url = getters.account.url('payment_sources')
            return getters.http({
                url, method: 'post', data, auth:true
            }).then(response=>{
                return response.data
            })
        },

        getPaymentSources({getters, dispatch}){
            let url = getters.account.url('payment_sources')
            return getters.http({
                url, auth:true
            }).then(response=>{
                return HAL(response.data)
            })
        },

        deletePaymentSource({getters}, {source_id}){
            let url = getters.account.url('payment_source', {source_id})
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

        postAccessToken({getters, commit, dispatch}, {provider, token}){
            const url = getters.root.url('access_token')
            return getters.http({
                data: {provider, token},
                method: 'post',
                url,
                auth:true,
            // when going through httponly cookie
            //}).then(response=>{
            //    response = HAL(response.data)
            //    commit('setAccountUrl', {url: response.url('account')})
            //    return response
            //})
            // when using access_token in header
            }).then(response => {
                commit('setAccessToken', {accessToken: response.data})
                return getters.accessToken
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
            console.log(url)
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
