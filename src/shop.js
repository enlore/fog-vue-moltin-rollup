/* jshint node: true, asi: true, laxcomma: true, esversion: 6 */
/* globals window: true */

'use strict'

//import M from '@moltin/sdk'
//const M = require('@moltin/sdk')

class Shop {
    constructor(opts) {
        this.clientId = opts.clientId

        this.client = window.moltin.gateway({
            client_id: this.clientId
        })
    }

    getProducts (offset, limit) {
        return this.client.Products.With('files, main_images').All()
            .then(products => {
                return products
            })
    }

    addToCart (productId, count) {
        return this.client.Cart.AddProduct(productId, count)
            .then(item => {
                return item
            })
    }

    getCartItems () {
        return this.client.Cart.Items()
    }

    deleteCart () {
        return this.client.Cart.Delete()
    }

    removeItem (itemId) {
        return this.client.Cart.RemoveItem(itemId)
    }

    createOrder (customer, billingAddress, shippingAddress) {
        let orderInfo = {
            customer: {
                name: 'John Doe',
                email: 'john@doe.co'
            },
            billing_address: {
                first_name: 'John',
                last_name: 'Doe',
                line_1: '123 Sunny Street',
                line_2: 'Sunnycreek',
                county: 'California',
                postcode: 'CA94040',
                country: 'US'
            },
            shipping_address: {
                first_name: 'Jon',
                last_name: 'Doe',
                line_1: '123 Sunny Street',
                line_2: 'Sunnycreek',
                county: 'California',
                postcode: 'CA94040',
                country: 'US'
            }
        }

        return this.client.Cart.Checkout(orderInfo)
    }

    processPayment (order) {
        return this.client.Order.Payment(order.id, {
            gateway: 'stripe',
            method: 'purchase',
            first_name: 'j',
            last_name: 'd',
            number: '4242424242424242',
            month: '02',
            year: '2020',
            verification_value: '123'
        })
    }
}

export default Shop
