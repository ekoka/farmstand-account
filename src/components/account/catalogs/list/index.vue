<template>
<div>
    <div class="content">
        <ownership />
    </div>
    <div class="content">
        <membership />
    </div>

</div>
</template>

<script>
export default {
    components: {
        ownership: ()=>import(  './ownership'),
        membership: ()=>import(  './membership'),
    },
}
</script>
