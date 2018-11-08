import {HAL} from '@/utils/hal'

export default {
    state: {
        account: null,
        accessKey: null,
        tenant: null,
    },

    getters: {
        account(state){
            return HAL(state.account)
        },
        accessKey(state){
            return HAL(state.accessKey)
        },
        tenant(state){
            return HAL(state.tenant)
        },
    },

    mutations: {
        setAccessKey(state, {accessKey}){
            state.accessKey = accessKey
        },
        setAccount(state, {account}){
            state.account = account
        },
        setTenant(state, {tenant}){
            state.tenant = tenant
        },
    },

    actions: {
        postSignin({getters},{data}){
            let url = getters.root.url('signins')
            getters.http({url, method:'post', data}).then(response=>{
                return HAL(response.data)
            }).catch(error=>{
                console.log(error)
                console.log(error.response)
            })
        },
        getAccount({getters, commit, dispatch}){
            const url = getters.accessKey.url('account')
            return getters.http({url}).then(response => {
                commit('setAccount', {account:response.data})
                // if account has tenant load it as well
                return HAL(response.data)
            }).catch(error => {
                console.log(error.response)
            })
        },

        postAccount({dispatch, commit, getters}, {provider, token}){
            const url = getters.root.url('accounts') 
            const responseHandler = function(data){
                const resp = HAL(data)
                // first set the access key
                const accessKey = resp.embedded('access_key').resource
                commit('setAccessKey', {accessKey})
                // then get the account
                return dispatch('getAccount')
            }
            
            return getters.http({
                url, data: {token, provider}, method: 'post'
            }).then(response => {
                return responseHandler(response.data)
            }).catch(error=>{
                if (error.response.status==409){
                    // 409 conflict, account already exists
                    return responseHandler(error.response.data)
                }
                throw error
            }).catch(error=>{
                console.log(error)
            })
        },

        getTenant({commit, getters}, {url}={}){
            if (!url){
                url = getters.account.url('tenant')
            }
            if (!url){
                return
            }
            return getters.http({url}).then(response=>{
                commit('setTenant', {tenant:response.data})
                return HAL(response.data)
            }).catch(error=>{
                console.log(error.response)
            })
        },

        postTenant({dispatch, getters}, {tenant}){
            let url = getters.root.url('tenants')
            //const authScheme = 'access-token'
            //const auth = authScheme + ' ' + getters.accessKey.key('access_key')
            return getters.http({
                url, data:tenant, method:'post', auth:true
                //headers: {'Authorization': auth},
            }).then(function(response){
                return dispatch(
                    'getTenant', {url: HAL(response.data).url('location')})
            }).catch(function(error){
                if (error.response.status==409){
                    let resp = HAL(error.response.data)
                    // two reasons to get a 409:
                    // either you already have a tenant, in which case you'll 
                    // receive a 'location' pointing to it in the response
                    if (resp.key('location')){
                        return dispatch('getTenant', {url: resp.url('location')})
                    }
                    // or this is just a case of duplicate tenant name, 
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
