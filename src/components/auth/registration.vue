<template>
<div class="container">
    <div class="columns">
        <div class="column">
            <p class="subtitle is-3">
                <a id="login-button" @click="googleRegistration">
                    <span class="icon">
                        <i class="mdi mdi-google"></i>
                    </span>
                    Register with Google
                </a>
            </p>
            
            <p class="subtitle is-5">
                Or 
            </p>

            <div>
                {{message}}
            </div>

            <p class="subtitle is-3">Register with your email</p>

            <div>
                <div class="field">
                    <label class="label">
                        First name: 
                    </label>

                    <div class="control">
                        <input class="input" v-model="login.first_name"/>
                    </div>
                </div>
                <div class="field">
                    <label class="label">
                        Last name: 
                    </label>

                    <div class="control">
                        <input class="input" v-model="login.last_name"/>
                    </div>
                </div>
                <div class="field">
                    <label class="label">
                        Email: 
                    </label>

                    <div class="control">
                        <input class="input" v-model="login.email"/>
                    </div>
                </div>

                <div class="control">
                    <button class="button is-warning is-size-4" 
                        :disabled="!validForm" @click="emailRegistration">
                        Register 
                    </button>
                </div>
            </div>
        </div>
        <div class="column">
            <p class="subtitle is-3">
                Or <router-link :to="{name: 'Login'}" class="button is-primary is-size-4">Log in</router-link> if you already have an account.
            </p>
        </div>
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
            login:{
                first_name: null,
                last_name: null,
                email: null,
            },

        }
    },

    computed:{

        validEmail(){
            return this.login.email
        },

        validForm(){
            return this.validEmail
        },

    },

    methods: {
        emailRegistration(){
            let data = this.login
            this.postLogin({data}).then(response=>{
                this.message = 'A link to access your account has been e-mailed to you.'
                this.login = {}
            })
        },
        googleRegistration(){
            // as seen at https://github.com/TinyNova/vue-google-oauth
            this.$googleAuth().directAccess()
            this.$googleAuth().signIn((googleUser) => {
                // clear the state
                this.logOut()
                // if login succeeds try to create an account
                const token = googleUser.getAuthResponse().id_token
                //const url = api_host + '/api/v1/accounts'
                return this.postAccount({
                    token, provider:'google'
                }).then(account=>{
                    let tenantUrl = account.url('tenant')

                    if (tenantUrl){
                        const access_key = this.$store.getters['api/accessKey'].key('access_key')
                        this.getTenant({url:tenantUrl}).then(tenant=>{
                            const urlTemplate = 'http://{tenant}.simpleb2b.local:8082/admin'
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
                // things to do when login fails
            })
        },

        logOut(){
            this.$store.commit('api/resetApi')
        },

        ...mapActions({
            postAccount: 'api/postAccount',
            postLogin: 'api/postLogin',
            getTenant: 'api/getTenant',
        })
    },

}
</script>
