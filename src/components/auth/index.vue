<template>
<section class="section">
    <p ref="googleAuthScriptContainer"></p>
    <div class="hero is-fullheight">
        <div class="hero-head">
            <nav class="navbar">
                <div class="container">
                    <div class="navbar-brand">
                        <div class="navbar-item">
                            <h1 class="title is-3">
                                <router-link :to="{name: 'Index'}"> 
                                    Productlist
                                </router-link>
                            </h1>
                        </div>
                        <div class="navbar-burger">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    <!--<div class="navbar-menu">
                        <div class="navbar-item">
                            <router-link 
                                class="button is-warning" 
                                :to="{name:'Registration'}">
                                Register
                            </router-link> 
                        </div>
                        <div class="navbar-item">
                            <router-link 
                                class="button is-primary" 
                                :to="{name:'Login'}">
                                Log in
                            </router-link> 
                        </div>
                    </div>-->
                </div>
            </nav>
        </div>
        <div class="hero-body">
            <router-view :gapiReady="gapiReady"/>
        </div>
        <div class="hero-foot"></div>
    </div>
</section>
</template>

<script>
import {GoogleClientId} from '@/assets/js/config'

export default {

    data(){
        return {
            gapiReady: false
        }
    },

    mounted() {
        const googleAuthScript = document.createElement('script')
        const googleAuthScriptUrl = 'https://apis.google.com/js/platform.js'
        googleAuthScript.setAttribute('src', googleAuthScriptUrl)
        googleAuthScript.onload = ()=>{
            gapi.load('auth2', ()=>{
                gapi.auth2.init({client_id:GoogleClientId}).then(()=>{
                    this.gapiReady = true
                })
            })
        }
        this.$refs.googleAuthScriptContainer.appendChild(googleAuthScript)
    },
}
</script>
