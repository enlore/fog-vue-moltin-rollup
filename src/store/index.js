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
                commit('setIncluded', prods.included)
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
    },

    flash ({ commit }, { msg, type }) {
        commit('commitFlash', { msg, type })
        commit('activeFlash', { msg, type })
    },

    resolveActiveFlashes ({ commit }) {
        commit('resolveActiveFlashes')
    }
}

const mutations = {
    setProducts (state, prods) {
        state.products = prods
    },

    setIncluded (state, included) {
        state.included = included
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

    commitError (state, error) {
        Vue.set(state.errors, state.idx, { error, resolved: false })
        state.idx = (state.idx + 1) % 100
        state.errorCount += 1
    },

    commitFlash (state, flash) {
        Vue.set(state.flashes, state.flashIdx, { flash, resolved: false })
        state.flashIdx = (state.flashIdx + 1) % 100
        state.flashCount += 1
    },

    activeFlash (state, flash) {
        state.activeFlashes.push(flash)
    },

    resolveActiveFlashes (state) {
        state.activeFlashes = []
    }
}

const getters = {
    main_images (state) {
        let mi = state.included.main_images || []
        return Vue.$_.keyBy(mi, 'id')
    },

    files (state) {
        let files = state.included.files || []
        return Vue.$_.keyBy(files, 'id')
    }
}

Vue.use(Vuex)

const state = {
    idx: 0,
    flashIdx: 0,
    cartItems: [],
    cartMeta: {},
    products: [],
    included: [],
    pages: [],
    errors: [],
    flashes: [],
    activeFlashes: [],
    errorCount: 0,
    flashCount: 0
}

const store = new Vuex.Store({
    state,
    actions,
    mutations,
    getters
})

export default store
