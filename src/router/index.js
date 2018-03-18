import Vue from 'vue'
import Router from 'vue-router'
<<<<<<< HEAD

Vue.use(Router)

let router = new Router({
=======
import { _import } from '@/util'

Vue.use(Router)

export default new Router({
>>>>>>> 3af4bd9264230b099756bcc1d45cf8cac5e5a6af
  mode: 'history',
  routes: [
    {
      path: '/',
<<<<<<< HEAD
      name: 'base',
      component: () => import('@/views/Base'),
      children: [{
        path: '/headerform',
        name: 'headerform',
        component: () => import('@/views/HeaderFormDemo'),
        meta: {
          id: '1'
        }
      }, {
        path: '/table',
        name: 'table',
        component: () => import('@/views/TableDemo'),
        meta: {
          id: '2'
        }
=======
      name: '',
      component: _import('Base'),
      children: [{
        path: '/table',
        name: 'table',
        component: _import('TableDemo')
>>>>>>> 3af4bd9264230b099756bcc1d45cf8cac5e5a6af
      }]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.name === 'base') {
    next({ path: '/table' })
  } else {
    next()
  }
})

export default router
