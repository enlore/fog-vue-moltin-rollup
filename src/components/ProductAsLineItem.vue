<template lang="pug">
    tr.productAsLineItem
        td
            a.productAsLineItem-removeControl(@click="$emit('removeItem', id)") x
            span.productAsLineItem-name {{ name }}

        td
            .has-text-centered {{ quantity }}

            .productAsLineItem-controls
                a.productAsLineItem-quantityControl(@click="$emit('decrementItem', productId)") -
                a.productAsLineItem-quantityControl(@click="$emit('incrementItem', productId)") +

        td.has-text-right {{ price }}
</template>

<script>
    export default {
        data () {
            return {

            }
        },

        props: [
            'id',
            'productId',
            'name',
            'quantity',
            'price'
        ]
    }
</script>

<style lang="sass" scoped>
.productAsLineItem-controls
    display: flex

.productAsLineItem-removeControl
    padding: 4px
    font-size: 20px
    margin-right: 8px

.productAsLineItem-removeControl

.productAsLineItem-quantityControl
    flex: 1 1 auto
    display: block
    text-align: center
    padding: 4px
    font-size: 24px
</style>

