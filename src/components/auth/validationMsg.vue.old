<template>
    <p :class="{'has-text-success': val, 'has-text-danger':!val}"> 
        <span class="icon">
            <i class="iconify mdi" :data-icon="{'mdi-close-box-outline': !val, 'mdi-check-circle-outline': val}">
            </i>
        </span> {{msg}}
    </p> 
</template>

<script>
export default {
    props:['val', 'msg']
}
</script>
