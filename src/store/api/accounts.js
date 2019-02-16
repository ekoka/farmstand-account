import {HAL} from '@/utils/hal'

export default {
    state: {
        account: null,
        accessKey: null,
        domain: null,
    },

    getters: {
        account(state){
            return HAL(state.account)
        },
        accessKey(state){
            return HAL(state.accessKey)
        },
        domain(state){
            return HAL(state.domain)
        },
    },

    mutations: {
        setAccessKey(state, {accessKey}){
            state.accessKey = accessKey
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
            //const handler = function(response){
            //    const response = HAL(response.data)
            //    // first set the access key
            //    const accessKey = response.embedded('access_key')
            //    commit('setAccessKey', {accessKey:accessKey.resource})
            //    return accessKey
            //    // then get the account
            //    //return dispatch('getAccount')
            //}
            
            return getters.http({
                url,
                data: {token, provider}, 
                method: 'post',
            }).then(response => {
                return HAL(response.data)
                // first set the access key
                //const accessKey = response.embedded('access_key')
                //commit('setAccessKey', {accessKey:accessKey.resource})
                //return accessKey
                //return handler(response)
                //response = HAL(response.data)
                //const accessKey = response.embedded('access_key').resource
                //commit('setAccessKey', accessKey)
                //return response
                //return responseHandler(response.data)
            })
            //.catch(error=>{
            //    if (error.response.status==409){
            //        // 409 conflict, account already exists
            //        return getters.accessKey
            //    }
            //    throw error
            //})
        },

        getAccessKey({getters, commit, dispatch}, {provider, token}){
            const url = getters.root.url('access_key', null, 
                    {provider, token})
            return getters.http({
                url
            }).then(response => {
                commit('setAccessKey', {accessKey: response.data})
                return getters.accessKey
            })
        },

        getAccount({getters, commit, dispatch}){
            const url = getters.accessKey.url('account')
            return getters.http({
                url,
                auth:true,
            }).then(response => {
                commit('setAccount', {account:response.data})
                return getters.account
            }).catch(error => {
                console.log(error.response)
            })
        },

        getDomain({commit, getters}, {domain}={}){
            let url = getters.root.url('domain', {domain})
            return getters.http({url, auth:true}).then(response=>{
                return HAL(response.data)
            })
        },

        getDomainNameCheck({commit, getters}, {domain}={}){
            let url = getters.root.url(
                'domain-name-check', null, {q:domain})
            return getters.http({
                url,
            }).then(response=>{
                return response.data
            })
        },

        getDomains({getters, commit}, {}){
            url = getters.account.url('domains')
        },

        postDomain({dispatch, getters}, {domain}){
            let url = getters.root.url('domains')
            //const authScheme = 'access-token'
            //const auth = authScheme + ' ' + getters.accessKey.key('access_key')
            return getters.http({
                url, data:domain, method:'post', auth:true
                //headers: {'Authorization': auth},
            }).then(function(response){
                return dispatch(
                    'getDomain', {url: HAL(response.data).url('location')})
            }).catch(function(error){
                if (error.response.status==409){
                    let resp = HAL(error.response.data)
                    // two reasons to get a 409:
                    // either you already have a domain, in which case you'll 
                    // receive a 'location' pointing to it in the response
                    if (resp.key('location')){
                        return dispatch('getDomain', {url: resp.url('location')})
                    }
                    // or this is just a case of duplicate domain name, 
                    // in which case we'll simply rethrow
                }
                throw error
            }).catch(error=>{
                console.log(error)
                throw error
            })
        },
    },
}
