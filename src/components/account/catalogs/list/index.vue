<template>
<div>
    <div class="content">
        <ownership></ownership>
    </div>
    <membership></membership>
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
