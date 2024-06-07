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
        console.log(token)
        this.postIdToken({
            provider:this.$cnf.PROJECT_NAME,
            token,
        }).then(()=>{
            return this.postAccessToken()
        }).then(()=>{
            return this.getAccount()
        }).then(()=>{
            return this.$router.push({name: 'Account'})
        }).catch(e=>{
            console.log(e)
        })

        //TODO: set lang

        // post access key
    },

    methods: {
        ...mapActions({
            getAccount: 'api/getAccount',
            postIdToken: 'api/postIdToken',
            postAccessToken: 'api/postAccessToken',
            logIn: 'logIn',
        }),
    }
}
</script>
