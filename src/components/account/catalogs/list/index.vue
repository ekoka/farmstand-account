<template>
<div>
    <Modal :activeComponent.sync="activeComponent" />
    <div class="card">
        <div class="card-content">
            <h4 class="title is-4">Catalogs administered by you</h4>
            <div class="media">
                <table class="table is-hoverable is-fullwidth">
                    <thead>
                        <tr>
                            <th>Catalog identifier</th>
                            <th></th>
                            <th></th>
                            <th colspan="2" class="has-text-right"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="d,k in domains">
                            <td>
                                {{d.data.name}}
                            </td>
                            <td>
                                <router-link :to="{name:'CatalogSettings', params:{domain: d.data.name}}">
                                    Settings
                                </router-link> 
                            </td>
                            <td></td>
                            <td class="has-text-right">
                                <a :href="url({domain: d.data.name})"><strong>Go to catalog</strong></a>
                            </td>
                            <td class="has-text-right">
                                <a :href="url({domain: d.data.name, path:'/admin'})"><strong>Go to admin</strong></a>
                            </td>
                        </tr>
                    </tbody>
                </table>

            
            </div><!-- media -->
            <div v-if="false">
                <button class="button is-outlined is-link" @click="showModal">
                    Add a new catalog
                </button>
            </div>
            <router-link class="button is-outlined is-link" :to="{name:'CatalogItem'}">
                Add a new catalog
            </router-link>
        </div><!-- card-content -->
    </div><!-- card -->
</div>
</template>

<script>
import URI from 'urijs'
import _ from 'lodash/fp'
import {DOMAIN_HOST_TEMPLATE} from '@/assets/js/config'

import {mapActions, mapGetters} from 'vuex'

import Modal from '@/components/utils/modal'
import cookies from '@/utils/cookies'
import NewCatalog from '../item'

export default {
    components: {Modal, NewCatalog},

    computed: {
        ...mapGetters({
            account: 'api/account',
        }),
    },

    data(){
        return {
            activeComponent: null,
            domains:[]
        }
    },

    mounted(){
        //console.log(cookies.getCookie('account_id'))
        this.getDomains().then(resp=>{
            _.each(d=>{
                this.domains.push(d)
            })(resp.embedded('domains'))
        })
    },

    methods: {
        url({domain, path=null}){
            const urlTemplate = DOMAIN_HOST_TEMPLATE
            const access_token = this.$store.getters['api/accessToken'].key('access_token')
            const uri = URI.expand(urlTemplate, {domain}).search({access_token})
            uri.pathname(path)
            return uri.toString()
        },
        //go(url){
        //    window.location.replace(url)
        //},
        ...mapActions({
            getDomains: 'api/getDomains',
        }),
        
        showModal(){
            this.activeComponent = NewCatalog
        },
    },
}
</script>
