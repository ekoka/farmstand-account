<template>
<div class="container">
    <div class="columns">
        <div class="column">
            <p class="subtitle is-3">
                <router-link :to="{name: 'Registration'}" class="button is-warning is-size-4">Register</router-link> if you don't have an account.
            </p>
        </div>
        <div class="column">

            <div class="box">
                <p class="subtitle is-3">Log in with your password</p>
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
import cookies from '@/utils/cookies'

export default {
    props: [],
    data(){
        return {
            email: null,
            password: null,
        }
    },

    watch:{
    },

    mounted(){
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
                token, provider: this.$cnf.PROJECT_NAME
            }).then(()=>{
                return this.postAccessToken()
            }).then(()=>{
                return this.getAccount()
            }).then(()=>{
                if(this.afterLogin()){
                    return
                }
                return this.$router.push({name: 'Account'})
            })
        },

        afterLogin(){
            const key = 'afterLogin'
            const cookie = cookies.getCookie(key)
            if(cookie){
                const scope = this.$store.getters.PROJECT_URI.domain()
                cookies.removeCookie(key, '/', scope)
                const action = JSON.parse(atob(cookie))
                this.$router.push(action)
                return true
            }
        },


        ...mapActions({
            postSignin: 'api/postSignin',
            getAccount: 'api/getAccount',
            postAccessToken: 'api/postAccessToken',
            postIdToken: 'api/postIdToken',
        })
    },
}
</script>
