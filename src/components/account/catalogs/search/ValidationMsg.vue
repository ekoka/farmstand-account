<template>
<p :class="messageClass">
    <span v-if="val.showicon" class="icon">
        <i class="iconify mdi" :data-icon="iconClass"></i>
    </span>
    {{val.msg}}
</p>
</template>

<script>
export default {
    props:['val'],
    computed: {

        messageClass(){
            return {
                'has-text-success': this.val.value,
                'has-text-danger':!this.val.value,
            }
        },

        iconClass(){
            return {
                'mdi-check-circle-outline': this.val.value,
                'mdi-close-box-outline': !this.val.value,
            }
        },
    },
}
</script>
