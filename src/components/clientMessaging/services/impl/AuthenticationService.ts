import TYPES from '@/InjectableTypes/types'
import { injectable, inject } from 'inversify-props'
import 'reflect-metadata'
import { Vue } from 'vue-property-decorator'
import type IAuthenticationService from '../IAuthenticationService'
import type IVuexAuthenticationService from '../IVuexAuthenticationService'

@injectable()
export default class AuthenticationService extends Vue implements IAuthenticationService {
  @inject(TYPES.IVuexAuthenticationService)
  private vuexAuthenticationService!: IVuexAuthenticationService

  async validateAndSetApiKey (key: string) : Promise<boolean> {
    return this.validateApiKey(key)
      .then((status) => {
        if (status) {
          this.setApiKey(key)
        }
        return status
      })
  }

  async setApiKey (key: string) : Promise<void> {
    return this.vuexAuthenticationService.setValidApiKey(key)
  }

  async validateApiKey (key: string) : Promise<boolean> {
    return this.vuexAuthenticationService.validateApiKey(key)
  }

  async loadApiKeyFromLocalStorage () : Promise<void> {
    return this.vuexAuthenticationService.loadApiKeyFromLocalStorage()
  }

  async getApiKey () : Promise<string> {
    return this.vuexAuthenticationService.getApiKey()
  }
}
