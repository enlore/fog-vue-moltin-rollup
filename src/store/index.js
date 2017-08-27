/* jshint node: true, asi: true, laxcomma: true, esversion: 6 */
'use strict'

import Vue from 'vue'
import Vuex from 'vuex'

const actions = {
    getProducts ({ commit }) {
        Vue.$shop.getProducts()
            .then(prods => {
                commit('setProducts', prods.data)
                commit('setPages', prods.links)
            })
    },

    deleteCart ({ commit, dispatch }) {
        Vue.$shop.deleteCart()
            .then(deletedCartMeta => {
                dispatch('getCartItems')
            })
            .catch(err => {
                commit('commitError', err)
            })
    },

    addToCart ({ commit }, product) {
        Vue.$shop.addToCart(product.id, 1)
            .then(cartProduct => {
                console.info(cartProduct)
                return Vue.$shop.getCartItems()
            })
            .then(cart => {
                commit('setCartItems', cart.data)
                commit('setCartMeta', cart.meta)
            })
            .catch(err => {
                commit('commitError', err)
            })
    },

    removeItem({ commit, dispatch }, productId) {
        Vue.$shop.removeItem(productId)
            .then(removedItem => {
                return dispatch('getCartItems')
            })
            .catch(err => {
                commit('commitError', err)
            })
    },

    incrementItem({ dispatch }, productId) {
        return dispatch('addToCart', { id: productId })
    },

    decrementItem({ commit }, productId) {

    },

    getCartItems ({ commit }) {
        Vue.$shop.getCartItems()
            .then(cart => {
                commit('setCartItems', cart.data)
                commit('setCartMeta', cart.meta)
            })
            .catch(err => {
                commit('commitError', err)
            })
    }
}

const mutations = {
    setProducts (state, prods) {
        state.products = prods
    },

    setPages (state, pages) {
        state.pages = pages
    },

    setCartItems (state, items) {
        state.cartItems = items
    },

    setCartMeta (state, meta) {
        state.cartMeta = meta
    },

    commitError (state, err) {
        Vue.set(state.errors, state.idx, err)
        state.idx = (state.idx + 1) % 100
        state.errorCount += 1
    }
}

Vue.use(Vuex)

const state = {
    idx: 0,
    cartItems: [],
    cartMeta: {},
    products: [],
    pages: [],
    errors: [],
    errorCount: 0
}

const store = new Vuex.Store({
    state,
    actions,
    mutations
})

export default store
