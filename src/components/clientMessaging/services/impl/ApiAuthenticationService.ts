import { Axios } from 'axios'
import { injectable } from 'inversify-props'
import 'reflect-metadata'
import { Vue } from 'vue-property-decorator'
import type IApiAuthenticationService from '../IApiAuthenticationService'
import BaseApiService from './BaseApiService'

@injectable()
export default class ApiAuthenticationService extends BaseApiService implements IApiAuthenticationService {
  async validateApiKey (key: string) : Promise<boolean> {
    return Promise.resolve()
      .then(() => {
        const payload: object = {
          'key': key
        }
        return this.api.post(`${this.authenticationUri}/validate-api-key`, payload)
      })
      .then((result) => {
        return result.data as boolean
      })
  }
}
