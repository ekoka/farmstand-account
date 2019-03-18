<template>
<div class="container">
    <div class="columns">
        <div class="column">
            <p class="subtitle is-3">
                <router-link :to="{name: 'Registration'}" class="button is-warning is-size-4">Register</router-link> if you don't have an account.
            </p>
        </div>
        <div class="column">
            <p class="subtitle is-3">
                <a id="login-button" @click="googleLogin">
                    <span class="icon">
                        <i class="mdi mdi-google"></i>
                    </span>
                    Log in with Google
                </a>
            </p>
            
            <p class="subtitle is-5">
                Or 
            </p>
            <p class="subtitle is-3">Log in with password</p>

            <div>
                <div class="field">
                    <div class="control">
                        <input class="input" v-model="email" placeholder="e.g. jsmith@mail.com"/>
                    </div>
                </div>
                <div class="field">
                    <div class="control">
                    
                        <input class="input" type="input" v-model="password" />
                    </div>
                </div>
                <div class="field">
                    <div class="control">
                        <button class="button is-primary is-size-4" 
                            :disabled="emptyPassword" 
                            @click="passwordLogin">Send
                        </button>
                    </div>
                </div>
            </div>

            <p class="subtitle is-5">
                Or 
            </p>

            <p class="subtitle is-3">Log in via email</p>

            <div>
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
    created(){
        this.cmpalias('router-link', 'rl')
    },

    data(){
        return {
            email: null,
            password: null,
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
        googleLogin(){
            // as seen at https://github.com/TinyNova/vue-google-oauth
            this.$googleAuth().directAccess()
            this.$googleAuth().signIn((googleUser) => {
                // clear the state
                this.$store.commit('api/resetApi')
                // if google signin succeeds try obtaining an access key
                // from api
                const token = googleUser.getAuthResponse().id_token
                return this.getAccessKey({
                    token, provider:'google'
                }).then(accessToken=>{
                    return this.getAccount()
                }).then(account=>{
                    this.$router.push({name: 'Account'})
                }).catch(error=>{
                    console.log('could not log in')
                })

            }, function (error) {
                // things to do when log-in fails
            })
        },

        emailLogin(){
            this.postSignin({
                data:{email:this.email}
            }).then(response=>{
            })
        },

        passwordLogin(){
            //let token = encodeURIComponent(JSON.stringify({
            //    password:this.password,
            //    email:this.email,
            //}))
            let token = {
                password:this.password,
                email:this.email,
            }
            this.postAccessToken({
                token, provider: 'productlist'
            }).then(response=>{
                this.$store.commit('setLoggedIn', true)
                return this.getAccount()
            }).then(account=>{
                return this.$router.push({name: 'Account'})
            })
        },


        ...mapActions({
            postSignin: 'api/postSignin',
            getAccount: 'api/getAccount',
            postAccessToken: 'api/postAccessToken',
        })

    },
}
</script>

