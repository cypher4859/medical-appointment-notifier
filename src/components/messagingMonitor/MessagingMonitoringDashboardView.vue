<template>
  <div>
    <monitoring-dashboard />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import MessagingMonitoringDashboard from '@/components/messagingMonitor/render/MessagingMonitoringDashboard.vue'

@Component({
  name: 'sms-messaging-dashboard',
  components: {
    'monitoring-dashboard': MessagingMonitoringDashboard
  }
})
export default class MessagingMonitoringDashboardView extends Vue {
}
</script>
