import Vue from 'vue'
const scssStyles = require('../sass/app.scss')
import App from './App.vue'

const app = new Vue({
    ...App
})
app.$mount('#app')
