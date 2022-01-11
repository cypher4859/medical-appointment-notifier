<template>
  <div>
    <b-container>
      <b-row>
        <b-col>
          <b-card-title>
            Account
          </b-card-title>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-card-sub-title>
            Account Credentials
          </b-card-sub-title>
        </b-col>
      </b-row>
      <b-row class="mt-4">
        <b-col>
          <b-form>
            <b-form-group
              id="fieldApiKey-1"
              description="Enter your API Key from your system administrator"
              label="API Key"
              valid-feedback="Thank you!"
              :invalid-feedback="invalidFeedback"
              :state="validationState"
            >
              <b-form-input
                id="apiKeyInput-1"
                v-model="userInputApiKey"
                placeholder="Please enter your API key..."
                :state="validationState"
              />
            </b-form-group>
          </b-form>
          <b-button
            :disabled="userInputApiKey === ''"
            @click="validateAndSetApiKey()"
          >
            Submit
          </b-button>
          <b-button
            class="mx-3"
            :disabled="userInputApiKey === ''"
            @click="clearApiKey()"
          >
            Clear
          </b-button>
          <b-alert
            class="mt-3"
            :show="showNotificationOfValidApiKey"
            variant="success"
            @dismissed="showNotificationOfValidApiKey = 0"
            @dismiss-count-down="showNotificationCountdownChange"
          >
            API Key successfully set ... {{ showNotificationOfValidApiKey }}
          </b-alert>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-button
            class="mt-3"
            variant="danger"
            :disabled="userInputApiKey === ''"
            @click="resetApiKey()"
          >
            Reset API Key
          </b-button>
        </b-col>
      </b-row>
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
  name: 'SettingsAccount'
})
export default class SettingsAccount extends Mixins(ServiceMixin) {
  private userInputApiKey: string = ''
  private apiValidationState: boolean = false
  private showNotificationOfValidApiKey: number = 0

  async beforeMount () {
    await Promise.resolve()
      .then(() => {
        this.authenticationService.getApiKey()
          .then((keyFromStore) => {
            this.userInputApiKey = keyFromStore
          })
      })
  }

  get validationState () : boolean {
    if (this.userInputApiKey) {
      return true
    } else {
      return false
    }
  }

  get invalidFeedback () : string {
    return 'Error: That API Key appears invalid'
  }

  // @Watch('userInputApiKey', { immediate: true })
  // onUserInputApiKeyChange (newApiKey, oldApiKey) {
  // }

  private async validateAndSetApiKey () : Promise<void> {
    if (this.validationState) {
      console.log('Doing key validation')
      return this.authenticationService.validateAndSetApiKey(this.userInputApiKey)
        .then((state) => {
          this.apiValidationState = state
          return state
        })
        .then((state) => {
          if (state) {
            this.showNotificationOfValidApiKey = 5
          }
        })
    }
  }

  private clearApiKey () : void {
    this.userInputApiKey = ''
  }

  private async resetApiKey () : Promise<void> {
    // clear the vuex store of messages, templates, everything
    return Promise.resolve()
      .then(() => {
        return this.clearApiKey()
      })
      .then(() => {
        return this.authenticationService.setApiKey('')
      })
      .then(() => {
        return this.messagingService.clearStore()
      })
  }

  private showNotificationCountdownChange (countdown: number) {
    this.showNotificationOfValidApiKey = countdown
  }
}
</script>
