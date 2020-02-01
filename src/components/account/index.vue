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
import URI from 'urijs'

export default {
    data(){
        return {
            loggedIn: false,
            refreshed: false,
            ready: false,
        }
    },

    components: {
        navbar: ()=>import( './navbar'),
    },
    mounted(){
        this.monitorLoggedIn()
        if (this.loggedIn){
            this.$store.dispatch('api/postAccessToken').then(()=>{
                this.monitorAccessToken()
                this.ready = true
            })
        } 
    },
    methods:{

        monitorLoggedIn(){
            this.loggedIn = this.$store.state.api.idToken && true
            if(!this.loggedIn){
                this.$store.dispatch('logOut')
                return
            }
            setTimeout(this.monitorLoggedIn, 2000)
        },

        monitorAccessToken(){
            const delay = 5 * 60 * 1000 // 5 minutes
            if (this.loggedIn){
                const accessToken = this.$store.state.api.accessToken
                const exp = Date.now()/1000 + delay*2 // 10 minutes before expiry
                if (exp>=accessToken.payload.exp){ // about to expire
                    // refresh access token
                    this.$store.dispatch('api/postAccessToken').catch(error=>{
                        if (error.response.status==401){ 
                            // id_token is not valid anymore
                            this.$store.dispatch('api/deleteAccessToken')
                        }
                        return
                    })
                }
                // try again in 5 minutes
                // we keep monitoring as long as we obtain good access tokens
                setTimeout(this.monitorAccessToken, delay)
            }
        },
    },
}
</script>
