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
import _ from 'lodash/fp'

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
        resetLogin(){
            _.each(k=>{
                this.login[k] = null
            })(_.keys(this.login))
        },
        emailRegistration(){
            let token = this.login
            let email = token.email
            let provider = 'simpleb2b'
            this.postAccount({
                provider, token
            }).then(response=>{
                this.message = 'A link to access your account has been e-mailed to you.'
                this.resetLogin()
                return this.postSignin({data:{email}})
            }).catch(error=>{
                //TODO: handle 409 here
                throw error
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
                }).then(response=>{
                    return this.getAccessKey({token, provider:'google'})
                }).then(accessKey=>{
                    return this.getAccount()
                }).then(account=>{
                    this.$router.push({name: 'Account'})
                }).cacth(error=>{
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
            postSignin: 'api/postSignin',
            gettAccount: 'api/getAccount',
            getTenant: 'api/getTenant',
            getAccessKey: 'api/getAccessKey',
        })
    },

}
</script>
