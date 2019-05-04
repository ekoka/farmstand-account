<template>
<div class="card">
    <div class="card-content">
        <div class="field">
            <label v-if="name" class="label">
                <span class="has-text-weight-normal"> {{request.first_name}} {{request.last_name}} </span>
            </label>
        </div>
        <div class="field">
            <label class="label">
                <span class="has-text-weight-normal"> {{request.email}} </span>
            </label>
        </div>
        <div v-if="request.company" class="field">
            <label class="label">
                <span class="has-text-weight-normal"> {{request.company}} </span>
            </label>
        </div>
        <div v-if="request.role" class="field">
            <label class="label">
                <span class="has-text-weight-normal"> {{request.role}} </span>
            </label>
        </div>
        <div v-if="request.phone" class="field">
            <label class="label">
                <span class="has-text-weight-normal"> {{request.phone}} </span>
            </label>
        </div>
        <div v-if="request.city" class="field">
            <label class="label">
                <span class="has-text-weight-normal"> {{request.city}} </span>
            </label>
        </div>
        <div v-if="request.country" class="field">
            <label class="label">
                <span class="has-text-weight-normal"> {{request.country}} </span>
            </label>
        </div>
        <div v-if="request.message" class="field">
                {{request.message}}
        </div>
        <div class="field">
            <div class="control">
                <button @click="$emit('close')" class="button">
                    Close 
                </button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import trim from 'lodash/fp/trim'
export default {
    props: ['request'],
    computed:{
        name(){
            return trim(this.request.first_name) && trim(this.request.last_name)
        }
    },
}
</script>
