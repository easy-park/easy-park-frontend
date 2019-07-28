import Vue from 'vue'
import Router from 'vue-router'
import Cookies from 'js-cookie'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/clerk/ClerkHome')
    },
    {
      path: '/clerk',
      component: () => import('@/views/clerk/TitlePage'),
      children: [
        {
          path: 'home',
          component: () => import('@/views/clerk/ClerkHome'),
          meta: {
            title: '主页'
          }
        }
      ]
    },
    {
      path: '/select',
      name: 'select',
      component: () => import('@/views/clerk/SelectParkingLot')
    },
    {
      path: '/clerk/login',
      name: 'login',
      component: () => import('@/views/clerk/LogIn')
    }
  ]
})

router.beforeEach((to, from, next) => {
  console.log(Cookies.get('token'))
  let isLogin = Cookies.get('token') !== undefined
  const route = ['login']
  if (route.indexOf(to.name) === -1) {
    if (!isLogin) {
      return next({ path: '/clerk/login' })
    }
  }
  if (to.name === 'login') {
    if (isLogin) {
      return next({ path: '/' })
    }
  }
  next()
})

export default router
