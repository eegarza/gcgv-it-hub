import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '@/views/Main'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "Sample" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes,

  // Controls automatic page scroll to top
  // More info at https://router.vuejs.org/guide/advanced/scroll-behavior.html
  scrollBehavior(to) {
    if (to.hash) {
      return document.querySelector(to.hash).scrollIntoView({
        // smooth behavior only works in Chrome and Edge. 
        behavior: 'smooth'
      })

    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }
})

export default router