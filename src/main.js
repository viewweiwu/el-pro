// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'normalize.css'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App'
import router from './router'
import * as util from '@/util'
import Container from '~/Container'

Vue.prototype.$ajax = util.$ajax
Vue.prototype.$ajaxGet = util.ajaxGet
Vue.prototype.$ajaxPost = util.ajaxPost
Vue.prototype.$jsonPost = util.jsonPost
Vue.prototype.$dateConfig = util.dateConfig
Vue.prototype.$info = (info, primary, type = 'info') => util.notify(type, '提示', info, primary)
Vue.prototype.$formatDate = (date) => date ? util.formatDate(date) : null

Vue.use(ElementUI)
Vue.component(Container.name, Container)

Vue.config.productionTip = false

/* eslint-disable no-new */
window.app = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
