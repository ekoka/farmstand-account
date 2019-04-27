<template>
<div>
    <p ref="googleAuthScriptContainer"></p>
    <router-view :gapiReady="gapiReady"/>
</div>
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
        console.log('gapi included')
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
