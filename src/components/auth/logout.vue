<template>
<div>
</div>
</template>
<script>
export default {

    props:['gapiReady'],

    watch: {
        gapiReady: {
            handler(v){
                if(v){
                    this.logout()
                }
            },
            immediate: true,
        }
    },

    methods:{

        logout(){
            // on next log in user will automatically be logged in
            // using the Google account she's currently connected to.
            //await gapi.auth2.getAuthInstance().signOut()
            // forces prompt to choose a google account
            gapi.auth2.getAuthInstance().disconnect()
            window.location.href = this.$store.state.PRODUCTLIST_INDEX
        },
    },
}
</script>
