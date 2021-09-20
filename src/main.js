import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

import '@/assets/less/variable.less'
import '@/assets/less/global.less'


Vue.config.productionTip = false

new Vue({
  el:'#app',
  render: h => h(App),
  router,
  store
})
