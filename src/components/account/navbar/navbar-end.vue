<template>
<div class="navbar-end">
    <a @click="logOut" class="navbar-item">
        <div>
            <span class="icon is-small">
                <i class="mdi mdi-logout"></i>
            </span>
            Log out 
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
