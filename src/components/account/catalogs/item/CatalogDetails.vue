<template>
<div>
    <h3 class="title is-4">Can you give a bit more information about this catalog?</h3>
    <div class="field">
        <div class="control">
            <label class="label">Catalog name</label>
        </div>
        <div class="control">
            <input class="input" v-model="data.details.catalog_name"/>
        </div>
    </div>
    <div class="field">
        <div class="control">
            <label class="label">Short description</label>
        </div>
        <div class="control">
            <input class="input" v-model="data.details.description"/>
        </div>
    </div>
    <div class="level">
        <div class="level-left">
            <div class="level-item">
                <div class="field">
                    <button class="is-link is-outlined button" @click="prev">
                    Back 
                    </button>
                </div>
            </div>
            <div class="level-item">
                <div class="field">
                    <button class="is-link button" @click="next">
                        Continue
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: ['domain'],
    data(){
        let data = this.$jsoncopy(this.domain)
        if (!data.details || data.details.length==0){
            data.details  = {
                catalog_name: null,
                description: null,
            }
        }
        return { data }
    },

    methods:{
        prev(){
            this.$emit('prev', this.data)
        },

        next(){
            this.$emit('next', this.data)
        }
    },
}
</script>
