<template>
<div>
<NameInput />
</div>
</template>

<script>
export default {
    props: [],

    components: {
        NameInput : ()=> import('./NameInput')
    },

    data(){
        return {
            domain: {},
        }
    },
}
</script>
