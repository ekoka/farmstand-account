<template>
<div class="section">
    <h1 class="title is-3">Hello {{account.key('first_name')}}</h1>
    <catalogs :catalogs="account.embedded('tenants')" :roles="account.key('roles')"/>
</div>
</template>

<script>
import Catalogs from './catalogs'
import {mapActions, mapGetters} from 'vuex'
export default {
    components: { Catalogs },
    data(){
        return {
        }
    },

    computed: {
        ...mapGetters({
            account: 'api/account',
        }),
    },

    methods:{
    },



}
</script>
