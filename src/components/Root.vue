<template lang="pug">
    .root-view
        .hero.siteHeader
            .hero-body
                .container
                    h1.title.siteTitle BUY

        .section
            .container
                cart(
                    @incrementItem="incrementItem",
                    @decrementItem="decrementItem",
                    @removeItem="removeItem",
                    :items="cartItems",
                    :meta="cartMeta")

        .section
            .container
                .products.columns(v-if="products.length > 0")
                    product.column(@addToCart="addToCart", v-for="product in products", :product="product")
                .products(v-else)
                    h2 have not products

</template>

<script>
import Product from './Product.vue'
import Cart from './Cart.vue'
import { mapState, mapActions } from 'vuex'

export default {
    name: 'root',

    data () {
        return {
        }
    },

    methods: {
        ...mapActions([
            'addToCart',
            'incrementItem',
            'decrementItem',
            'removeItem'
        ]),
    },

    computed: {
        ...mapState([
            'products',
            'cartItems',
            'cartMeta'
        ]),
    },

    components: {
        Product,
        Cart
    }
}
</script>

<style lang="sass">
    @import '../../node_modules/bulma/sass/utilities/all'
    @import '../../node_modules/bulma/sass/base/all'
    @import '../../node_modules/bulma/sass/grid/all'
    @import '../../node_modules/bulma/sass/layout/all'
    @import '../../node_modules/bulma/sass/elements/title'
    @import '../../node_modules/bulma/sass/elements/table'
    @import '../../node_modules/bulma/sass/components/card'

    .siteHeader
        background-image: url('/assets/images/nanners.jpg');
        background-repeat: no-repeat;
        backgroun-size: cover;

    .siteTitle
        color: white
        text-shadow: -3px 3px black
        font-size: 48px

        @media (min-width: 768px)
            font-size: 64px

</style>
