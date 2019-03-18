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
export default {
    methods:{
        logOut(){
            this.$store.dispatch('api/deleteAccessToken').then(response=>{
                this.$store.commit('api/clearState')
                this.$store.commit('setLoggedIn', false)
            })
        },
    }
}

</script>
