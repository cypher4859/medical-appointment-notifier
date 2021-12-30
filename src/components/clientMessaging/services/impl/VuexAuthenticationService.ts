import SettingsStore from '@/components/settingsComponent/state-management/SettingsStore'
import TYPES from '@/InjectableTypes/types'
import { injectable, inject } from 'inversify-props'
import 'reflect-metadata'
import { Vue } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import type IApiAuthenticationService from '../IApiAuthenticationService'
import type IVuexAuthenticationService from '../IVuexAuthenticationService'

const settingsStore = getModule(SettingsStore)

@injectable()
export default class VuexAuthenticationService extends Vue implements IVuexAuthenticationService {
  private localStorageKeyForApiKey: string = 'medical-notifier-api-key'
  @inject(TYPES.IApiAuthenticationService)
  private apiAuthenticationService!: IApiAuthenticationService

  async validateApiKey (key: string) : Promise<boolean> {
    return this.apiAuthenticationService.validateApiKey(key)
      .then((isValidKey) => {
        if (isValidKey) {
          settingsStore.loadApiKey(key)
          localStorage.setItem('medical-notifier-api-key', key)
        }
        return isValidKey
      })
  }

  async loadApiKeyFromLocalStorage () : Promise<void> {
    const key: string | null = localStorage.getItem('medical-notifier-api-key')
    if (key) {
      await this.validateApiKey(key)
    }
  }

  async getApiKey (): Promise<string> {
    return Promise.resolve()
      .then(() => {
        const key = settingsStore.getCurrentApiKey
        if (!key) {
          return this.loadApiKeyFromLocalStorage()
            .then(() => {
              return settingsStore.getCurrentApiKey
            })
        } else {
          return key
        }
      })
  }
}
