<template>
<div>
    <h3 class="title is-3">You're about to create a <em class="is-capitalized">{{$cnf.PROJECT_NAME}} Catalog</em> that will be hosted at {{domained_url}}. </h3>

    <h3 class="title is-4">Additional charges of CAD $0.00 will be billed to your account each month (partial month billed proportionally).</h3>
    <h3 class="title is-4">The catalog can store and showcase 200 products.</h3>
    <div class="level">
        <div class="level-left">
            <div class="level-item">
                <div class="field">
                    <button href="" class="is-link is-outlined button" @click="prev">
                    Back
                    </button>
                </div>
            </div>
            <div class="level-item">
                <div class="field">
                    <router-link :to="{name: 'CatalogList'}" class="is-danger button" >
                    Cancel
                    </router-link>
                </div>
            </div>
        </div>
        <div class="level-right">
            <div class="level-item">
                <button href="" class="is-link button" @click="create">
                Create catalog
                </button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import URI from 'urijs'
import {mapActions} from 'vuex'

export default {
    props: ['domain'],

    computed: {
        domained_url(){
            const urlTemplate = this.$cnf.DOMAIN_HOST_TEMPLATE
            const uri = URI.expand(urlTemplate, {domain:this.domain.name})
        }
    },

    methods:{
        prev(){
            this.$emit('prev', this.$jsoncopy(this.domain))
        },
        create(){
            this.postDomain({data:this.domain}).then(resp=>{
                this.$router.push({name: 'CatalogList'})
            })
        },
        ...mapActions({
            postDomain: 'api/postDomain'
        })
    },
}
</script>
