<template>
    <component 
        :is="cmpSequence[current]"
        :downstream='tenant'
        @prev="prevComponent"
        @next="nextComponent"></component>
</template>

<script>
//import _ from 'lodash/fp'

import CatalogName from './CatalogName'
import CatalogDetails from './CatalogDetails'

export default {
    data(){
        return {
            tenant: {},
            current: 0,
            cmpSequence: [
                'CatalogName',
                'CatalogDetails',
            ],
        }
    },

    components: {
       CatalogName,
       CatalogDetails,
    },

    methods:{
        nextComponent(data){
            if (this.current < (this.cmpSequence.length-1)){
                this.tenant = data
                this.current += 1
            }
        },

        prevComponent(data){
            if (this.current > 0){
                this.tenant = data
                this.current -= 1
            }
        }
    },
}
</script>
