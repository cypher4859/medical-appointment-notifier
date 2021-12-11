<template>
  <div>
    <b-card>
      <navigation-bar
        :action-buttons="actionButtons"
      />
    </b-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import NavigationBar from '@/components/utilityComponents/NavigationBar.vue'
import ListButton from './ListButton.vue'

@Component({
  name: 'navigation-item-action-panel',
  components: {
    'navigation-bar': NavigationBar,
    'list-button': ListButton
  }
})
export default class NavigationItemActionPanel extends Vue {
  @Prop(Array) private actionButtons!: object[]
}
</script>
