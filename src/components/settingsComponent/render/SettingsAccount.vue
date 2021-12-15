<template>
  <div>
    <b-container>
      <b-row>
        <b-col>
          Account. This should detail the settings for an account credentials for various integrations
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Watch } from 'vue-property-decorator'
import { cloneDeep } from 'lodash'

@Component({
  name: 'SettingsAccount'
})
export default class SettingsAccount extends Vue {
  private modelCopy: object = {}
  private workingCopy: object = {}

  @Watch('modelCopy', { immediate: true, deep: true })
  onModelChange () {
    if (this.workingCopy !== this.modelCopy) {
      this.workingCopy = cloneDeep(this.modelCopy)
    }
  }

  saveSettings () {
    this.modelCopy = cloneDeep(this.workingCopy)
  }
}
</script>
