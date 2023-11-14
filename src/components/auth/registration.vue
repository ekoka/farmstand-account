<template>
<div class="container">
    <div class="columns">
        <div class="column">

            <div class="box">
                <div> {{message}} </div>
                <p class="subtitle is-3">Or register with your email</p>
                <div class="field">
                    <label class="label">
                        Email:
                    </label>

                    <div class="control">
                        <input class="input" v-model="login.email"/>
                    </div>
                </div>
                <div class="field">
                    <label class="label">
                         Choose a password (optional):
                    </label>

                    <div class="control">
                        <input class="input" type="password" v-model="login.password"/>
                    </div>
                </div>
                <div class="field">
                    <label class="label">
                        Name (optional):
                    </label>

                    <div class="control">
                        <input class="input" v-model="login.name"/>
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
                <router-link :to="{name: 'Login'}" class="button is-primary is-size-4">Log in</router-link> if you already have an account.
            </p>
        </div>
    </div>
</div>
</template>

<script>
import {mapActions} from 'vuex'
import each from 'lodash/fp/each'
import keys from 'lodash/fp/keys'

export default {
    props: [],
    data (){
        return {
            message: '',
            login:{
                name: null,
                email: null,
                password: null,
            },

        }
    },

    watch:{
    },

    mounted(){
    },

    computed:{

        validEmail(){
            return this.login.email
        },

        validPassword(){
            // TODO: establish some rules for a safe password
            return true

            //if(this.login.password){
            //    return this.login.password==this.confirmPassword
            //}
            //// password is optional
            //return true
        },

        validForm(){
            return this.validEmail && this.validPassword
        },
    },

    methods: {

        resetLogin(){
            each(k=>{
                this.login[k] = null
            })(keys(this.login))
        },
        emailRegistration(){
            let token = this.login
            let email = token.email
            let provider = this.$cnf.PROJECT_NAME
            this.postAccount({
                provider, token
            }).then(response=>{
                this.message = 'A link to activate your account has been e-mailed to you.'
                this.resetLogin()
                return this.postSignin({data:{email}})
            }).catch(error=>{
                //TODO: handle 409 here
                throw error
            })
        },

        ...mapActions({
            postAccessToken: 'api/postAccessToken',
            postAccount: 'api/postAccount',
            postSignin: 'api/postSignin',
            getAccount: 'api/getAccount',
            getTenant: 'api/getTenant',
            postIdToken: 'api/postIdToken',
        })
    },

}
</script>
