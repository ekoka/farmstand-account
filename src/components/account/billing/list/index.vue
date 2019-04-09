<template>
<div>
    <AccountStanding />
    <PaymentMethods />
    <BillingHistory />
</div>
</template>


<script>
import AccountStanding from './account-standing'
import PaymentMethods from './payment-methods'
import BillingHistory from './billing-history'

export default {
    components: {
        AccountStanding, PaymentMethods, BillingHistory
    },
}
</script>
