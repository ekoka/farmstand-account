<template>
<div class="card">
    <div class="card-content">
        <h4 class="title is-4">Catalogs you're a guest on</h4>
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
        <SearchCatalog />
    </div><!-- card-content -->
</div><!-- card -->
</template>

<script>
import URI from 'urijs'
import map from 'lodash/fp/map'
import flow from 'lodash/fp/flow'
import includes from 'lodash/fp/includes'
import compose from 'lodash/fp/compose'
import toPairs from 'lodash/fp/toPairs'
import filter from 'lodash/fp/filter'
import {mapActions, mapGetters} from 'vuex'
import cookies from '@/utils/cookies'

export default {
    components: {
        SearchCatalog: ()=>import(  '../search'),
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
            const domains = compose(
                map(([d,r])=>{
                    return d
                }),
                filter(([d, r])=>{
                    return r=='user'
                }),
                toPairs,
            )(resp.data.roles)

            this.domains = compose(
                map(domain=>{
                    return domain.resource
                }),
                filter(domain=>{
                    return includes(domain.data.name, domains)
                }),
            )(resp.embedded('domains'))
        })
    },

    methods: {
        url({domain, path=null}){
            const urlTemplate = this.$cnf.DOMAIN_HOST_TEMPLATE
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
