<template lang="pug">
    .productAsLineItem
        p {{ product.name }}
        p {{ qty }}
</template>

<script>
    export default {
        data () {
            return {

            }
        },

        props: [
            'product',
            'qty'
        ]
    }
</script>

<style lang="scss" scoped>
</style>

