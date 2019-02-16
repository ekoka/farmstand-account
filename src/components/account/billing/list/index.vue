<template>
<div>
    <div class="card has-margin-top-l">
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
                <a class="button is-link" title="Pay the total of the balance now" @click="makePayment">Pay now</a>
            </p>

        </div>
    </div>

    <div class="card has-margin-top-l">
        <div class="card-content">
            <div class="level">
                <h2 class="title is-4">Payment methods</h2>
            </div><!-- level -->
            <div class="media"> 
                <p class="media-left">VISA</p>
                <p class="media-content">45xx xxxx xxxx xx93</p>
                <p class="media-right"><a class="button is-link is-outlined" href="">Edit</a></p>
                <p class="media-right"><a href="" class="button is-danger is-outlined">Remove</a></p>
            </div>
            <p class="media-left">
                <router-link :to="{name: 'NewPaymentMethod'}">Add a payment method</router-link>
            </p>
        </div><!-- card-content -->
    </div><!-- card -->

    <div class="card has-margin-top-l">
        <div class="card-content">
            <h2 class="title is-4">Billing history</h2>

            <table class="table is-hoverable is-fullwidth">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th colspan="2">Description</th>
                        <th class="has-text-right">Amount</th>
                        <th colspan="2"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td title="Feb 1, 2019 at 5:38pm UTC">Feb 1</td>
                        <td colspan="2">
                            Invoice for January 2019  
                        </td>
                        <td class="has-text-right">$55.84</td>
                        <td>
                            <a href="">View details</a>  
                        </td>
                    </tr>
                    <tr>
                        <td title="Jan 18, 2019 at 07:03am UTC">Jan 18</td>
                        <td colspan="2">
                            Payment (VISA 4563)
                        </td>
                        <td class="has-text-right">-$60.00</td>
                        <td>
                            
                        </td>
                    </tr>
                </tbody>
            </table>

            <div class="pagination">
                <a class="pagination-previous">Previous</a>
                <a class="pagination-next">Next</a>
                <ul class="pagination-list">
                    <li>
                        <a class="pagination-link">1</a>
                    </li>
                    <li>
                        <a class="pagination-ellipsis">&hellip;</a>
                    </li>
                    <li>
                        <a class="pagination-link">45</a>
                    </li>
                    <li>
                        <a class="pagination-link is-current">46</a>
                    </li>
                    <li>
                        <a class="pagination-link">47</a>
                    </li>
                    <li>
                        <a class="pagination-ellipsis">&hellip;</a>
                    </li>
                    <li>
                        <a class="pagination-link">86</a>
                    </li>
                </ul>
            </div> <!-- pagination -->
        </div>
    </div>
</div>
</template>


<script>
export default {
    methods:{
        makePayment(){
            // if has default payment method
            // show payment modal

            // else show warning message
        }
    },
}
</script>
