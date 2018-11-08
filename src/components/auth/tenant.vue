<template>
<div>
    <p> Hello {{account.key('first_name')}}, thank you for registering with SimpleB2B's KISS Order Manager.</p>

    <p> To start your catalog choose an identifier (a nickname) to use in URLs. </p>
        
    <p>https://<input v-model="tenant.name"/>.simpleb2b.io/</p>
        
    <p>numbers and lowercase non-accented letters. The dash is acceptable as a word separator. No space or other symbols. At least 3 characters and no longer than 20. e.g. "acme-inc", "xyzcorp".
    </p>

        
    <p>It would also be useful to your clients if you could enter some information about your company.</p>
    <div><label>Company Name <input v-model="tenant.company_name"/></label></div>
    <div><label>Address 1 <input v-model="tenant.address1"/></label></div>
    <div><label>Address 2 <input v-model="tenant.address2"/></label></div>
    <div><label>City <input v-model="tenant.city"/></label></div>
    <div><label>State/Province <input v-model="tenant.state_province"/></label></div>
    <div><label>Country <input v-model="tenant.country"/></label></div>
    <div><label>Zip/Postal Code <input v-model="tenant.zip_postal_code"/></label></div>
    <div><button @click="saveTenant"> Save </button></div>
</div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {

    computed: {
        ...mapGetters({
            account: 'api/account'
        }),
    },
    data (){
        return {
            tenant: {
            },
        }
    },
    created(){
        this.cmpalias('router-link', 'rl')
    },

    methods:{
        saveTenant(){
            this.postTenant({tenant:this.tenant}).then(tenant=>{
                const access_key = this.$store.getters['api/accessKey'].key('access_key')
                const urlTemplate = 'https://{tenant}.simpleb2b.local:8080'
                const url = URI.expand(
                        urlTemplate, {tenant: tenant.key('name')}).search({
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

