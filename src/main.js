import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
import App from './App.vue'
import axios from 'axios'
import router from './router'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

Vue.prototype.$http = axios
Vue.use(BootstrapVue)

Vue.prototype.$EventBus = new Vue();


new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
