<template lang="pug">
    .cart
        .cart-products(v-if="cartProducts.length > 0")
            product-as-line-item(v-for="product in cartProducts", :product="product", :quantity="product.quantity")

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

