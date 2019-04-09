<template>
<div class="card">
    <div class="card-content">
    <component 
        :is="cmpSequence[current]"
        :domain='domain'
        @prev="prevComponent"
        @next="nextComponent"></component>
    </div>
</div>
</template>

<script>
import CatalogName from './CatalogName'
import CatalogDetails from './CatalogDetails'
import CatalogPlans from './plans'
import Confirmation from './Confirmation'

export default {
    data(){
        return {
            domain: {},
            current: 0,
            cmpSequence: [
                'CatalogName',
                'CatalogPlans',
                'CatalogDetails',
                'Confirmation',
            ],
        }
    },

    components: {
       CatalogName,
       CatalogDetails,
       CatalogPlans,
       Confirmation,
    },

    methods:{
        nextComponent(data){
            if (this.current < (this.cmpSequence.length-1)){
                this.domain = data
                this.current += 1
            }
        },

        prevComponent(data){
            if (this.current > 0){
                this.domain = data
                this.current -= 1
            }
        }
    },
}
</script>
