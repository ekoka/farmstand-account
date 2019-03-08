<template>
<div>
    <div class="card">
        <div class="card-content">
            <div class="level">
                <h1 class="title is-4">{{name}}</h1>
                <router-link class="button is-link" :to="{name:'EditProfile'}">
                    Edit profile
                </router-link>
            </div><!-- level -->
            <p class="has-text-weight-semibold">{{primaryEmail}}</p>
            <p>{{account.data.role}}</p>
            <p>{{account.data.company}}</p>
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
import _ from 'lodash/fp'
import {mapActions} from 'vuex'

import EditProfile from './edit'

export default {
    components: {
        EditProfile,
    },

    data(){
        return {
            account: {
                data:{}
            }
        }
    },

    computed: {
        name(){
            if (this.account){
                let name = [this.account.first_name, 
                    this.account.last_name]
                return name.join(' ')
            }
        },

        primaryEmail(){
            if (this.account.emails){
                let email =  _.find(e=>{
                    return e.primary==true
                })(this.account.emails)
                return email.email
            }
        }
    },

    mounted(){
        this.$store.dispatch('api/getAccount').then(account=>{
            this.account = account.data
        })
    },
}
</script>
