<template>
  <div>
    <b-row>
      <b-col
        cols="auto"
      >
        <div
          class="my-3"
        >
          <navigation-action-panel
            :action-buttons="getActionButtons"
          />
        </div>
      </b-col>
      <b-col>
        <!-- <navigation-bar /> -->
        <div class="my-3">
          <visual-context-area>
            <router-view />
          </visual-context-area>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import NavigationBar from './utilityComponents/NavigationBar.vue'
import NavigationItemActionPanel from '@/components/utilityComponents/NavigationItemActionPanel.vue'
import VisualContextArea from '@/components/utilityComponents/VisualContextArea.vue'

@Component({
  name: 'primary-view',
  components: {
    'navigation-bar': NavigationBar,
    'navigation-action-panel': NavigationItemActionPanel,
    'visual-context-area': VisualContextArea
  }
})
export default class PrimaryView extends Vue {
  get getActionButtons () : object[] {
    return [
      {
        text: 'Messaging',
        iconName: 'chat-square-dots-fill',
        routeToComponent: 'messaging'
      },
      {
        text: 'Monitoring',
        iconName: 'check-circle-fill',
        routeToComponent: 'monitoring'
      },
      {
        text: 'Action 3',
        iconName: '',
        routeToComponent: ''
      }
    ]
  }
}
</script>
