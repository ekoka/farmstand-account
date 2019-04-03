import axios from 'axios'
import {HAL} from '@/utils/hal'
import {API_ROOT} from '@/assets/js/config'

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

        setRoot(state, {root}){
            state.root = root
        },
        ...accounts.mutations,

        resetApi(state){
            initApi(state)
        },
    },
        
    actions: {
        getRoot({getters,commit,state}){
            return getters.http({
                url: API_ROOT
            }).then(response=>{
                commit('setRoot', {root:response.data})
                return HAL(response.data)
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

        resetApi({dispatch, commit}){
            commit('resetApi')
            return dispatch('getRoot')
        },
        ...accounts.actions,
    },
}

initApi(API.state)
export default API
