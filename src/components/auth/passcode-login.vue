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
        this.postIdToken({
            provider:'productlist',
            token,
        }).then(()=>{
            return this.getAccount()
        }).then(()=>{
            return this.logIn()
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
            logIn: 'logIn',
        }),
    }
}
</script>
