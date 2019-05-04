<template>
<div>
    <stickycontent>
        <div class="level">
            <div class="level-left"></div>
            <div class="level-left">
                <notification eventName="notification-profile-saved">
                </notification>
            </div>
            <div class="level-right">
                <div class="field is-grouped">
                    <div class="control">
                        <router-link class="button is-link is-outlined" 
                            :to="{name: 'Profile'}">
                            Cancel
                        </router-link>
                    </div>
                    <div class="control">
                        <button class="button is-link" 
                            @click="saveAccount">
                            Save profile 
                        </button>
                    </div>
                </div>
            
            </div>
        </div>
    </stickycontent>
    <div class="card">
        <div class="card-content">
            <div class="field">
                <label class="label">
                    First name
                </label>
                <div>
                    <input class="input" v-model="account.first_name"/>
                </div>
            </div>

            <div class="field">
                <label class="label">
                    Last name
                </label>
                <div>
                    <input class="input" v-model="account.last_name"/>
                </div>
            </div>

            <div class="field">
                <label class="label">
                    Phone
                </label>
                <div>
                    <input class="input" 
                    v-model="account.data.phone"/>
                </div>
            </div>

            <div class="field">
                <label class="label">
                    Fax
                </label>
                <div>
                    <input class="input" 
                    v-model="account.data.fax"/>
                </div>
            </div>

            <div class="field">
                <label class="label">
                    Company
                </label>
                <div>
                    <input class="input" 
                    v-model="account.data.company"/>
                </div>
            </div>

            <div class="field">
                <label class="label">
                    Your role in the company
                </label>
                <div>
                    <input class="input" 
                    v-model="account.data.role"/>
                </div>
            </div>

            <div class="field">
                <label class="label">
                    Company website
                </label>
                <div>
                    <input class="input" 
                    v-model="account.data.website"/>
                </div>
            </div>

            <div class="field">
                <label class="label">
                    Company summary
                </label>
                <div>
                    <textarea class="textarea" 
                        v-model="account.data.summary"/></textarea>
                </div>
            </div>
        
            <div class="field">
                <label class="label">
                    Street address
                </label>
                <div>
                    <input class="input" 
                    v-model="account.data.address"/>
                </div>
            </div>
            

            <div class="field">
                <label class="label">
                    City
                </label>
                <div>
                    <input class="input" 
                    v-model="account.data.city"/>
                </div>
            </div>
            
            <div class="field">
                <label class="label">
                    State / Province / Region
                </label>
                <div>
                    <input class="input" 
                    v-model="account.data.state_province"/>
                </div>
            </div>

            <div class="field">
                <label class="label">
                    Country
                </label>
                <div>
                    <input class="input" 
                    v-model="account.data.country"/>
                </div>
            </div>

            <div class="field">
                <label class="label">
                    Zip / Postal code
                </label>
                <div>
                    <input class="input" 
                    v-model="account.data.zip_postal_code"/>
                </div>
            </div>

        </div><!-- card-content -->
    </div><!-- card -->
</div>
</template>

<script>

import {mapActions} from 'vuex'
    
export default {
    components: {
        notification: ()=>import( '@/components/utils/messaging/notification'),
        stickycontent: ()=>import( '@/components/utils/sticky-content'),
    },
    data(){
        return {
            account : {
                data: {}
            }
        }
    },

    mounted(){
        this.$store.dispatch('api/getAccount').then(account=>{
            this.account = account.data
        })
    },

    methods:{
        saveAccount(){
            return this.putAccount({data:this.account}).then(resp=>{
                return this.getAccount(account=>{
                    this.account = account.data
                })
            }).then(()=>{
                this.$eventBus.$emit('notification-profile-saved', {
                    message: 'Profile information updated.',
                    options: {
                        close: false,
                        color: 'is-warning',
                        size: 'is-medium',
                        timeout: 1.75,
                    },
                })
            })
        },

        ...mapActions({
            putAccount: 'api/putAccount',
            getAccount: 'api/getAccount',
        })

    },
}
</script>
