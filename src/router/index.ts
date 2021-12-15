import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    redirect: 'messaging',
    component: () => import('@/components/PrimaryView.vue'),
    children: [
      {
        path: 'messaging',
        name: 'Messaging Dashboard',
        component: () => import('@/components/clientMessaging/ClientMessagingView.vue')
      },
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('@/components/settingsComponent/SettingsComponentView.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
