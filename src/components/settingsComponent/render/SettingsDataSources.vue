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
        <b-row class="mt-4">
          <b-col>
            <b-select
              v-model="selectedDatabaseConnectionType"
              :options="getAvailableDatabaseConnectionTypes()"
              text-field="name"
              value-field="id"
              disabled-field="notEnabled"
              label="Select type of Database Connection"
            />
          </b-col>
        </b-row>
        <b-row class="mt-4">
          <b-col>
            <b-form-input
              v-if="selectedDatabaseConnectionType === patientDatabaseEnvironments.ADVANTAGE_ODBC"
              id="input-dsn"
              v-model="userInputDsn"
              placeholder="Enter the DSN identifier on your system"
            />
          </b-col>
          <b-col>
            <b-button
              @click="submitSelectedDatabaseConnectionType()"
            >
              Submit
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
import PatientDatabaseEnvironments from '@/components/clientMessaging/services/PatientDatabaseEnvironments'

@Component({
  name: 'SettingsDataSources'
})
export default class SettingsDataSources extends Mixins(ServiceMixin) {
  private patientDatabaseEnvironments = PatientDatabaseEnvironments
  private modelCopy: object = {}
  private workingCopy: object = {}
  private isAuthorized: boolean = false
  private selectedDatabaseConnectionType: string = ''
  private userInputDsn: string = ''

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
      .then(() => {
        return this.trySetDatabaseConnection()
      })
      .then(() => {
        if (this.selectedDatabaseConnectionType === this.getOdbcType) {
          return this.trySetOdbcDsn()
        }
      })
  }

  async getIsAuthorized () : Promise<boolean> {
    return this.authenticationService.getApiKey()
      .then((apiKey) => {
        if (apiKey) {
          return this.authenticationService.validateAndSetApiKey(apiKey)
            .then((status) => {
              return status
            })
        } else {
          return false
        }
      })
  }

  private getAvailableDatabaseConnectionTypes () : object[] {
    return [
      {
        id: null,
        name: 'Please Select Connection Type'
      },
      {
        id: this.patientDatabaseEnvironments.ADVANTAGE_ODBC,
        name: 'ODBC'
      },
      {
        id: this.patientDatabaseEnvironments.ADVANTAGE_JCONN,
        name: 'JCONN (Disabled)',
        notEnabled: true
      }
    ]
  }

  private trySetDatabaseConnection () : void {
    const availableConnectionTypes = this.getAvailableDatabaseConnectionTypes().filter((connectionType) => {
      return (connectionType as any).id !== null && !(connectionType as any).notEnabled
    })
    if (availableConnectionTypes.length === 1) {
      this.selectedDatabaseConnectionType = (availableConnectionTypes[0] as any).id
    }
  }

  private async submitSelectedDatabaseConnectionType () : Promise<void> {
    return this.patientService.setConnectionType(this.userInputDsn)
  }

  private get getOdbcType () : string {
    const x = this.getAvailableDatabaseConnectionTypes().find((type: any) => {
      return type.id === this.patientDatabaseEnvironments.ADVANTAGE_ODBC
    })
    return x ? (x as any).id : ''
  }

  private async trySetOdbcDsn () : Promise<void> {
    return this.patientService.getConnectionType()
      .then((dsn) => {
        if (dsn) {
          this.userInputDsn = dsn
        }
      })
  }
}
</script>
