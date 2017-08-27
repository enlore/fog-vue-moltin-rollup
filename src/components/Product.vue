<template lang="pug">
    .product
        .card
            .card-header
                h3.card-header-title {{ product.name }}
            .card-content
                p {{ product.description }}
            .card-footer
                a.card-footer-item(@click="$emit('addToCart', product)") Add to Cart
</template>

<script>
    export default {
        data () {
            return {
            }
        },

        props: [
            'product'
        ],

        created () {
            console.info('a product!')
        }
    }
</script>

<style lang="scss" scoped>
</style>

