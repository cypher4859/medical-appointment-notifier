<template>
  <div>
    <b-container fluid>
      <router-view />
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Mixins } from 'vue-property-decorator'
import PrimaryView from './components/PrimaryView.vue'
import ServiceMixin from './mixins/service-mixin'

@Component({
  name: 'app',
  components: {
    'primary-view': PrimaryView
  }
})
export default class App extends Mixins(ServiceMixin) {
  async beforeMount () {
    Promise.resolve()
      .then(() => {
        return this.authenticationService.getApiKey()
          .then((key) => {
            return this.messagingService.setApiKey(key)
          })
      })
  }
}
</script>
