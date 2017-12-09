import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
import axios from 'axios'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

Vue.use(BootstrapVue, axios)

new Vue({
  el: '#app',
  render: h => h(App)
})
