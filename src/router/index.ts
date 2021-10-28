import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    name: 'Not Found',
    component: require('@/App.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
