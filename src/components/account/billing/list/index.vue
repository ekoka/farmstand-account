<template>
<div>
    <AccountStanding />
    <PaymentMethods />
    <BillingHistory />
</div>
</template>


<script>

export default {
    components: {
        AccountStanding: ()=>import(  './account-standing'),
        PaymentMethods: ()=>import(  './payment-methods'),
        BillingHistory: ()=>import(  './billing-history'),
    },
}
</script>
