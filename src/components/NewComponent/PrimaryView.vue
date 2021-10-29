<template>
  <div>
    <navigation-bar />
    <b-row>
      <b-col cols="2">
        <div class="my-3">
          <navigation-action-panel
            :action-buttons="getActionButtons"
          />
        </div>
      </b-col>
      <b-col>
        <div class="my-3">
          <visual-context-area />
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import NavigationBar from '../utilityComponents/NavigationBar.vue'
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
        text: 'Action 1'
      },
      {
        text: 'Action 2'
      },
      {
        text: 'Action 3'
      }
    ]
  }
}
</script>
