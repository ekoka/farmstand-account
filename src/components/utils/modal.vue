<template>
<div class="modal" :class="{'is-active': modalActive}">
    <div class="modal-background" @click="closeModal"></div>
    <button class="modal-close is-large" aria-label="close" @click="closeModal"></button>
    <div class="modal-content">
        <component :is="component" @close="closeModal" v-on="events"></component>
    </div>
</div>
</template>

<script>
export default {
    props: ['activeComponent', 'listenFor'],

    created(){
        if(this.listenFor && this.listenFor.length){
            this.listenFor.forEach(evntName=>{
                 this.events[evntName] = (e)=>{this.$emit(evntName, e)}
            })
        }
    },

    data(){
        return {
            events:{},
            modalActive: false,
            component: null,
        }
    },

    watch: {
        activeComponent: {
            handler(value){
                if(value){
                    this.modalActive = true
                    this.component = this.activeComponent
                }
            },
            immediate: true,
        },
    },

    methods:{
        closeModal(){
            this.modalActive = false
            this.component = null
            this.$emit('closeModal')
            this.$emit('update:activeComponent', null)
        },
    },
}
</script>
