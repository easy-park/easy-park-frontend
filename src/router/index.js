import Vue from 'vue'
import Router from 'vue-router'
import Cookies from 'js-cookie'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/clerk/home',
      component: () => import('@/views/clerk/ClerkHome')
    },
    {
      path: '/select/:orderId',
      name: 'select',
      component: () => import('@/views/clerk/SelectParkingLot')
    },
    {
      path: '/clerk/login',
      name: 'ClerkLogin',
      component: () => import('@/views/clerk/LogIn')
    },
    {
      path: '/customer/login',
      component: () => import('@/views/customer/LogIn')
    },
    {
      path: '/customer/signup',
      component: () => import('@/views/customer/SignUp')
    },
    {
      path: '/customer/home',
      component: () => import('@/views/user/UserHome')
    }
  ]
})

router.beforeEach((to, from, next) => {
  console.log(to)
  if (to.path === '/') {
    if (to.query.role === 'customer') {
      navigateForCustomer(to, from, next)
    } else {
      navigateForClerk(to, from, next)
    }
  } else {
    next()
  }
})

function navigateForClerk (to, from, next) {
  let isLogin = Cookies.get('token') !== undefined
  if (!isLogin) {
    next({ path: '/clerk/login' })
  } else if (to.path === '/clerk/login' || to.path === '/') {
    next({ path: '/clerk/home' })
  } else {
    next()
  }
}

function navigateForCustomer (to, from, next) {
  let isLogin = Cookies.get('token') !== undefined
  if (!isLogin) {
    next('/customer/login')
  } else if (to.path === '/customer/login' || to.path === '/') {
    next('/customer/home')
  } else {
    next()
  }
}

export default router
