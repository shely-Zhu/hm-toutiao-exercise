import Vue from 'vue'
import App from './App.vue'
import router from '@/routes'
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// !!!!!!!!!!!
import myPlugin from '@/components'

import '@/styles/index.less'
import axios from '@/api'
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.use(myPlugin)
Vue.use(elementUI)
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
