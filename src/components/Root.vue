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
                    product.column(v-for="product in products",
                        @addToCart="addToCart",
                        :product="product",
                        :mainImage="mainProductImage(product)")

                .products(v-else)
                    h2 have not products

        flash(:show="flashShowing", :flashes="activeFlashes")
        loading(:show="true", :spin="true")

</template>

<script>
import Product from './Product.vue'
import Cart from './Cart.vue'
import Flash from './Flash.vue'
import Loading from './Loading.vue'
import { mapState, mapActions, mapGetters } from 'vuex'

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

        // accessing the relation here, at the marshalling layer
        mainProductImage (product) {
            let mi = product.relationships.main_image

            if (mi) {
                let image = this.main_images[mi.data.id]

                if (image)
                    return image.link.href

                else return ""

            } else {
                return ""
            }
        },

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
            'activeFlashes',
        ]),

        ...mapGetters([
            'main_images'
        ])
    },

    components: {
        Product,
        Cart,
        Flash,
        Loading
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
