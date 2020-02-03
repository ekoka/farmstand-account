<template>
<div>
    <h3 class="title is-4">Choose a plan for your catalog</h3>
    <div v-if="plans" class="columns">
        <Basic class="column is-flex" @click.native="selectPlan(plans[0])" 
            :plan="plans[0]" :selected="data.plan_id" />
        <Standard class="column is-flex"  @click.native="selectPlan(plans[1])" 
            :plan="plans[1]" :selected="data.plan_id" /> 
        <Limited class="column is-flex" @click.native="selectPlan(plans[2])" 
            :plan="plans[2]" :selected="data.plan_id" />
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
                    <button class="is-link button" 
                        :disabled="!data.plan_id"
                        @click="next">
                        Continue
                    </button>
                </div>
            </div>
        </div>
        <div class="level-right">
            <div class="level-item">
            </div>
        </div>
    </div>

</div>
</template>

<script>
import {mapActions} from 'vuex'
import map from 'lodash/fp/map'

export default {
    components: {
        //Binder, Shelf, Library
        Basic: ()=>import(  './basic'),
        Standard: ()=>import(  './standard'),
        Limited: ()=>import(  './limited'),
    },
    props: ['domain'],
    data(){
        let data = this.$jsoncopy(this.domain)
        if(!data.plan_id){
            data.plan_id = null
        }
        return { data, plans:null, selected: data.plan_id}
    },

    mounted(){
        this.getPlans().then(plans=>{
            //this.plans = plans.embedded('plans')
            this.plans = map(p=>{
                return p.data
            })(plans.embedded('plans'))
        })
    },

    methods:{
        selectPlan(plan){
            this.data.plan_id = plan.plan_id
        },
        prev(){
            this.$emit('prev', this.data)
        },

        next(){
            this.$emit('next', this.data)
        },

        ...mapActions({
            getPlans: 'api/getPlans'
        })
    },
}
</script>
