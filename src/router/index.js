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
<<<<<<< HEAD
      path: '/select',
      name: 'select',
      component: () => import('@/views/clerk/SelectParkingLot')
=======
      path: '/clerk/login',
      component: () => import('@/views/clerk/LogIn')
>>>>>>> 4f4b5aaf2ab8e2225bf192b8edd377581a622657
    }
  ]
})
