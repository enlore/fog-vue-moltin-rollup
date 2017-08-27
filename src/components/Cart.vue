<template lang="pug">
    .cart
        table.table.is-fullwidth.is-striped.cart-products(v-if="cartProducts.length > 0")
            thead
                tr
                    th
                    th.has-text-centered Quantity
                    th.has-text-right Price
            tbody
                product-as-line-item(v-for="product in cartProducts", :product="product", :quantity="product.quantity", :price="product.unit_price.amount")

            tfoot
                tr
                    td
                        a.cart-checkoutControl Checkout
                    td.has-text-right.has-text-black
                        .cart-padded Total
                    td
                        .cart-padded.has-text-right {{ meta.display_price.with_tax.formatted }}


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

<style lang="sass" scoped>
.cart-products
    @media (min-width: 1024px)
        max-width: 60%

.cart-checkoutControl
    padding: 8px
    display: block

.cart-padded
    padding: 8px
</style>

