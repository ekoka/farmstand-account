<template>
<div v-if="ready" >
    <profile :account='account' />
    <emails :emails="account.emails" />
    <div class="card">
        <div class="card-content">
            <p>{{account.data.phone}}</p>
            <p>{{account.data.address}}</p>
            <p>{{account.data.city}}</p>
            <p>{{account.data.state_province}}</p>
            <p>{{account.data.country}}</p>
            <p>{{account.data.zip_postal_code}}</p>
            <p>
                <a href="">Add an email address</a>
            </p>
        </div><!-- card-content -->
    </div><!-- card -->
</div>
</template>

<script>
import find from 'lodash/fp/find'
import {mapActions} from 'vuex'

import emails from './emails'
import profile from './profile'

export default {
    components: {
        emails,
        profile,
        EditProfile: ()=>import( './edit'),
    },

    data(){
        return {
            ready: false,
            account: {
                data:{}
            }
        }
    },

    mounted(){
        this.$store.dispatch('api/getAccount').then(account=>{
            this.account = account.data
            this.ready = true
        })
    },
}
</script>
