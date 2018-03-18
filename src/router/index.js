import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
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
