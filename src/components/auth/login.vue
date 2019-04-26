<template>
<div class="container">
    <div class="columns">
        <div class="column">
            <p class="subtitle is-3">
                <router-link :to="{name: 'Registration'}" class="button is-warning is-size-4">Register</router-link> if you don't have an account.
            </p>
        </div>
        <div class="column">
            <div class="content">
                <div ref="googlebtn" id="google-login-btn"></div>
            </div>
            
            <div class="box">
                <p class="subtitle is-3">Or log in with your password</p>
                <div class="field">
                    <div class="control">
                        <input class="input" v-model="email" placeholder="e.g. jsmith@mail.com"/>
                    </div>
                </div>
                <div class="field">
                    <div class="control">
                    
                        <input class="input" type="password" v-model="password" />
                    </div>
                </div>
                <div class="field">
                    <div class="control">
                        <button class="button is-primary is-size-4" 
                            :disabled="emptyPassword" 
                            @click="passwordLogin">Log in
                        </button>
                    </div>
                </div>
            </div>


            <div class="box">
                <p class="subtitle is-3">Or log in via email</p>
                <div class="field">
                    <div class="control">
                        <input class="input" v-model="email" placeholder="e.g. jsmith@mail.com"/>
                    </div>
                </div>
                <div class="control">
                    <button class="button is-primary is-size-4" 
                        :disabled="!validForm" @click="emailLogin">
                    Send access code 
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
    props: ['gapiReady'],
    data(){
        return {
            email: null,
            password: null,
        }
    },

    watch:{
        gapiReady: {
            handler(v){
                if(v && this.$refs.googlebtn){
                    this.renderGoogleBtn()
                }
            },
            immediate: true,
        },
    },

    mounted(){
        if(this.gapiReady && this.$refs.googlebtn){
            this.renderGoogleBtn()
        }
    },

    computed:{
        emptyPassword(){
            if (!this.password){
                return true
            }
            return false
        },

        validEmail(){
            return this.email
        },

        validForm(){
            return this.validEmail
        },

    },

    methods: {
        renderGoogleBtn(){
            gapi.signin2.render('google-login-btn', {
                'scope': 'profile email',
                'width': 280,
                'height': 70,
                'longtitle': true,
                'theme': 'light',
                'onsuccess': this.googleLogin,
                //'onfailure': onFailure
            });
        },

        googleLogin(googleUser){
            // clear the state
            this.$store.dispatch('api/resetApi').then(()=>{
                // if google signin succeeds try obtaining an access key
                // from api
                const token = googleUser.getAuthResponse().id_token
                // we skip the postAccount step to avoid accidentally
                // registering a user who just wanted to check if they have
                // an account.
                // TODO: we should probably display an error message
                // saying that there's no associated Productlist account
                // for the given Google account.
                return this.postIdToken({
                    token, provider:'google'
                }).then(()=>{
                    return this.postAccessToken()
                }).then(()=>{
                    return this.getAccount()
                }).then(()=>{
                    return this.logIn()
                }).then(()=>{
                    this.$router.push({name: 'Account'})
                })
            })
        },

        emailLogin(){
            this.postSignin({
                data:{email:this.email}
            })
        },

        passwordLogin(){
            //let token = encodeURIComponent(JSON.stringify({
            //    password:this.password,
            //    email:this.email,
            //}))
            const token = {
                password:this.password,
                email:this.email,
            }
            this.postIdToken({
                token, provider: 'productlist'
            }).then(()=>{
                return this.getAccount()
            }).then(account=>{
                return this.logIn()
            }).then(()=>{
                return this.$router.push({name: 'Account'})
            })
        },


        ...mapActions({
            postSignin: 'api/postSignin',
            getAccount: 'api/getAccount',
            postAccessToken: 'api/postAccessToken',
            postIdToken: 'api/postIdToken',
            logIn: 'logIn',
        })
    },
}
</script>

