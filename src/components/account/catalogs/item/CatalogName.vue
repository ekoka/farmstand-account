<template>
<div class="is-size-5">
    <p class="">You're about to create a new catalog.</p>

    <br>

    <p>You first need to choose a nickname that will uniquely identify your catalog as part of the <strong>Productlist</strong> network.
        
        <br><br>
        
        <span class="has-text-grey is-size-5">e.g. https://<span class="has-text-info is-italic">yourcatalog</span>.productlist.io</span>
    </p>

        <br>
    <div class="field has-text-centered has-addons is-size-4">
        <div class="control is-size-4">https://</div> 
        <div class="control">
            <input class="input" placeholder="yourcatalog" v-model="name"/> 
        </div><!-- control -->
        <div class="control is-size-4">
            .productlist.io
        </div><!-- control -->


    </div><!-- field -->
    <validationMsg :showicon="true" v-if="search.name!==null" :val="nameMsg"> 
    </validationMsg>
    <div class="level">
        <div class="level-left">
            <div class="level-item">
                <router-link :to="{name:'CatalogList'}" class="button is-outlined">
                    Cancel
                </router-link>
            </div>
            <div class="level-item">
                <button 
                    v-if="validLength"
                    class="is-link button" 
                    :class="{'is-loading': nameIsChanging}"
                    @click="next"
                    :disabled="!validName"
                    >
                    Continue
                </button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import URI from 'urijs'
import {mapActions, mapGetters} from 'vuex'
import any from 'lodash/fp/any'

import validationMsg from './validation-msg'

export default {
    props: ['domain'],
    components: {
        validationMsg,
    },

    data(){
        return {
            message: '',
            nameIsChanging: false,
            search:{
                name: null,
                available: false,
            },
            nameAvailable: true,
            lastChange: null,
            name: this.domain.name,
        }
    },

    computed: {
        ...mapGetters({
            account: 'api/account',
        }),

        validLength(){
            return this.minLengthValidator && this.maxLengthValidator 
        },

        maxLengthValidator(){
            return this.name && this.name.length<=50
        },

        invalidCharacters(){
            return any(c=>{
                return !'abcdefghijklmnopqrstuvwxyz1234567890'.includes(
                    c.toLowerCase())
            })(this.name)
        },

        minLengthValidator(){
            return this.name && this.name.length>=3
        },

        validName(){
            if(this.validLength && 
                    !this.nameIsChanging && 
                    !this.invalidCharacters){
                if (!this.search.available){
                    return false
                } else {
                    return true
                }
            }
        },
        nameMsg(){
            if(this.invalidCharacters){
                return { 
                    value: false, 
                    msg: 'Only numbers and non-accented characters.',
                    showicon: true,
                }
            }
            if(!this.minLengthValidator){
                return { 
                    value: false, 
                    msg: '',
                    showicon: false,
                }
            }
            if(!this.maxLengthValidator){
                return {
                    value: false,
                    msg: 'Name should be less than 50 characters',
                    showicon: true,
                }
            }
            if(this.search.available){
                return {
                    value: true,
                    msg: `"${this.search.name}" is available...`,
                    showicon: true,
                }
            } else {
                return {
                    value: false,
                    msg: `"${this.search.name}" is not available...`,
                    showicon: true,
                }
            }
        },
    },

    watch:{
        'name': {
            handler(n, o){
                let currentChange = this.setChange()
                setTimeout(()=>{
                    this.updateSearchResult({currentChange, name:n})
                }, 1000)
            },
            immediate: true,
        },
    },

    methods: {
        setChange(){
            this.nameIsChanging = true
            this.lastChange = Date.now()
            return this.lastChange
        },
        updateSearchResult({currentChange, name}){
            this.search.available = null
            this.search.name = null
            let setData = ({available})=>{
                // if nothing changed since http get
                if(currentChange===this.lastChange){
                    //this.nameIsChanging = false
                    this.search.available = available
                    this.search.name = name
                }
            }
            // only call the server if nothing changed since 
            // the 1000ms delay.
            if(currentChange===this.lastChange){
                // if nothing changed since delay, unset the change flag
                this.nameIsChanging = false
                // only proceed with http if valid length
                if (this.validLength){
                    // proceed with http get
                    this.searchDomain(name).then(response=>{
                        setData({available:false})
                    }).catch(error=>{
                        if (error.response.status==404){
                            setData({available:true})
                        } else {
                            setData({available:false})
                        }
                    })
                }
            } 
        },
        url({domain, path=null}){
            const urlTemplate = 'http://{domain}.productlist.local:8082'
            const access_key = this.$store.getters['api/accessKey'].key('access_key')
            //const urlTemplate = 'http://{domain}.productlist.local:8082/admin'
            const uri = URI.expand(urlTemplate, {domain}).search({access_key})
            uri.pathname(path)
            return uri.toString()
        },

        searchDomain(domain){
            return this.getDomainNameCheck({domain})
        },

        next(){      
            if (this.name){
                let data = this.$jsoncopy(this.domain)
                data.name = this.name
                this.$emit('next', data)
            }
        },

        ...mapActions({
            getDomainNameCheck: 'api/getDomainNameCheck',
        }),
    },
}
</script>
