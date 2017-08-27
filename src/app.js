/* jshint node: true, asi: true, laxcomma: true, esversion: 6 */

import Vue from 'vue'
import App from './components/Root.vue'

import store from './store/index.js'
import Shop from './shop.js'

import keyBy from 'lodash/keyBy'

Vue.use({
    install (Vue, opt) {
        Vue.prototype.$_ = {
            keyBy
        }

        Vue.$_ = {
            keyBy
        }
    }
})

Vue.use({
    install (Vue, opt) {
        const shop = new Shop({
            clientId: opt.clientId
        })

        Vue.$shop = shop
        Vue.prototype.$shop = shop
    }
}, {
    clientId: process.env.MOLTIN_CLIENT_ID || 'lGrIQFg9sp1IFiVhEDg9xEp6vFtN9s086AMgBp8xEQ'
})

const app = new Vue({
    el: '#app',
    render: h => h(App),
    store,
    created () {
        this.$store.dispatch('getProducts')
        this.$store.dispatch('getCartItems')
    }
})
