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

  async validateApiKey (key: string) : Promise<boolean> {
    return this.isValidApiKey(key) && this.vuexAuthenticationService.validateApiKey(key)
  }

  async loadApiKeyFromLocalStorage () : Promise<void> {
    return this.vuexAuthenticationService.loadApiKeyFromLocalStorage()
  }

  async getApiKey () : Promise<string> {
    return this.vuexAuthenticationService.getApiKey()
  }

  private isValidApiKey (key: string) : boolean {
    return true
  }
}
