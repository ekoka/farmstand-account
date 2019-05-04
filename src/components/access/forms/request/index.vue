<template>
<div>
    <modal v-if="showProfile" id="profile" :active.sync="showProfile">
        <profile @close="showProfile=false" :account.sync="account" />
    </modal>
    <modal id="preview" :active.sync="showPreview">
        <preview @close="showPreview=false" :request="previewData"/>
    </modal>
    <h5 class="subtitle is-3">Request access to this catalog</h5> 
    
    <div class="card">
        <div class="card-content">
                        <p class="is-size-4"> Your <em>Productlist</em> profile will be used to make introductions.</p>
        </div>
        <div class="card-content">
            <div class="control">
                <label class="label">
                    Name: <span class="has-text-weight-normal"> {{account.first_name}} {{account.last_name}} </span>
                </label>
            </div>
            <div class="control">
                <label class="label">
                    Email: <span class="has-text-weight-normal"> {{email}} </span>
                </label>
            </div>
        </div>
        <div class="card-content">
            <div class="level">
                <div class="level-left">
                    <div class="level-item">
                        <p class="is-size-4">Additional profile information <span class="is-size-6">(uncheck fields to exclude)</span></p>
                    </div>
                    <div class="level-item">
                        <div class="field is-grouped">
                            <div class="control">
                                <button @click="showProfile=true" class="button is-primary">Update profile</button>
                            </div>
                        </div>
                    </div>

                </div><!-- level-left -->

                <div class="level-right">
                </div><!-- level-right -->

            </div><!-- level -->
            
            
            </p>
            <div class="field">
            <div class="control">
                <label class="checkbox label">
                    Company:<span class="has-text-weight-normal"> {{account.data.company}} </span>
                    <input v-model="include" value="company" type="checkbox" checked>
                </label>
            </div>
            </div>
            <div class="field">
            <div class="control">
                <label class="label checkbox">
                    Title: <span class="has-text-weight-normal">{{account.data.role}}</span><input v-model="include" value="role" type="checkbox" checked>
                </label>
            </div>
            </div>
            <div class="field">
            <div class="control">
                <label class="label checkbox">
                    Telephone: <span class="has-text-weight-normal"> {{account.data.phone}}</span>
                    <input v-model="include" value="phone" type="checkbox" checked>
                </label>
            </div>
            </div>
            <div class="field">
            <div class="control">
                <label class="label checkbox">
                    City: <span class="has-text-weight-normal">{{account.data.city}}
                    </span>
                    <input v-model="include" value="city" type="checkbox" checked>
                </label>
            </div>
            </div>
            <div class="control">
                <label class="checkbox label">
                    Country: <span class="has-text-weight-normal">{{account.data.country}}
                    </span>
                    <input v-model="include" value="country" type="checkbox" checked>
                </label>
            </div>
        </div>
        <div class="card-content">
            <label class="label"> Would you like to also add a personal message? <span class="is-size-7">(optional)</span>
                <textarea class="textarea" v-model="message">
                </textarea>
            </label>
        </div><!-- card-content -->
        <div class="card-content">
            <div class="field is-grouped">
                <div class="control">
                    <button @click="showPreview=true" class="button">Preview</button>
                </div>
                <div class="control">
                    <button @click="sendRequest" class="button is-primary">Send</button>
                </div>
            </div>
        </div><!-- card-content -->
    </div><!-- card -->
</div>
</template>
<script>
import find from 'lodash/fp/find'
import each from 'lodash/fp/each'
import includes from 'lodash/fp/includes'
import modal from '@/components/utils/modal'
import profile from './profile'
import preview from './preview'
import {mapActions} from 'vuex'

export default{
    components: {
        modal, profile, preview,
    },

    props: ['domain'],

    data(){
        return {
            showPreview: false,
            showProfile: false,
            message: null,
            include: ['country', 'city', 'company', 'role', 'phone'],
            account: {
                data:{}
            }
        }
    },

    mounted(){
        this.getAccount().then(account=>{
            this.account = account.data
        })
    },


    computed:{
        companyName(){
            if(this.domain){
                return this.domain.data.label
            }
        },
        email(){
            if(this.account && this.account.emails){
                const entry =  find(e=>{
                    return e.primary && e.verified
                })(this.account.emails)
                if (entry){
                    return entry.email
                }
            }
        },
        previewData(){
            const rv = {
                first_name: this.account.first_name,
                last_name: this.account.last_name,
                email: this.email,
            }
            each(i=>{
                if(includes(i, this.include)){
                    rv[i] = this.account.data[i]
                }
            })(['country', 'city', 'company', 'role', 'phone'])
            if(this.message){
                rv.message = this.message
            }
            return rv
        },
    },
    methods:{
        sendRequest(){
            const data = {
                message : this.message,
                fields: [...this.include],
                domain: this.domain.name,
                account_id : this.account.account_id,
            }
            this.postAccessRequest({data}).then(response=>{
            })
        },
        ...mapActions({
            getAccount: 'api/getAccount',
            postAccessRequest: 'api/postAccessRequest',
        })
        
    },
}
</script>
