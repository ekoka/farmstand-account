<template>
<div>
    <div class="box">
        <h4 class="title is-3">Basic plan</h4>

        <p class="subtitle is-5">
            Ideal for small collections and temporary showcase.
        </p>
        <p class="subtitle is-5">What you get...</p>
        <ul>
            <li class="title is-5 is-marginless">
                <span class="icon">
                    <i class="iconify mdi" data-icon="mdi-chevron-right"></i>
                </span>
                Product catalog
            </li>
            <li class="title is-5 is-marginless">
                <span class="icon">
                    <i class="iconify mdi" data-icon="mdi-chevron-right"></i>
                </span>
                Up to 50 items
            </li>
        </ul>
        <div v-if="plan.data.amount" class="has-margin-top-l has-text-centered">
            <p class="subtitle is-1">${{plan.data.amount/100}} </p>
            <p class="subtitle is-4">per month</p>
            <input class="radio" type="radio" :value="plan.plan_id" 
                v-model="selected" @click.prevent/>
        </div> 
    </div>
</div>
</template>

<script>
export default {
    props: ['plan', 'selected'],
}
</script>


