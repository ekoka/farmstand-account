<template>
<div class="card has-margin-top-l">
    <!-- <Modal :activeComponent.sync="activeComponent" :data="data" />-->
    <Modal :activeComponent.sync="activeComponent" 
        :listenFor="['saved']" 
        @saved="refresh">
    </Modal>
    <div class="card-content">
        <div class="level">
            <h2 class="title is-4">Payment methods</h2>
        </div><!-- level -->
        <div v-for="s in sources" class="media"> 
            <p class="media-left">{{s.brand}} {{s.last4}}</p>
            <p class="media-left">ZIP/PC: {{s.address_zip}}</p>
            <p class="media-content">Exp. {{s.exp_month}}/{{s.exp_year}}</p>
            <p v-if="!s.default_source" class="media-right"><button @click="makeSourceDefault(s.source_id)" class="button is-outlined">Make default</button></p>
            <p class="media-right"><button @click="deleteSource(s.source_id)" class="button is-danger is-outlined">Remove</button></p>
        </div>
        <p class="media-left">
            <button class="button is-link" @click="showModal">Add a payment method</button>
        </p>
    </div><!-- card-content -->
</div><!-- card -->
</template>

<script>
import _ from 'lodash/fp'

import Modal from '@/components/utils/modal'
import StripeCard from './stripe-card'

export default {
    components: {Modal},

    data(){
        return {
            activeComponent: null,
            data: null,
            sources: [],
        }
    },

    mounted(){
        this.refresh()
    },

    methods: {
        showModal(){
            this.activeComponent = StripeCard
        },

        refresh(){
            this.$store.dispatch('api/getPaymentSources').then(res=>{
                this.sources = res.data.sources
            })
        },

        deleteSource(source_id){
            this.$store.dispatch(
                'api/deletePaymentSource', {source_id}).then(response=>{
                this.refresh()
            })
        },

        makeSourceDefault(){
        },

        removeSource(source_id){
            this.sources = _.filter(s=>{
                return s.source_id!=source_id
            })(this.sources)
        },
    },
}
</script>
