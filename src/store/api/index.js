import axios from 'axios'
import upperFirst from 'lodash/fp/upperFirst'
import {HAL} from '@/utils/hal'
import cnf from '@/config'

// the following are *not* vuex submodules
// their contents is simply merged into the API module
import accounts from './accounts'

const jsoncopy = obj=> JSON.parse(JSON.stringify(obj))
const mkstate = ()=>{
    // deep copy the init state from each submodule
    // as opposed to simply just copying the 1st level references.
    // this step is useful, for modules that make use of caching,
    // since the cache is a nested object.
    return {
        root: null,
        ...jsoncopy(accounts.state),
    }
}

const initApi = (state) => {
    const initState = mkstate()
    Object.keys(initState).forEach(k=>{
        // reinitialize state
        state[k] = initState[k]
    })
}


const API = {
    namespaced: true,

    /* Do not put any attributes in the `state{}` here!
     *
     * They will be overwritten since initialization of `state`
     * happens in initApi().
     * You should place your desired attributes either in the
     * `mkstate()` function or in one of the submodules.
     * */
    state:{},  // Warning /!\ Do not put anything here /!\


    getters: {
        http(state, getters){
            return (req={url, method:'get', data:undefined, auth:false})=>{
                if (req.auth){
                    // using headrs for auth
                    req.headers = getters.authHeaders
                    // using httpOnly cookies for auth
                    //req.withCredentials = true
                }
                delete req.auth
                return axios(req)
            }
        },

        authHeaders(state, getters){
            const authScheme = 'Bearer'
            const auth = authScheme + ' ' + state.accessToken.token
            return {'Authorization': auth}
        },

        root(state){
            if (state.root){
                return HAL(state.root)
            }
        },

        publicRoot(state){
            if(state.publicRoot){
                return HAL(state.publicRoot)
            }
        },

        ...accounts.getters,
    },

    mutations: {

        setRoot(state, {root}){
            state.root = root
        },

        setPublicRoot(state, {publicRoot}){
            state.publicRoot = publicRoot
        },

        ...accounts.mutations,

        resetApi(state){
            initApi(state)
        },
    },

    actions: {
        getRoot({getters,commit,state}){
            return getters.http({
                url: cnf.API_ROOT
            }).then(response=>{
                commit('setRoot', {root:response.data})
                return HAL(response.data)
            })
        },

        getPublicRoot({getters, commit, dispatch}, {domain}){
            return dispatch('getResource', {resource:'root'}).then(root=>{
                const url = root.url('public_root', {domain})
                return getters.http({url}).then(response=>{
                    commit('setPublicRoot', {publicRoot: response.data})
                    return HAL(response.data)
                })
            })
        },

        getPublicDomain({getters, dispatch}, {domain}){
            return dispatch('getResource', {
                resource:'publicRoot',
                params:{domain},
            }).then(publicRoot=>{
                const url = publicRoot.url('public_domain', {domain})
                return getters.http({url}).then(response=>{
                    return HAL(response.data)
                })
            })
        },

        getResource({getters, commit, dispatch}, {resource, params=null}){
            if(getters[resource]){
                return getters[resource]
            }
            const capitalized = upperFirst(resource)
            return dispatch('get'+capitalized, params)
        },

        getPlans({getters}){
            const url = getters.root.url('plans')
            getters.http
            return getters.http({
                url,
            }).then(function(response){
                return HAL(response.data)
            })
        },

        resetApi({dispatch, commit}){
            commit('resetApi')
            return dispatch('getRoot')
        },
        ...accounts.actions,
    },
}

initApi(API.state)
export default API
