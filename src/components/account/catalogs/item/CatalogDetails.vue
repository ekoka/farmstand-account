<template>
<div>
    <h3 class="title is-4">Can you give a bit more information about this catalog?</h3>
    <div class="field">
        <div class="control">
            <label class="label">Catalog name</label>
        </div>
        <div class="control">
            <input class="input" v-model="tenant.catalog_name"/>
        </div>
    </div>
    <div class="field">
        <div class="control">
            <label class="label">Short description</label>
        </div>
        <div class="control">
            <input class="input" v-model="tenant.description"/>
        </div>
    </div>
    <div class="field">
        <button class="is-link button" @click="next">
            Continue
        </button>
    </div>
</div>
</template>

<script>
export default {
    props: ['downstream'],

    data(){
        return {
            tenant: this.$jsoncopy(this.downstream)
        }
    },

    methods:{
        next(){
        }
    },
}
</script>
