<template>
<div>
    <h1 class="title">SimpleB2B Order Manager</h1>
    <h3 class="subtitle">Activate Account</h3>
    <p>Thank you for confirming your signup, you should now be redirected to complete your registration.</p>
</div>
</template>

<script>
import {mapActions} from 'vuex'
import URI from 'urijs'

export default {
    data (){
        return {
            query: null
        }
    },
    created(){
        this.activateSignin()
    },

    methods:{
        activateSignin(){
            const query = URI(window.location.search).query(true)
            const token = query.token 
            const lang = query.lang

            if (token){
                return this.postAccount({
                    token, provider:'simpleb2b'
                }).then(account=>{
                    let tenantUrl = account.url('tenant')

                    if (tenantUrl){
                        const access_key = this.$store.getters['api/accessKey'].key('access_key')
                        console.log(access_key)
                        console.log(tenantUrl)
                        this.getTenant({url:tenantUrl}).then(tenant=>{
                            const urlTemplate = 'http://{tenant}.simpleb2b.local:8080/admin'
                            console.log(urlTemplate)
                            const url = URI.expand(
                                    urlTemplate, {tenant: tenant.key('name')}).search({
                                access_key
                            }).toString()
                            window.location.replace(url)
                        })
                    } else {
                        this.$router.push({name: 'Tenant'})
                    }
                }).catch(error=>{
                    console.log('could not log in')
                })

            }
        },

        ...mapActions({
            postAccount: 'api/postAccount',
            getTenant: 'api/getTenant',
        }),
    }
}
</script>
