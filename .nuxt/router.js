import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _f1c9e9b2 = () => interopDefault(import('..\\pages\\layout' /* webpackChunkName: "" */))
const _55823fc8 = () => interopDefault(import('..\\pages\\home' /* webpackChunkName: "" */))
const _5a552868 = () => interopDefault(import('..\\pages\\login' /* webpackChunkName: "" */))
const _4c50794c = () => interopDefault(import('..\\pages\\profile' /* webpackChunkName: "" */))
const _62027e40 = () => interopDefault(import('..\\pages\\settings' /* webpackChunkName: "" */))
const _7b4c316a = () => interopDefault(import('..\\pages\\editor' /* webpackChunkName: "" */))
const _331abc99 = () => interopDefault(import('..\\pages\\article' /* webpackChunkName: "" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _f1c9e9b2,
    children: [{
      path: "",
      component: _55823fc8,
      name: "home"
    }, {
      path: "/login",
      component: _5a552868,
      name: "login"
    }, {
      path: "/register",
      component: _5a552868,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _4c50794c,
      name: "profile"
    }, {
      path: "/settings",
      component: _62027e40,
      name: "settings"
    }, {
      path: "/editor",
      component: _7b4c316a,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _331abc99,
      name: "article"
    }]
  }],

  fallback: false
}

function decodeObj(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = decode(obj[key])
    }
  }
}

export function createRouter () {
  const router = new Router(routerOptions)

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    const r = resolve(to, current, append)
    if (r && r.resolved && r.resolved.query) {
      decodeObj(r.resolved.query)
    }
    return r
  }

  return router
}
