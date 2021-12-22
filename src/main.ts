import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import registerContainerServices from './app.container'
import 'reflect-metadata'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/css/bootstrap.css'
import VueTheMask from 'vue-the-mask'

// css
require('@mdi/font/css/materialdesignicons.css')

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueTheMask)

class AppSetup {
  constructor () {
    this.loadDependencies()
    this.loadApp()
  }

  loadDependencies () {
    registerContainerServices()
  }

  private loadApp (): void {
    Vue.config.productionTip = false
    new Vue({
      store,
      router,
      render: h => h(App)
    }).$mount('#app')
  }
}

const app = new AppSetup()
export default app
