<template>
<div>
    <p class="content is-size-4">
    To request access to it <button @click="login" class="button is-primary"><span class="">log on</span></button> to your <span class="is-capitalized">{{$cnf.PROJECT_NAME}}</span> account. If you don't have an account yet, <button @click="register" class="button is-primary">register</button> for one.
    </p>
</div>
</template>

<script>
import cookies from '@/utils/cookies'
import URI from 'urijs'
export default {
    props: ['domain'],

    computed: {
        companyName(){
            return this.domain && this.domain.data.label
        }
    },
    methods:{
        login(){
            this.setCookie()
            this.$router.push({name: 'Login'})
        },
        register(){
            this.setCookie()
            this.$router.push({name: 'Registration'})
        },
        setCookie(){
            const route = {
                name: 'Access',
                query: {
                    domain: this.domain.name,
                    action: 'access',
                }
            }
            const action = btoa(JSON.stringify(route))


            //const actionUrl = URI('/access').query({
            //    domain: this.domain.name,
            //    action: 'access',
            //})
            const key = 'afterLogin'
            const value = action
            const scope = this.$store.getters.PROJECT_URI.domain()
            const oneHour = 60 * 60 * 1000
            const end = new Date(Date.now() + oneHour)
            cookies.setCookie (key, value, end, '/', scope)
        },
    },
}
</script>
