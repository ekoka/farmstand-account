// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store'
import router from './router'
import './assets/css/main.scss'
import cookies from '@/utils/cookies'

//import GoogleAuth from 'vue-google-oauth'
//import {GoogleClientId} from './assets/js/config'

//Vue.use(GoogleAuth, {
//    client_id: GoogleClientId
//})
//Vue.googleAuth().load()

// adding a global event bus 
const EventBus = new Vue()
Object.defineProperties(Vue.prototype, {
    $eventBus: { 
        get () {
            return EventBus
        }
    },
})

store.$eventBus = EventBus

Vue.config.productionTip = false
Vue.prototype.$jsoncopy = obj=> JSON.parse(JSON.stringify(obj))

/* eslint-disable no-new */
const VERSION = '1'
new Vue({
    el: '#app',
    mounted(){
        this.versionReset()
        this.$store.dispatch('api/getRoot')
        this.monitorIdTokenCookie()
    },
    methods:{
        versionReset(){
            // Clear the state if the version changes. This ensures
            // that clients are not stuck with a state that is inconsistent 
            // with latest changes.
            if(localStorage.getItem('VERSION') == VERSION){
                return
            }
            this.$store.dispatch('api/resetApi')
            //this.$store.commit('inquiry/resetInquiry')
            localStorage.setItem('VERSION', VERSION)
        },

        monitorIdTokenCookie(){
            // synchronize id_token in cookie with idToken in localStorage
            const idToken = cookies.getCookie('idToken')
            if(idToken!=this.$store.state.api.idToken){
                // change of state
                this.$store.dispatch('api/syncIdToken')
            }
            //if(!idToken){
            //    this.$store.dispatch('logOut')
            //}
            setTimeout(this.monitorIdTokenCookie, 2000)
        },


    },


    store,
    router,
    components: { 
        App: ()=>import('./App')
    },
    template: '<App/>'
})


window.onerror = function(message, source, lineno, colno, error) {
    console.log('Exception: ', error)
}
