<template>
<div class="box">
    <div class="card-content">
        <div class="level">
            <h1 class="title is-4">Your email addresses</h1>
        </div><!-- level -->
        <p v-for="e in emails" :class="{'has-text-weight-semibold': e.primary}">
            {{e.email}} <code v-if="e.verified">verified</code>
        </p>
        <p>
            <a href="">Add email address</a>
        </p>
    </div><!-- card-content -->
</div>
</template>

<script>
export default {
    props: ['emails'],
    computed: {

        //primaryEmail(){
        //    if (this.emails){
        //        let email =  find(e=>{
        //            return e.primary==true
        //        })(this.account.emails)
        //        return email.email
        //    }
        //}
    },

}
</script>
