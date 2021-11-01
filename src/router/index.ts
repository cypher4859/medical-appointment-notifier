import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '*',
  //   name: 'Not Found',
  //   component: () => import('@/App.vue')
  // },
  {
    path: '/',
    name: 'Main',
    component: () => import('@/App.vue'),
    children: [
      {
        path: 'messaging',
        name: 'Messaging Dashboard',
        component: () => import('@/components/clientMessaging/render/SmsMessagingDashboard.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
