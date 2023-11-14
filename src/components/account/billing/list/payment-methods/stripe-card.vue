<template>
<div class="card">
    <div class="card-content">
        <div class="field">
            <div class="control">
                <label class="label" for="stripe-card">
                    Enter your card information
                </label>
            </div>
            <div class="has-margin-top-m control">
                <div id="stripe-card" ref="stripecard"
                    @change="cardChanged">
                </div>
            </div>
        </div>
        <div id="stripecard-errors" class="">{{cardError}}</div>
        <div class="field">
            <button @click="cancel" class="button is-grey is-outlined">
                Cancel
            </button>
            <button @click="createToken" class="button is-dark">
                Save
            </button>
        </div>
    </div>
</div>
</template>

<script>

import cnf from '@/config'

const stripe = Stripe(cnf.STRIPE_PUBLIC_KEY)
const elements = stripe.elements()
const card = elements.create('card')

export default {
    mounted(){
        card.mount(this.$refs.stripecard)
    },

    data(){
        return {
            cardError: null,
        }
    },

    methods:{
        cardChanged(e){
            if (e.error){
                this.cardError = e.error.message
            } else {
                this.cardError = null
            }
        },

        createToken(){
            stripe.createToken(card).then(result=>{
                if (result.error) {
                    // Inform the user if there was an error.
                    this.cardError = result.error.message
                } else {
                    // Send the token to your server.
                    this.saveCard(result.token)
                }
            })
        },

        cancel(){
            this.$emit('cancel')
        },

        saveCard(token){
            this.$store.dispatch('api/postPaymentSource', {
                data:{token}
            }).then(r=>{
                this.$emit('saved')
            })
        },
    },
}
</script>
