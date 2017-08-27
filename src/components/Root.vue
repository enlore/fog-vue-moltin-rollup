<template lang="pug">
    .root-view
        .hero.siteHeader
            .hero-body
                .container
                    h1.title.siteTitle BUY

        .section
            .container
                cart(
                    @refreshItems="getCartItems",
                    @incrementItem="incrementItem",
                    @decrementItem="doFlash('://TODO', 'huge')",
                    @removeItem="removeItem",
                    @deleteCart="deleteCart",
                    :items="cartItems",
                    :meta="cartMeta")

        .section
            .container
                .products.columns(v-if="products.length > 0")
                    product.column(@addToCart="addToCart", v-for="product in products", :product="product")
                .products(v-else)
                    h2 have not products

        flash(:show="flashShowing", :flashes="activeFlashes")

</template>

<script>
import Product from './Product.vue'
import Cart from './Cart.vue'
import Flash from './Flash.vue'
import { mapState, mapActions } from 'vuex'

export default {
    name: 'root',

    data () {
        return {
            flashShowing: false
        }
    },

    methods: {
        ...mapActions([
            'addToCart',
            'incrementItem',
            'decrementItem',
            'removeItem',
            'getCartItems',
            'deleteCart',
            'flash',
            'resolveActiveFlashes'
        ]),

        doFlash (msg, type) {
            this.flash({ msg, type })
            this.flashShowing = true

            let to = setTimeout(() => {
                if (to) {
                    clearTimeout(to)
                    to = null }
                this.flashShowing = false
                this.resolveActiveFlashes()
            }, 2000)
        },
    },

    computed: {
        ...mapState([
            'products',
            'cartItems',
            'cartMeta',
            'activeFlashes'
        ]),
    },

    components: {
        Product,
        Cart,
        Flash
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
