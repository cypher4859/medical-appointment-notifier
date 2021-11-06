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
    component: () => import('@/components/PrimaryView.vue'),
    children: [
      {
        path: 'messaging',
        name: 'Messaging Dashboard',
        component: () => import('@/components/clientMessaging/ClientMessagingView.vue')
      },
      {
        path: 'monitoring',
        name: 'Monitoring Dashboard',
        component: () => import('@/components/messagingMonitor/MessagingMonitoringDashboardView.vue')
      }
    ]
  }
  // {
  //   path: 'monitoring',
  //   name: 'Monitoring Dashboard',
  //   component: () => import('@/components/clientMessaging/render/MessaginMonitoringDashboard.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
