<template>
<div class="is-size-5">
    <div class="field has-text-centered has-addons is-size-4">
        <div class="control">
            <label class="label"> Request access to a catalog
                <input class="input" placeholder="Search catalog" v-model="name"/>
            </label>
        </div><!-- control -->
    </div><!-- field -->
    <!--<ValidationMsg :showicon="true" v-if="(domain.name!==null && !domain.found)" :val="valMsg"/>-->
    <div class="level">
        <div class="level-left">
            <div class="level-item">
                <button
                    class="is-link button"
                    :class="{'is-loading': nameIsChanging}"
                    @click="next"
                    :disabled="!domain.found"
                    > Request access </button>
            </div>
        </div>
    </div>
    <ValidationMsg :showicon="true" v-if="!(domain.name===null || domain.found)" :val="valMsg"/>
</div>
</template>

<script>
import URI from 'urijs'
import {mapActions, mapGetters} from 'vuex'
import any from 'lodash/fp/any'


export default {
    components: {
        ValidationMsg: ()=> import('./ValidationMsg'),
    },

    data(){
        return {
            message: '',
            nameIsChanging: false,
            domain:{
                name: null,
                found: false,
            },
            nameAvailable: true,
            lastChange: null,
            name: null,
        }
    },

    computed: {
        ...mapGetters({
            account: 'api/account',
        }),

        validLength(){
            return this.minLengthValidator && this.maxLengthValidator
        },

        existingDomain(){
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
                if (!this.domain.exist){
                    return false
                } else {
                    return true
                }
            }
        },
        valMsg(){
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
            if(this.domain.found){
                return {
                    value: true,
                    //msg: `Request access to "${this.domain.name}"...`,
                    msg: null,
                    showicon: true,
                }
            }
            return {
                value: false,
                //msg: `"${this.domain.name}" does not exist...`,
                msg: `Catalog does not exist...`,
                showicon: true,
            }
        },
    },

    watch:{
        'name': {
            handler(newval, oldval){
                const changeTimestamp = this.resetSearch()
                setTimeout(()=>{
                    this.updateSearchResult({changeTimestamp})
                }, 1000)
            },
            immediate: true,
        },
    },

    methods: {
        setResult({found, changeTimestamp}){
            // If something changed in between, abort.
            if(changeTimestamp!==this.changeTimestamp) return
            //this.nameIsChanging = false
            this.domain.found = found
            this.domain.name = this.name
        },
        resetSearch(){
            this.domain.found = null
            this.domain.name = null
            this.nameIsChanging = true
            this.changeTimestamp = Date.now()
            return this.changeTimestamp
        },

        updateSearchResult({changeTimestamp}){
            // Abort call to the server if something changed since the 1000ms delay.
            if(changeTimestamp!==this.changeTimestamp) return
            // If nothing changed since delay, unset the change flag.
            this.nameIsChanging = false
            // Only proceed with http if valid length.
            if (!this.validLength) return
            // Proceed with http get.
            const _sr = ({found})=>{this.setResult({found, changeTimestamp})}
            this.searchDomain(this.name).then(response=>{
                _sr({found:true})
            }).catch(error=>{
                _sr({found:false})
            })
        },

        url({domain, path=null}){
            const access_key = this.$store.getters['api/accessKey'].key('access_key')
            const uri = URI.expand(this.$cnf.DOMAIN_HOST_TEMPLATE, {domain})
                .search({access_key})
            uri.pathname(path)
            return uri.toString()
        },

        searchDomain(domain){
            return this.getPublicDomain({domain})
        },

        next(){
            if (this.name){
                let data = this.$jsoncopy(this.domain)
                data.name = this.name
                this.$emit('next', data)
            }
        },

        ...mapActions({
            getPublicDomain: 'api/getPublicDomain',
        }),
    },
}
</script>
