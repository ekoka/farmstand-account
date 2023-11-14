<template>
<div class="box">
    <div class="columns is-centered">
        <div class="column">
            <div class="field">
                <label class="label">
                    Name
                </label>
                <div>
                    <input class="input" v-model="mutable.account.name"/>
                </div>
            </div>

            <div class="field">
                <label class="label">
                    Phone
                </label>
                <div>
                    <input class="input"
                    v-model="mutable.account.data.phone"/>
                </div>
            </div>
            <div class="field">
                <label class="label">
                    Company
                </label>
                <div>
                    <input class="input"
                    v-model="mutable.account.data.company"/>
                </div>
            </div>
            <div class="field">
                <label class="label">
                    Company website
                </label>
                <div>
                    <input class="input"
                    v-model="mutable.account.data.website"/>
                </div>
            </div>
            <div class="field">
                <label class="label">
                    Street address
                </label>
                <div>
                    <input class="input"
                    v-model="mutable.account.data.address"/>
                </div>
            </div>

            <div class="field">
                <label class="label">
                    City
                </label>
                <div>
                    <input class="input"
                    v-model="mutable.account.data.city"/>
                </div>
            </div>

            <div class="field">
                <label class="label">
                    Zip / Postal code
                </label>
                <div>
                    <input class="input"
                    v-model="mutable.account.data.zip_postal_code"/>
                </div>
            </div>
        </div><!-- column -->

        <div class="column">
            <div class="field">
                <label class="label">
                    Fax
                </label>
                <div>
                    <input class="input"
                    v-model="mutable.account.data.fax"/>
                </div>
            </div>

            <div class="field">
                <label class="label">
                    Your role in the company
                </label>
                <div>
                    <input class="input"
                    v-model="mutable.account.data.role"/>
                </div>
            </div>

            <div class="field">
                <label class="label">
                    Company summary
                </label>
                <div>
                    <textarea class="textarea"
                        v-model="mutable.account.data.summary"/></textarea>
                </div>
            </div>

            <div class="field">
                <label class="label">
                    State / Province / Region
                </label>
                <div>
                    <input class="input"
                    v-model="mutable.account.data.state_province"/>
                </div>
            </div>

            <div class="field">
                <label class="label">
                    Country
                </label>
                <div>
                    <input class="input"
                    v-model="mutable.account.data.country"/>
                </div>
            </div>
        </div><!-- column -->

    </div><!-- columns -->

    <div class="field is-grouped">
        <div class="control">
            <button @click="$emit('close')" class="button "> Cancel </button>
        </div>
        <div class="control">
            <button @click="saveAccount" class="button is-primary"> Save </button>
        </div>
    </div>
</div><!-- box -->
</template>

<script>
import {mapActions} from 'vuex'
export default {
    props: ['account'],

    data(){
        return {
            mutable:{
                account: null
            }
        }
    },

    watch:{
        account: {
            handler(value){
                this.mutable.account = this.$jsoncopy(value)
            },
            immediate:true
        }
    },

    methods:{
        saveAccount(){
            return this.putAccount({data:this.mutable.account}).then(()=>{
                return this.getAccount(account=>{
                    this.mutable.account = account.data
                })
            }).then(()=>{
                //this.$eventBus.$emit('notification-profile-saved', {
                //    message: 'Profile information updated.',
                //    options: {
                //        close: false,
                //        color: 'is-warning',
                //        size: 'is-medium',
                //        timeout: 1.75,
                //    },
                //})
                this.$emit('update:account', this.mutable.account)
                this.$emit('close')
            })
        },

        ...mapActions({
            getAccount: 'api/getAccount',
            putAccount:'api/putAccount',

        })
    },

}
</script>
