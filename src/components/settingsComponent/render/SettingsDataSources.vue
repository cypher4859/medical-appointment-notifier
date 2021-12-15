<template>
  <div>
    <b-container>
      <b-row>
        <b-col>
          Data Source Management. This should details the settings for connecting to various datasources, like databases, cloud providers, etc.
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
  name: 'SettingsDataSources'
})
export default class SettingsDataSources extends Vue {
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
