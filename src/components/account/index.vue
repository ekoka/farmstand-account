<template>
<div>
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
import navbar from './navbar'
import cookies from '@/utils/cookies'
import URI from 'urijs'

export default {
    components: { navbar, },
    mounted(){
        const watchLoggedState = ()=>{
            const loggedIn = cookies.getCookie('account_id')
            //if(!this.$store.state['loggedIn']){
            if(!loggedIn){
                // clear the state again, just in case the cookie was
                // removed by another app than this one (e.g. subdomain).
                this.$store.dispatch('clear').then(()=>{
                    const index = URI(this.$store.state.PRODUCTLIST_INDEX)
                    window.location.href = index.path('/logout').href()
                })
            }
            setTimeout(watchLoggedState, 2000)
        }
        watchLoggedState()
    },
}
</script>
