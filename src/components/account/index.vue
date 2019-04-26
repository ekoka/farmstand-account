<template>
<div v-if="ready">
    <navbar/>
    <div class="section">
        <div class="columns">
            <div class="column is-1"></div>
            <router-view class="column is-10"/>
            <div class="column is-1"></div>
        </div>
    </div>
</div>
</template>

<script>
import cookies from '@/utils/cookies'
import URI from 'urijs'

export default {
    data(){
        return {
            ready: false,
        }
    },

    components: {
        navbar: ()=>import( './navbar'),
    },
    mounted(){
        this.$store.dispatch('api/postAccessToken').then(()=>{
            this.ready = true
        })
        this.watchIdToken()
        this.watchAccessToken()
    },
    methods:{

        watchIdToken(){
            const loggedIn = cookies.getCookie('id_token')
            //if(!this.$store.state['loggedIn']){
            if(!loggedIn){
                // clear the state again, just in case the cookie was
                // removed by another app than this one (e.g. subdomain).
                this.$store.dispatch('clear').then(()=>{
                    const index = URI(this.$store.state.PRODUCTLIST_INDEX)
                    window.location.href = index.path('/logout').href()
                })
            }
            setTimeout(this.watchIdToken, 2000)
        },

        watchAccessToken(){
            const delay = 300 // 5 minutes
            if (cookies.getCookies('id_token')){
                const accessToken = this.$store.state.accessToken
                const exp = Date.now()/1000 - delay*2 // 10 minutes before expiry
                if (exp < accessToken.payload.exp){
                    this.$store.dispatch('api/postAccessToken')
                }
            }
            setTimeout(this.watchAccessToken, delay*1000)
        },
    },
}
</script>
