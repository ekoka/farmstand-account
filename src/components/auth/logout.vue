<template></template>
<script>
export default {

    props:['gapiReady'],

    mounted(){
        this.logout()
    },

    watch: {
        gapiReady: {
            handler(v){
                this.logout()
            },
            immediate: true,
        }
    },

    methods:{

        logout: async function(){
            if (this.gapiReady){
                // on next log in user will automatically be logged in
                // using the Google account she's currently connected to.
                //await gapi.auth2.getAuthInstance().signOut()
                // forces prompt to choose a google account
                await gapi.auth2.getAuthInstance().disconnect()
                // keep redirect call inside so that it gets a
                // a chance to be called after the disconnect()
                window.location.href = this.$store.state.PRODUCTLIST_INDEX
            }
        },
    },


}
</script>
