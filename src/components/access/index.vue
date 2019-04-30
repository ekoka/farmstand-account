<template>
<section class="section" v-if="ready">
    <div class="container">
        <div class="field">
            <button class="button is-primary" :to="{name: 'Account'}">Go to Account Dashboard</button>

        </div>
        <div class="field">
            <button class="button is-primary">Edit profile</button>
        </div>
    <h3 class="subtitle is-3"><strong>{{domain.data.label}}</strong> uses a catalog by Productlist.io.</h3>
    <component :domain="domain" :is="activeComponent" class="container" />
    </div>
</section>
</template>

<script>
import URI from 'urijs'
import findIndex from 'lodash/fp/findIndex' 
import modal from '@/components/utils/modal'
import connect from './forms/connect'
import request from './forms/request'
import {mapActions} from 'vuex'

export default{
    components: {
        modal, connect, request,
    },
    data(){
        return {
            domain: {},
            ready: false,
        }
    },
    mounted(){
        const {domain, lang} = this.$route.query 

        this.getResource({
            resource:'publicDomain', params: {domain}
        }).then(domain=>{
            this.domain = domain.data
        }).then(()=>{
            if(this.idToken){
                this.postAccessToken({domain:this.domain.name})
            }
            this.ready = true
        })
    },
    computed:{
        activeComponent(){
            if(!this.idToken){
                return 'connect'
            }

            if(!this.loggedIn){
                return 'request'
            }
        },
        loggedIn (){
            if(!this.accessToken){
                return false
            }
            const idx = findIndex(role=>{
                this.accessToken.payload.role==role
            })['user', 'admin']
            return idx==-1
        },
        idToken(){
            return this.$store.state.api.idToken
        },
        accessToken(){
            return this.$store.state.api.accessToken
        },
    },
    methods:{
        ...mapActions({
            getResource: 'api/getResource',
            postAccessToken: 'api/postAccessToken',
        })
    },
}
</script>
