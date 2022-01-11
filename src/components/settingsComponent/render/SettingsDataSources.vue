<template>
  <div>
    <b-container>
      <b-overlay
        :show="!isAuthorized"
        rounded="sm"
      >
        <b-row>
          <b-col>
            Data Source Management. This should details the settings for connecting to various datasources, like databases, cloud providers, etc.
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-button
              @click="testDbConnection"
            >
              Test DB Connection
            </b-button>
          </b-col>
        </b-row>
        <template #overlay>
          No Api Key has been added
        </template>
      </b-overlay>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Mixins, Watch } from 'vue-property-decorator'
import { cloneDeep } from 'lodash'
import ServiceMixin from '@/mixins/service-mixin'

@Component({
  name: 'SettingsDataSources'
})
export default class SettingsDataSources extends Mixins(ServiceMixin) {
  private modelCopy: object = {}
  private workingCopy: object = {}
  private isAuthorized: boolean = false

  @Watch('modelCopy', { immediate: true, deep: true })
  onModelChange () {
    if (this.workingCopy !== this.modelCopy) {
      this.workingCopy = cloneDeep(this.modelCopy)
    }
  }

  saveSettings () {
    this.modelCopy = cloneDeep(this.workingCopy)
  }

  async beforeMount () {
    return Promise.resolve()
      .then(() => {
        return this.getIsAuthorized()
      })
      .then((isAuthorized) => {
        this.isAuthorized = isAuthorized
      })
  }

  async getIsAuthorized () : Promise<boolean> {
    return this.authenticationService.getApiKey()
      .then((apiKey) => {
        if (apiKey) {
          console.log('API Key: ', apiKey)
          return this.authenticationService.validateAndSetApiKey(apiKey)
            .then((status) => {
              console.log('Status: ', status)
              return status
            })
        } else {
          return false
        }
      })
  }

  testDbConnection () {
    this.patientDatabaseJconnService.testConnectionToDatabase()
  }
}
</script>
