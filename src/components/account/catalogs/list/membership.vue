<template>
<div class="card">
    <div class="card-content">
        <h4 class="title is-4">Catalogs you can view</h4>
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
                            {{d.name}}
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td class="has-text-right">
                            <a :href="url({domain: d.name, path:'/catalog'})" target="_blank"><strong>Go to catalog</strong></a>
                        </td>
                    </tr>
                </tbody>
            </table>

        
        </div><!-- media -->
        <router-link class="button is-outlined is-link" :to="{name:'CatalogItem'}">
            Add a new catalog
        </router-link>
    </div><!-- card-content -->
</div><!-- card -->
</template>

<script>
import URI from 'urijs'
import map from 'lodash/fp/map'
import flow from 'lodash/fp/flow'
import filter from 'lodash/fp/filter'
import {DOMAIN_HOST_TEMPLATE} from '@/assets/js/config'
import {mapActions, mapGetters} from 'vuex'
import cookies from '@/utils/cookies'

export default {
    components: {
        NewCatalog: ()=>import(  '../item'),
    },

    computed: {
        ...mapGetters({
            account: 'api/account',
        }),
    },

    data(){
        return {
            domains:[]
        }
    },

    mounted(){
        //console.log(cookies.getCookie('account_id'))
        this.getDomains().then(resp=>{
            const mapResource = map(d=>{
                return d.resource
            })
            const filterAdmin = filter(d=>{
                return d.role=='user'
            })
            this.domains = flow(mapResource, filterAdmin)(
                resp.embedded('domains'))
        })
    },

    methods: {
        url({domain, path=null}){
            const urlTemplate = DOMAIN_HOST_TEMPLATE
            const uri = URI.expand(urlTemplate, {domain})
            uri.pathname(path)
            return uri.toString()
        },
        //go(url){
        //    window.location.replace(url)
        //},
        ...mapActions({
            getDomains: 'api/getDomains',
        }),
        
    },
}
</script>
