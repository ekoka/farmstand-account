<template>
<section class="section">
    <div class="hero is-fullheight">
        <div class="hero-head">
            <nav class="navbar">
                <div class="container">
                    <div class="navbar-brand">
                        <div class="navbar-item">
                            <h1 class="title is-1 is-capitalized">
                                <router-link :to="{name: 'Index'}">
                                    {{$cnf.PROJECT_NAME}}
                                </router-link>
                            </h1>
                        </div>
                        <div class="navbar-burger">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    <div class="navbar-menu">
                        <div class="navbar-item">
                            <router-link
                                class="button is-warning is-large"
                                :to="{name:'Registration'}">
                                Register
                            </router-link>
                        </div>
                        <div class="navbar-item">
                            <router-link
                                class="button is-primary is-large"
                                :to="{name:'Login'}">
                                Log in
                            </router-link>
                        </div>
                    </div>
                </div>
            </nav>
        </div><!-- hero-head -->
    </div>
</section>
</template>
