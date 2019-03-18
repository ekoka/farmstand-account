<template>
<div></div>
</template>

<script>
import {mapActions, mapMutations} from 'vuex'
export default {
    mounted(){
        // get signin_id from url
        // get passcode from url
        let {signin_id, passcode, lang} = this.$route.query 
        //let token = encodeURIComponent(JSON.stringify({
        //    passcode,
        //    signin_id,
        //}))
        let token = {passcode, signin_id}
        this.postAccessToken({
            provider:'productlist',
            token,
        }).then(accessToken=>{
            this.$store.commit('setLoggedIn', true)
            return this.getAccount()
        }).then(account=>{
            this.$router.push({name: 'Account'})
        }).catch(error=>{
            
        })

        //TODO: set lang
        
        // post access key  
    },

    methods: {
        ...mapActions({
            getAccount: 'api/getAccount',
            postAccessToken: 'api/postAccessToken',
        }),
    }
}
</script>
