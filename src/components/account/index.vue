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

export default {
    components: { navbar, },
    mounted(){
        let watchLoggedState = ()=>{
            if(!this.$store.state['loggedIn']){
                window.location.href = this.$store.state['PRODUCTLIST_INDEX'] + '/logout'
            }
            setTimeout(watchLoggedState, 2000)
        }
        watchLoggedState()
    },
}
</script>
