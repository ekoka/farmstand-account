<template>
<div></div>
</template>

<script>
import {mapActions, mapMutations} from 'vuex'
export default {
    mounted(){
        // get signin_id from url
        // get passcode from url
        const {signin_id, passcode, lang} = this.$route.query 
        const token = {passcode, signin_id}
        this.postAccessToken({
            provider:'productlist',
            token,
        }).then(response=>{
            return this.getAccount()
        }).then(account=>{
            this.$store.commit('logIn', {account:account.data})
            return this.$router.push({name: 'Account'})
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
