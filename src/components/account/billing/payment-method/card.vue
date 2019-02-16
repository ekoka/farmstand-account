<template>
<div class="card">
    <div class="card-content">
        <h6 class="title is-6 is-uppercase">Card information</h6> 
        <div class="columns">
            <div class="column is-4">
                <div class="field">
                    <div class="control">
                        <label class="">Card number</label>
                    </div>
                    <div class="control">
                        <input class="input" placeholder="Card number"/>
                    </div> 
                </div> 
            </div>
            <div class="column"></div>
            <div class="column is-2">
                <div class="field">
                    <div class="control">
                        <label class="">Exp.</label>
                    </div>
                    <div class="control">
                        <input class="input" placeholder="MM/YY"/>
                    </div> 
                </div> 
            </div> 
            <div class="column is-2">
                <div class="field">
                    <div class="control">
                        <label class="">CVC</label>
                    </div>
                    <div class="control">
                        <input class="input" placeholder="CVC"/>
                    </div> 
                </div> 
            </div> 
        </div>
    </div>
</div>
</template>

<script>
export default {
}
</script>
