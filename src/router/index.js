import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/clerk/ClerkHome')
    },
    {
      path: '/select',
      name: 'select',
      component: () => import('@/views/clerk/SelectParkingLot')
    },
    {
      path: '/clerk/login',
      component: () => import('@/views/clerk/LogIn')
    }
  ]
})
