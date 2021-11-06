<template>
  <div>
    <messaging-dashboard />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import SmsMessagingDashboard from '@/components/clientMessaging/render/SmsMessagingDashboard.vue'

@Component({
  name: 'sms-messaging-dashboard',
  components: {
    'messaging-dashboard': SmsMessagingDashboard
  }
})
export default class SmsMessagingDashboardView extends Vue {
}
</script>
