<template>
<div>
    <h4 class="title is-4">Settings for
        <em v-if="title">{{title}}</em>
        <em v-else>{{domain_name}}</em>
    </h4>

    <div class="box">
        <h5 class="subtitle is-4">Summary</h5>
        <div class="content">
            <p>Identifier <span class="has-text-weight-semibold">{{domain.name}}</span></p>
            <p>Created on {{domain.creation_date}}</p>
        </div>

        <h5 class="subtitle is-4">Actions</h5>
        <div class="content">
            <button class="button is-outlined">
                Go to admin
            </button>
            <button class="button is-outlined">
                Go to catalog
            </button>
            <span v-if="showAdvanced">
                <button class="button is-warning">
                    Temporarily deactivate
                </button>
                <button class="button is-danger">
                    <span class="icon is-small">
                        <i class="iconify mdi" data-icon="mdi-alert-decagram"></i>
                    </span>
                    <span>Delete catalog</span>
                    <span class="icon is-small">
                        <i class="iconify mdi" data-icon="mdi-nuke"></i>
                    </span>
                </button>
            </span>
            <button v-if="!showAdvanced" @click="showAdvanced=true" class="button is-text">
                <span>
                    Show sensitive actions
                </span>
                <span class="icon is-small">
                    <i class="iconify mdi" data-icon="mdi-chevron-double-right"></i>
                </span>
            </button>
            <button v-else @click="showAdvanced=false" class="button is-text">
                <span>
                    Hide sensitive actions
                </span>
                <span class="icon is-small">
                    <i class="iconify mdi" data-icon="mdi-chevron-double-left"></i>
                </span>
            </button>
        </div>
    </div>

    <stickycontent>
        <div class="level">
            <div class="level-left">
            </div>
            <div class="level-left">
                <notification eventName="notification-setting-saved"></notification>
            </div>
            <div class="level-right">
                <div class="level-item">
                    <button @click="save" class="button is-link">
                        Save catalog settings
                    </button>
                </div>
            </div>
        </div>
    </stickycontent>

    <div class="box">
        <h5 class="subtitle is-4">Description</h5>
        <div class="field">
            <label class="label">Catalog name</label>
            <input class="input" v-model="mutable.data.label" />
        </div>

        <div class="field">
        <label class="label">Description</label>
        <input class="input" v-model="mutable.data.description" />
        </div>
    </div>

    <div class="box">
        <h5 class="subtitle is-4">Multiple languages <span class="is-size-6">(Which language will you be providing content in?) </span></h5>
        <div>
            <label>
                <span class="has-text-weight-semibold is-size-6">English: </span>
                <input type="checkbox" name="languages" value="en" v-model="mutable.meta.languages"/>
            </label>
            <label>
                <span class="has-text-weight-semibold is-size-6">French: </span>
                <input type="checkbox" name="languages" value="fr" v-model="mutable.meta.languages"/>
            </label>
            <label>
                <span class="has-text-weight-semibold is-size-6">Spanish: </span>
                <input type="checkbox" name="languages" value="sp" v-model="mutable.meta.languages"/>
            </label>
        </div>
    </div>

    <div class="box">
        <h5 class="subtitle is-4">Privacy level</h5>
        <div>
            <label>
                <input type="radio" value="private" v-model="mutable.meta.privacy"/>
                <span class="has-text-weight-semibold is-size-6">Private:</span> users must register and be authorized (i.e. be members).
            </label>
        </div>
        <div>
            <label>
                <input type="radio" value="semi" v-model="mutable.meta.privacy" />
                <span class="is-size-6 has-text-weight-semibold">Semi-private:</span> some products are publicly viewable, others are shown to authorized users only.
            </label>
        </div>
        <div>
            <label>
                <input type="radio" value="public" v-model="mutable.meta.privacy"/>
                <span class="is-size-6 has-text-weight-semibold">Public:</span> unregistered users can view products.
            </label>
        </div>
    </div>

    <div class="box">
        <h5 class="subtitle is-6"><span class="subtitle is-4">User access approval</span> (applies to private and semi-private access)</h5>
        <div class="is-size-5">After requesting access to the catalog:</div>
        <div>
            <label class="label">
                <input type="radio" value="explicit" v-model="mutable.meta.access_approval"/>
                User must be explicitly approved by admin.
            </label>
        </div>
        <div>
            <label class="label">
                <input type="radio" value="implicit" v-model="mutable.meta.access_approval" />
                User is automatically approved.
            </label>
        </div>
    </div>

    <div v-if="false" class="box">
    <label class="label">Current payment option</label>
    <div>
        VISA etc.
    </div>
    <button class="button is-outlined is-dark">Change</button>
    </div>


</div>
</template>

<script>
import URI from 'urijs'

export default {
    components: {
        stickycontent: ()=>import(  '@/components/utils/sticky-content'),
        notification: ()=>import(   '@/components/utils/messaging/notification'),
    },

    data(){
        return {
            domain_name: false,
            showAdvanced:false,
            domain:{},
            mutable:{
                data:{
                    label:null,
                    description:null,
                },
                meta:{
                    privacy: 'private',
                    access_approval: 'explicit',
                    languages: [],
                },
            },
        }
    },

    mounted(){
        this.domain_name = this.$route.params.domain
        this.load()
    },

    computed: {
        title (){
            return this.mutable.data.label
        },
    },

    methods: {
        load(){
            this.$store.dispatch('api/getDomain', {
                domain:this.domain_name,
            }).then(resp=>{
                this.domain = resp.data
                this.mutable = resp.data
                if (!this.mutable.meta.languages){
                    this.mutable.meta.languages = []
                }
            })
        },
        save(){
            let data = this.mutable
            this.$store.dispatch('api/putDomain', {
                domain: this.domain_name,
                data,
            }).then(r=>{
                return this.load()
            }).then(()=>{
                this.$eventBus.$emit('notification-setting-saved', {
                    message: 'Catalog information updated.',
                    options:{
                        timeout: 1.75,
                        color: 'is-warning',
                        size: 'is-medium',
                        close: false,
                    },
                })
            })
        },
    },
}
</script>
