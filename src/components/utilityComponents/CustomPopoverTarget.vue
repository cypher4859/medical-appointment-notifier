<template>
  <div>
    <b-button
      :id="`custom-popover-target-${popoverId}`"
    >
      Popover
    </b-button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component({
  name: 'custom-popover'
})
export default class CustomPopover extends Vue {
  /**
   * @param popoverId This is used to create a unique identifier for the popover
   * @slot Default - This slot determines the default content to be placed within the borders of the popover
   */
  @Prop(String) private popoverId!: string
}
</script>
