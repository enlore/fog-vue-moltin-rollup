<template lang="pug">
    .cart
        table.table.is-fullwidth.is-striped.cart-products(v-if="cartProducts.length > 0")
            thead
                tr
                    th
                        a.cart-refreshControl(@click="$emit('refreshItems')") &#x21BB;
                    th.has-text-centered Quantity
                    th.has-text-right Price
            tbody
                product-as-line-item(v-for="product in cartProducts",
                    @incrementItem="$emit('incrementItem', arguments[0])",
                    @decrementItem="$emit('decrementItem', arguments[0])",
                    @removeItem="$emit('removeItem', arguments[0])",
                    :id="product.id",
                    :productId="product.product_id",
                    :name="product.name",
                    :quantity="product.quantity",
                    :price="product.unit_price.amount")

            tfoot
                tr
                    td
                        a.cart-checkoutControl Checkout
                        a.cart-checkoutControl(@click="$emit('deleteCart')") Empty

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
        name: 'cart',

        data () {
            return {

            }
        },

        computed: {
            cartProducts () {
                return this.items.sort((a, b) => a.name > b.name)
            }
        },

        props: [
            'items',
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

.cart-refreshControl
    font-size: 22px

.cart-checkoutControl
    padding: 8px
    display: inline-block

.cart-checkoutControl:first-child
    margin-right: 4px

.cart-padded
    padding: 8px
</style>

