<template>
<nav class="navbar has-shadow">
    <!--<nav class="navbar has-shadow is-spaced">-->
    <!-- is-spaced -->
    <div class="container">
        <div class="navbar-brand">
            <router-link class="navbar-item" :to="{name:'Account'}">
                <strong>{{`${account.key('first_name')} ${account.key('last_name')}`}}</strong>
            </router-link>

            <div id="navbarBurger" class="navbar-burger burger" data-target="navMenuDocumentation">
                <span></span>
                <span></span>
                <span></span>
            </div><!-- navbarBurger -->
        </div><!-- navbar-brand -->

        <div id="navMenuDocumentation" class="navbar-menu">
            <navbar-start />
            <navbar-end />
        </div>
    </div><!-- container -->
</nav>
</template>

<script>
import navbarEnd from './navbar-end'
import navbarStart from './navbar-start'
import {mapGetters} from 'vuex'


export default {
    components: {
        navbarStart, navbarEnd
    },
    
    computed:{
        ...mapGetters({
            account: 'api/account',
        })
    },

}
</script>
