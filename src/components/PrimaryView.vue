<template>
  <div>
    <b-container fluid>
      <b-row no-gutters>
        <b-col>
          <div
            class="my-3"
          >
            <navigation-action-panel
              :action-buttons="getActionButtons"
            />
            <!-- <navigation-bar :action-buttons="getActionButtons" /> -->
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <!-- <navigation-bar /> -->
          <div class="my-3">
            <visual-context-area>
              <router-view />
            </visual-context-area>
          </div>
        </b-col>
      </b-row>
    </b-container>
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
        text: 'Settings',
        iconName: 'check-circle-fill',
        routeToComponent: 'settings'
      }
    ]
  }
}
</script>
