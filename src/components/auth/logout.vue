<template>
<div>
</div>
</template>
<script>
export default {

    props:[],

    watch: {
    },

    methods:{

        logout(){
            window.location.href = this.$store.state.PROJECT_INDEX
        },
    },
}
</script>
