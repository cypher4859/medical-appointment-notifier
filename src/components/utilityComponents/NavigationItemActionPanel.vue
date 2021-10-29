<template>
  <div>
    <b-card
      no-body
      style="max-width: 15rem"
    >
      <div
        v-for="(button, index) in actionButtons"
        :key="index"
      >
        <b-row>
          <b-col>
            <b-button>
              {{ button.text }}
            </b-button>
          </b-col>
        </b-row>
      </div>
    </b-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component({
  name: 'navigation-item-action-panel'
})
export default class NavigationItemActionPanel extends Vue {
  @Prop(Object) private actionButtons!: object[]
}
</script>
