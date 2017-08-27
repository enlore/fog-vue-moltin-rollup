<template lang="pug">
    .loading(:class="{ 'is-spinning': spin }", :style="{ display: show ? 'block' : 'none' }").
         &#x21BB;
</template>

<script>
    export default {
        data () {
            return {

            }
        },

        props: [
            'show',
            'spin'
        ]
    }
</script>

<style lang="scss">

    @keyframes spin {
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }

.loading.is-spinning {
    animation: spin 3s linear infinite;
    -webkit-animation: spin 3s linear infinite;
}

.loading {
    color: #00d1b2;
    width: 32px;
    height: 32px;
    line-height: 32px;
    font-size: 32px;
    position: fixed;
    top: 16px;
    right: 16px;
}
</style>

