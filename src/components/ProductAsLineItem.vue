<template lang="pug">
    .productAsLineItem
        p {{ product.name }}
        p {{ quantity }}
</template>

<script>
    export default {
        data () {
            return {

            }
        },

        props: [
            'product',
            'quantity'
        ]
    }
</script>

<style lang="scss" scoped>
</style>

