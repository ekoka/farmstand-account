<template>
</template>

<script>
import URI from 'urijs'
import {DOMAIN_HOST_TEMPLATE} from '@/assets/js/config'

export default {
    mounted(){
        let uri = URI(window.location.href)
        const params = uri.query(true)
        const domain = params.domain
        const redirect = URI.expand(DOMAIN_HOST_TEMPLATE, {domain}).path('/redirect')
        const accessToken = this.$store.getters['api/accessToken']
        if (accessToken){
            redirect.setQuery({
                access_token:accessToken.data.access_token,
                next: params.next ? params.next : '',
            })
            window.location.href = redirect.href()
        }
    },
}
</script>
