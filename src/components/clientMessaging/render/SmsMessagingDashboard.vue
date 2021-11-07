<template>
  <div>
    <b-container>
      <div>
        <b-row class="mb-5">
          <b-col>
            <message-sending />
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <message-monitoring />
          </b-col>
        </b-row>
      </div>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import SmsMessageSending from './MessageSending.vue'
import MessagingMonitoringDashboard from './MessagingMonitoringDashboard.vue'

@Component({
  name: 'sms-messaging-dashboard',
  components: {
    'message-sending': SmsMessageSending,
    'message-monitoring': MessagingMonitoringDashboard
  }
})
export default class SmsMessagingDashboard extends Vue {
}
</script>
