import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _49616728 = () => interopDefault(import('..\\pages\\cart\\index.vue' /* webpackChunkName: "pages_cart_index" */))
const _47090242 = () => interopDefault(import('..\\pages\\checkout\\index.vue' /* webpackChunkName: "pages_checkout_index" */))
const _56657066 = () => interopDefault(import('..\\pages\\course\\index.vue' /* webpackChunkName: "pages_course_index" */))
const _31aa94c5 = () => interopDefault(import('..\\pages\\register\\index.vue' /* webpackChunkName: "pages_register_index" */))
const _18a98de6 = () => interopDefault(import('..\\pages\\signin\\index.vue' /* webpackChunkName: "pages_signin_index" */))
const _1a0a7e5f = () => interopDefault(import('..\\pages\\user\\courses\\index.vue' /* webpackChunkName: "pages_user_courses_index" */))
const _7eb4d975 = () => interopDefault(import('..\\pages\\course\\_id.vue' /* webpackChunkName: "pages_course__id" */))
const _78094665 = () => interopDefault(import('..\\pages\\course\\_name.vue' /* webpackChunkName: "pages_course__name" */))
const _00a0df70 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/cart",
    component: _49616728,
    name: "cart"
  }, {
    path: "/checkout",
    component: _47090242,
    name: "checkout"
  }, {
    path: "/course",
    component: _56657066,
    name: "course"
  }, {
    path: "/register",
    component: _31aa94c5,
    name: "register"
  }, {
    path: "/signin",
    component: _18a98de6,
    name: "signin"
  }, {
    path: "/user/courses",
    component: _1a0a7e5f,
    name: "user-courses"
  }, {
    path: "/course/:id",
    component: _7eb4d975,
    name: "course-id"
  }, {
    path: "/course/:name",
    component: _78094665,
    name: "course-name"
  }, {
    path: "/",
    component: _00a0df70,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
