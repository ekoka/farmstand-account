<template>
<div class="box">
    <div class="card-content">
        <div class="level">
            <h1 class="title is-4">{{name}}</h1>
            <router-link class="button is-link" :to="{name:'EditProfile'}">
                Edit profile
            </router-link>
        </div><!-- level -->
        <p>{{account.data.role}}</p>
        <p>{{account.data.organization}}</p>
        <p>{{account.data.phone}}</p>
    </div><!-- card-content -->
</div><!-- card -->
</template>

<script>
export default {
    props:['account'],
    computed: {
        name(){
            if (this.account){
                let name = [this.account.first_name, 
                    this.account.last_name]
                return name.join(' ')
            }
        },
    },
}
</script>
