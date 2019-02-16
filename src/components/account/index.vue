<template>
<div>
    <navbar/>
    <div class="section">
        <div class="columns">
            <div class="column is-2-desktop is-3-widescreen"></div>
            <router-view class="column"/>
            <div class="column is-2-desktop is-3-widescreen"></div>
        </div>
    </div>
</div>
</template>

<script>
import navbar from './navbar'

export default {
    components: { navbar, },
}
</script>
