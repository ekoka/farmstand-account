<template>
<div class="navbar-end">
    <a @click="logOut" class="navbar-item">
        <div class="content">
            <span class="icon is-small">
                <i class="iconify mdi" data-icon="mdi-logout"></i>
            </span>
            <span>Log out</span>
        </div>
    </a>
</div><!-- navbar-end -->
</template>

<script>
import cookies from '@/utils/cookies'
export default {
    methods:{
        logOut(){
            // first disable the access token
            this.$store.dispatch('api/deleteAccessToken').then(()=>{
                // then remove the cookie
                this.$store.commit('logOut')
            })
        },
        //logOut: async function(){
        //    try {
        //        await this.$store.dispatch('api/deleteAccessToken')
        //    }catch(e){
        //    }
        //    this.$store.commit('api/clearState')
        //    this.$store.commit('unsetLoggedIn')
        //},
    }
}

</script>
