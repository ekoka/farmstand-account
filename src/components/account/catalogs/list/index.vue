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
                            <th>Identifier</th>
                            <th>Name</th>
                            <th>Created</th>
                            <th colspan="2" class="has-text-right"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="d,k in domains">
                            <td>
                                {{d.data.name}}
                            </td>
                            <td>
                                {{d.data.company_name}}
                            </td>
                            <td>{{d.data.creation_date}}</td>
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
            <button class="button is-outlined is-link" @click="showModal">
                Add a new catalog
            </button>
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

import {mapActions, mapGetters} from 'vuex'

import Modal from '@/components/utils/modal'
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
        this.getDomains().then(resp=>{
            _.each(d=>{
                this.domains.push(d)
            })(resp.embedded('domains'))
        })
    },

    methods: {
        url({domain, path=null}){
            const urlTemplate = 'http://{domain}.simpleb2b.local:8082'
            const access_key = this.$store.getters['api/accessKey'].key('access_key')
            //const urlTemplate = 'http://{domain}.simpleb2b.local:8082/admin'
            const uri = URI.expand(urlTemplate, {domain}).search({access_key})
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
