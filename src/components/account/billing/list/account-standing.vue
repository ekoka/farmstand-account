<template>
<div class="card has-margin-top-l">
    <Modal :activeComponent.sync="activeComponent" />
    <div class="card-content">
        <h2 class="subtitle is-3">Account's standing <span class="subtitle is-5">(all amounts in CAD)</span></h2>
        <div class="media">
            <h4 class="media-content subtitle">Outstanding balance</h4>
            <p class="subtitle media-content has-text-right">
                $0.00
            </p>
        </div>
        <div class="media">
            <h4 class="media-left subtitle">This month's usage</h4>
            <p class="subtitle media-content has-text-right">
                $15.34
            </p>
        </div>
        <div class="media">
            <p class="media-left"><h4 class="title is-5">Total</h4></p>
            <p class="subtitle media-content has-text-right">$15.34</p>
        </div>
        <p>
            <a class="button is-link" title="Pay the total of the balance now" @click="showPaymentScreen">Pay now</a>
        </p>

    </div>
</div>
</template>

<script>
import Modal from '@/components/utils/modal'
import PaymentScreen from './payment-screen'

export default{
    components: {Modal},

    data(){
        return {
            activeComponent: null,
        }
    },

    methods: {
        showPaymentScreen(){
            this.activeComponent = PaymentScreen
        }
    },
}
</script>
