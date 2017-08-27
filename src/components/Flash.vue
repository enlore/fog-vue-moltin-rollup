<template lang="pug">
    .flash(:style="isShowing")
        template(v-for="flash in flashes")
            h1.flash-msg {{ flash.msg }}
</template>

<script>
    export default {
        data () {
            return {

            }
        },

        computed: {
            isShowing () {
                return this.show ?
                    { display: 'block' }
                    : { display: 'none' }
            }
        },

        props: {
            'show': {
                default: false
            },

            'flashes': {
                default: []
            }
        }
    }
</script>

<style lang="sass" scoped>
.flash
    position: fixed
    top: 0
    right: 0
    bottom: 0
    left: 0
    background-color: rgba(0, 0, 0, 0.2)

.flash-msg
    text-align: center
    font-size: 128px
    color: white
    text-shadow: -4px 4px black
    width: 100%
    margin-top: 16px

</style>

