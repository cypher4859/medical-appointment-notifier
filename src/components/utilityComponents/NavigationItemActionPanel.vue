<template>
  <div>
    <b-card>
      <div
        class="d-flex justify-content-center mb-3"
      >
        <navigation-bar />
      </div>
      <div
        v-for="(button, index) in actionButtons"
        :key="index"
        class="d-flex justify-content-start mb-3"
      >
        <b-row no-gutters>
          <b-col>
            <list-button
              :button-text="button.text"
              :icon-name="button.iconName ? button.iconName : undefined"
              :link-to="button.routeToComponent"
            />
          </b-col>
        </b-row>
      </div>
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
