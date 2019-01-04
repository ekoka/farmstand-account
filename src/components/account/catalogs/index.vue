<template>
<div>
    <h3 class="subtitle is-4">Your catalogs</h3>

    <p v-for="c,key in catalogs">
        {{c.key('name')}}: 
        <a :href="url({tenant:c.key('name'), path:'/admin'})">Go to catalog admin</a> | 
        <a :href="url({tenant:c.key('name')})">Go to catalog</a>
    </p>
</div>
</template>

<script>
import URI from 'urijs'
export default {
    props: ['catalogs', 'roles'],

    methods: {
        url({tenant, path=null}){
            const urlTemplate = 'http://{tenant}.simpleb2b.local:8082'
            const access_key = this.$store.getters['api/accessKey'].key('access_key')
            //const urlTemplate = 'http://{tenant}.simpleb2b.local:8082/admin'
            const uri = URI.expand(urlTemplate, {tenant}).search({access_key})
            uri.pathname(path)
            return uri.toString()
        },
        //go(url){
        //    window.location.replace(url)
        //},
    },
}
</script>
