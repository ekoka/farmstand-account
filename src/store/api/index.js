import axios from 'axios'
import {HAL} from '@/utils/hal'
import {Cache} from '@/utils/cache'
import {API_ROOT, API_HOST} from '@/assets/js/config'

// the following are *not* vuex submodules
// their contents is simply merged into the API module
import accounts from './accounts'


const API = {
    namespaced: true,

    state:{},

    getters: {
        cache(state){
            return ({key})=>{
                return Cache(state.cache).fetch(key)
            }
        },

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
            const authScheme = 'access_token'
            const auth = authScheme + ' ' + getters.accessToken.key('access_token')
            return {'Authorization': auth}
        },

        root(state){
            if (state.root){
                return HAL(state.root)
            }
        },
        ...accounts.getters,
    },
    mutations: {
        cache(state, {key, value}){
            Cache(state.cache).store(key, value)
        },

        uncache(state, {key}){
            Cache(state.cache).remove(key)
        },

        setRoot(state, {root}){
            state.root = root
        },
        ...accounts.mutations,

        resetApi(state){
            initApi({state, skip:['root']})
            //initApi({state})
        },

        clearState(state){
            initApi({state})
        },
    },
        
    actions: {
        getRoot({getters,commit,state}){
            //let resource = getters.root
            //if (resource){
            //    return HAL(resource)
            //}
            return getters.http({
                url: API_ROOT
            }).then(response=>{
                commit('setRoot', {root:response.data})
                return HAL(response.data)
            }).catch(error=>{
                console.log(error.response)
            })
        },
        getPlans({getters}){
            let url = getters.root.url('plans')
            getters.http
            return getters.http({
                url,
            }).then(function(response){
                return HAL(response.data)
            })
        },
        ...accounts.actions,
    },
}

function initApi({state, skip=[]}){
    const jsoncopy = obj=> JSON.parse(JSON.stringify(obj))
    let initState = {
        cache: {},
        root: null,
        // ensure to only copy the state from each submodule
        ...jsoncopy(accounts.state),
    }
    
    // delete everything not in the skip list
    // or reset to initState
    Object.keys(state).concat(Object.keys(initState)).forEach(k=>{
        if (skip.includes(k)){
            return // skip
        }
        state[k] = initState[k]
    })
}

initApi({state:API.state})

export default API
