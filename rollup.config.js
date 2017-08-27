/* jshint esversion: 6, asi: true */
import alias from 'rollup-plugin-alias'
import vue from 'rollup-plugin-vue'
import buble from 'rollup-plugin-buble'

import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import nodeGlobals from 'rollup-plugin-node-globals'

import butternut from 'rollup-plugin-butternut'
import livereload from 'rollup-plugin-livereload'
import serve from 'rollup-plugin-serve'

//import re from 'rollup-plugin-re'
//import gitVersion from 'rollup-plugin-git-version'

const plugins = [
    alias({
        vue$: 'vue/dist/vue.common.js'
    }),
    vue({
        css: './public/assets/css/app.css'
    }),
    nodeResolve({
        jsnext: true,
        main: true,
        browser: true,
        module: true
    }),
    commonjs(),
    nodeGlobals(),
    buble({
        objectAssign: 'Object.assign'
    }),
]

const config = {
    entry: './src/app.js',
    dest: './public/assets/js/app.js',
    format: 'umd',
    sourceMap: true,
    plugins: plugins
}

const isProduction = process.env.NODE_ENV === `production`
const isDevelopment = process.env.NODE_ENV === `development`

if (isProduction) {
    config.sourceMap = false
    config.plugins.push(butternut)
}

if (isDevelopment) {
    config.plugins.push(livereload())
    config.plugins.push(serve({
        contentBase: './public/',
        port: 8080,
        open: true
    }))
}

export default config
