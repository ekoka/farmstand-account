<template>
<div>
    <h3 class="subtitle is-3">New payment method</h3>
    <Card />
    <Address class="has-margin-top-l"/>
    <div class="level has-margin-top-l">
        <div class="level-left">
            <div class="field is-horizontal">
                <div class="field-label">
                    <label class="is-size-4">
                        <input class="checkbox" type="checkbox" >
                        Make this my primary payment method.
                    </label>
                </div>
            </div>
        </div>
        <div class="level-right">
            <button class="button is-medium is-link">Save card</button>
        </div>
    </div>
</div>
</template>

<script>
import Card from './card'
import Address from './address'

export default {
    components: { Card, Address, },
}
</script>
