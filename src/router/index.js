import Vue from 'vue'
import Router from 'vue-router'
import { _import } from '@/util'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: '',
      component: _import('Base'),
      children: [{
        path: '/table',
        name: 'table',
        component: _import('TableDemo')
      }]
    }
  ]
})
