import Vue from 'vue'
import Router from 'vue-router'
import { publicRoute, protectedRoute } from './routes'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const routes = publicRoute.concat(protectedRoute)

Vue.use(Router)
const router = new Router({
  mode: 'hash',
  linkActiveClass: 'active',
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    return { x: 0, y: 0 }
  },
})

router.beforeEach((to, from, next) => {
  if (from.name !== null) {
    NProgress.start()
  }

  const authRequired = to.matched.some((route) => route.meta.authRequired)

  if (!authRequired) return next()

  const isLoggedIn = localStorage.getItem('user')

  if (isLoggedIn) {
    next()
  } else {
    redirectToLogin()
  }

  function redirectToLogin() {
    next({ name: 'login', query: { redirectFrom: to.fullPath } })
  }
})

router.afterEach((to, from) => {
  NProgress.done()
})

export default router
