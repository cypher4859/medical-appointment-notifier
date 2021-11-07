import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: () => import('@/components/PrimaryView.vue'),
    children: [
      {
        path: 'messaging',
        name: 'Messaging Dashboard',
        component: () => import('@/components/clientMessaging/ClientMessagingView.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
