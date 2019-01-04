<template>
<div class="section">
    <div class="container">
        <p class="subtitle is-4"> Hello <span class="has-text-weight-semibold">{{account.key('first_name')}}</span>, thank you for registering with <span class="has-text-grey has-text-weight-semibold">SimpleB2B</span>.</p>

        <div class="columns is-multiline">
            <div class="column is-full">
                <p class="is-size-4"> To kickoff your catalog we need to choose a name that uniquely identifies your company. It will be used as part of your SimpleB2B URLs.<br><span class="has-text-grey is-size-5">e.g. https://<span class="has-text-info is-italic">yourcompany</span>.simpleb2b.io</span></p>

            </div><!-- column -->
            <div class="column">
                <div class="field has-text-centered has-addons is-size-4">
                    <div class="control is-size-4">https://</div> 
                    <div class="control">
                        <input class="input" placeholder="yourcompany" v-model="tenant.name"/> 
                    </div><!-- control -->
                    <div class="control is-size-4">
                        .simpleb2b.io
                    </div><!-- control -->
                </div><!-- field -->
            </div><!-- column -->

            <div class="column">
                <validationMsg :val="alphanumValidator" msg="Numbers and lowercase alphabetic letters without accents."/> 
                <validationMsg :val="dashValidator" msg="If present, the dash is acceptable only as a word separator."/> 
                <validationMsg :val="symbolValidator" msg="No space or other symbols."/> 
                <validationMsg :val="minLengthValidator" msg="At least 3 characters."/> 
                <validationMsg :val="maxLengthValidator" msg="No longer than 20."/> 
            </div><!-- column -->
        </div><!-- columns -->

        <p class="is-size-4">It would also be useful to your clients if you could enter some information about your company.</p>

        <div class="container">
            <div class="field is-horizontal">
                <div class="field-label is-normal">
                    <label class="label">
                        Company Name 
                    </label>
                </div>
                <div class="field-body">
                    <div class="control">
                        <input class="input" v-model="tenant.company_name"/>
                    </div>
                </div>
            </div>
            <div class="field is-horizontal">
                <div class="field-label">
                    <label class="label">Address 1 </label>
                </div>
                <div class="field-body">
                    <div class="control">
                        <input class="input" v-model="tenant.address1"/>
                    </div>
                </div>
            </div>
            <div class="field is-horizontal">
                <div class="field-label">
                    <label class="label">Address 2 </label>
                </div>
                <div class="field-body">
                    <div class="control">
                        <input class="input" v-model="tenant.address2"/>
                    </div>
                </div>
            </div>
            <div class="field is-horizontal">
                <div class="field-label">
                    <label class="label">City </label>
                </div>
                <div class="field-body">
                    <div class="control">
                        <input class="input" v-model="tenant.city"/>
                    </div>
                </div>
            </div>
            <div class="field is-horizontal">
                <div class="field-label">
                    <label class="label">State / Province </label>
                </div>
                <div class="field-body">
                    <div class="control">
                        <input class="input" v-model="tenant.state_province"/>
                    </div>
                </div>
            </div>
            <div class="field is-horizontal">
                <div class="field-label">
                    <label class="label">Country </label>
                </div>
                <div class="field-body">
                    <div class="control">
                        <input class="input" v-model="tenant.country"/>
                    </div>
                </div>
            </div>
            <div class="field is-horizontal">
                <div class="field-label">
                    <label class="label">Zip / Postal Code </label>
                </div>
                <div class="field-body">
                    <div class="control">
                        <input class="input" v-model="tenant.zip_postal_code"/>
                    </div>
                </div>
            </div>

            <div class="field">
                <div class="control">
                    <button class="button" @click="saveTenant">
                        Save
                    </button>
                </div><!-- control -->
            </div><!-- field -->
        </div><!-- container -->

    </div>
</div>
</template>

<script>
import URI from 'urijs'
import {mapActions, mapGetters} from 'vuex'
import {TENANT_HOST_TEMPLATE} from '@/assets/js/config'
import validationMsg from './validationMsg'

export default {
    components: {validationMsg},

    computed: {
        ...mapGetters({
            account: 'api/account'
        }),
        alphanumValidator(){
            if (this.tenant.name){
                return true
            }
        },
        dashValidator(){
            return true
        },
        symbolValidator(){
        },
        minLengthValidator (){
            if(!this.tenant.name){
                return false
            }
            if(this.tenant.name.length < 3){
                return false
            }
            return true
        },
        maxLengthValidator (){
            if(!this.tenant.name){
                return false
            }
            if(this.tenant.name.length > 20){
                return false
            }
            return true
        },
    },
    data (){
        return {
            tenant: {
            },
        }
    },

    methods:{

        saveTenant(){
            this.postTenant({tenant:this.tenant}).then(tenant=>{
                const access_key = this.$store.getters['api/accessKey'].key('access_key')
                const url = URI.expand(
                        TENANT_HOST_TEMPLATE, {tenant: tenant.key('name')}).search({
                    access_key
                }).toString()
                window.location.replace(url)
                //this.$router.push(url)
            })
        },
        ...mapActions({
            postTenant: 'api/postTenant',
        })
    }
}
</script>

