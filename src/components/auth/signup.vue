<template>
<div>
    <div>
    <h3 class="subtitle">Connect with Google </h3>
    <a id="signin-button" @click="googleSignup">
        <i class="fa fa-google fa-3x"></i>
        Sign in with Google
    </a>
    </div>
    
    or 

    <div>
        {{message}}
    <h3 class="subtitle">Sign up with your work email </h3>
    First name: <input v-model="signin.first_name"/><br>
    Last name: <input v-model="signin.last_name"/><br>
    Email*: <input v-model="signin.email"/><br>
    Password*: <input type="password" v-model="signin.password"/><br>
    Confirm password: <input type="password" v-model="confirmPassword"/><br>

    <button :disabled="!validForm" @click="emailSignup">Sign Up</button>
    </div>
</div>
</template>

<script>
import {mapActions} from 'vuex'
import URI from 'urijs'

export default {
    data (){
        return {
            message: '',
            signin:{
                first_name: null,
                last_name: null,
                email: null,
                password: null,
            },
            confirmPassword: null,

        }
    },

    computed:{
        passwordMatch(){
            return this.signin.password &&
                this.signin.password.length > 5 &&
                this.signin.password == this.confirmPassword
        },

        validPassword(){
            return this.passwordMatch
        },

        validEmail(){
            return this.signin.email
        },

        validForm(){
            return this.validPassword && this.validEmail
        },

    },

    methods: {
        emailSignup(){
            let data = this.signin
            this.postSignin({data}).then(response=>{
                this.message = 'A link to access your account has been e-mailed to you.'
                this.signin = {}
                this.confirmPassword = null
            })
        },
        googleSignup(){
            // as seen at https://github.com/TinyNova/vue-google-oauth
            this.$googleAuth().directAccess()
            this.$googleAuth().signIn((googleUser) => {
                // clear the state
                this.signOut()
                // if sign-in succeeds try to create an account
                const token = googleUser.getAuthResponse().id_token
                //const url = api_host + '/api/v1/accounts'
                return this.postAccount({
                    token, provider:'google'
                }).then(account=>{
                    let tenantUrl = account.url('tenant')

                    if (tenantUrl){
                        const access_key = this.$store.getters['api/accessKey'].key('access_key')
                        this.getTenant({url:tenantUrl}).then(tenant=>{
                            const urlTemplate = 'http://{tenant}.simpleb2b.local:8080/admin'
                            const url = URI.expand(
                                    urlTemplate, {tenant: tenant.key('name')}).search({
                                access_key
                            }).toString()
                            window.location.replace(url)
                            //this.$router.push(url)
                        })
                    }
                    this.$router.push({name: 'Tenant'})
                }).catch(error=>{
                    console.log('could not log in')
                })

            }, function (error) {
                // things to do when sign-in fails
            })
        },

        signOut(){
            this.$store.commit('api/resetApi')
        },

        ...mapActions({
            postAccount: 'api/postAccount',
            postSignin: 'api/postSignin',
            getTenant: 'api/getTenant',
        })
    },

}
</script>
