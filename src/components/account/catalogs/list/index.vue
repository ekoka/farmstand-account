<template>
<div>
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
                        <tr v-for="t,k in account.embedded('domains')">
                            <td>
                                {{t.data.name}}
                            </td>
                            <td>
                                {{t.data.company_name}}
                            </td>
                            <td>2018, Nov 18</td>
                            <td class="has-text-right">
                                <a :href="url({domain: t.data.name})"><strong>Go to catalog</strong></a>
                            </td>
                            <td class="has-text-right">
                                <a :href="url({domain: t.data.name, path:'/admin'})"><strong>Go to admin</strong></a>
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
</div>
</template>

<script>
import URI from 'urijs'
import {mapActions, mapGetters} from 'vuex'

export default {
    computed: {
        ...mapGetters({
            account: 'api/account',
        }),
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
    },
}
</script>
