<template lang="pug">
    .cart
        table.table.is-striped.cart-products(v-if="cartProducts.length > 0")
            thead
                tr
                    th
                    th Quantity
                    th Price
            tbody
                product-as-line-item(v-for="product in cartProducts", :product="product", :quantity="product.quantity", :price="product.unit_price.amount")

            tfoot
                tr
                    td
                    td.has-text-right.has-text-black Total
                    td {{ meta.display_price.with_tax.formatted }}


        .cart-products(v-else)
            h3 Nothing in your cart
</template>

<script>
    import ProductAsLineItem from './ProductAsLineItem.vue'

    export default {
        data () {
            return {

            }
        },

        computed: {
            cartProducts () {
                return this.products
            }
        },

        props: [
            'products',
            'meta'
        ],

        components: {
            ProductAsLineItem
        }
    }
</script>

<style lang="scss" scoped>
</style>

