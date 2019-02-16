<template>
<div class="navbar-start">
    <div class="navbar-item">
        <router-link :to="{name: 'CatalogList'}">Catalogs</router-link>
    </div>
    <div class="navbar-item">
        <router-link :to="{name: 'Profile'}">Profile</router-link>
    </div>
    <div class="navbar-item">
        <router-link :to="{name: 'Billing'}">Billing</router-link>
    </div>
</div><!-- navbar-start -->
</template>
