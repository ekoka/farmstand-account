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
    <div class="box">
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
        </div>
    </div>
    <div class="box">
        <div class="card-content">
            <p class="subtitle is-4">The following information will make up your public profile <span class="is-size-6">(optional)</span> </p>
            <div class="field">
                <label class="label">
                    Public name <span class="has-text-weight-normal">(leave empty to use the name above)</span>
                </label>
                <div>
                    <input class="input" v-model="account.data.public_name" />
                </div>
            </div>

            <div class="field">
                <label class="label">
                    Location 
                </label>
                <div>
                    <input class="input" 
                    v-model="account.data.location"/>
                </div>
            </div>

            <div class="field">
                <label class="label">
                    Organization 
                </label>
                <div>
                    <input class="input" 
                    v-model="account.data.organization"/>
                </div>
            </div>

            <div class="field">
                <label class="label">
                    Role in the organization
                </label>
                <div>
                    <input class="input" 
                    v-model="account.data.role"/>
                </div>
            </div>

            <div class="field">
                <label class="label">
                    Bio or description of activities 
                </label>
                <div>
                    <textarea class="textarea" 
                        v-model="account.data.bio"/>
                    </textarea>
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
                    Website
                </label>
                <div>
                    <input class="input" 
                    v-model="account.data.website"/>
                </div>
            </div>

            <p class="title is-5">
                Contacting you on other platforms
            </p>

            <div class="field is-grouped">
                <div class="field is-horizontal">
                    <!--<div class="field-label is-normal">
                        <label class="label">
                            LinkedIn
                        </label>
                    </div>-->
                    <div class="field-body">
                        <div class="field">
                            <input class="input" placeholder="LinkedIn"
                            v-model="account.data.linkedin"/>
                        </div>
                        <div class="field">
                            <input class="input" placeholder="Whatsapp"
                            v-model="account.data.whatsapp"/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="field is-grouped">
                <div class="field is-horizontal">
                    <div class="field-body">
                        <div class="field">
                            <input class="input" placeholder="Skype"
                            v-model="account.data.skype"/>
                        </div>
                        <div class="field">
                            <input class="input" placeholder="Facebook"
                            v-model="account.data.facebook"/>
                        </div>
                    </div>
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
