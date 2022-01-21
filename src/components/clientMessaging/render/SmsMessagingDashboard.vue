<template>
  <div>
    <b-container fluid>
      <b-overlay
        :show="!isAuthorized"
        rounded="sm"
      >
        <div>
          <b-row class="mb-5">
            <b-col>
              <message-sending
                :is-authorized="isAuthorized"
              />
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <message-monitoring
                :is-authorized="isAuthorized"
              />
            </b-col>
          </b-row>
        </div>
        <template #overlay>
          No Api Key has been added
        </template>
      </b-overlay>
    </b-container>
  </div>
</template>

<script lang="ts">
import ServiceMixin from '@/mixins/service-mixin'
import Vue from 'vue'
import { Component, Mixins } from 'vue-property-decorator'
import SmsMessageSending from './MessageSending.vue'
import MessagingMonitoring from './MessagingMonitoring.vue'

@Component({
  name: 'sms-messaging-dashboard',
  components: {
    'message-sending': SmsMessageSending,
    'message-monitoring': MessagingMonitoring
  }
})
export default class SmsMessagingDashboard extends Mixins(ServiceMixin) {
  private isAuthorized: boolean = false

  async beforeMount () {
    return Promise.resolve()
      .then(() => {
        return this.getIsAuthorized()
      })
      .then((isAuthorized) => {
        this.isAuthorized = isAuthorized
      })
  }

  async getIsAuthorized () : Promise<boolean> {
    return this.authenticationService.getApiKey()
      .then((apiKey) => {
        if (apiKey) {
          return this.authenticationService.validateAndSetApiKey(apiKey)
            .then((status) => {
              return status
            })
        } else {
          return false
        }
      })
  }
}
</script>
